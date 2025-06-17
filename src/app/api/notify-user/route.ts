import { NextResponse } from 'next/server';
import { getDataSource } from '@/datasources/factory';
import { notifyUser } from '@/services/notifications/notifyUser';
import { supabaseService } from '@/lib/supabase/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

// Проверка аутентификации пользователя
async function verifyAuthentication(): Promise<boolean> {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log('No session found');
      return false;
    }

    // Дополнительно проверяем, что пользователь существует в нашей базе
    const { data: user } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', session.user.id)
      .single();

    if (!user) {
      console.log('User not found in database');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Проверяем аутентификацию пользователя вместо API ключа
    if (!(await verifyAuthentication())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const dataSource = getDataSource();
    const { userId, letterId, letterNote, photoUrl } = await request.json();

    if (!userId || !letterId) {
      console.error('Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Получаем пользователя через DataSource
    const user = await dataSource.users.getUserById(userId);
    if (!user) {
      console.error('User not found');
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Проверяем наличие каналов уведомлений
    if (!user.channels_for_notification || user.channels_for_notification.length === 0) {
      console.error('No notification channels configured for user');
      return NextResponse.json(
        { success: false, error: 'No notification channels configured for user' },
        { status: 400 }
      );
    }

    const result = await notifyUser({
      user: {
        id: user.id,
        email: user.email || undefined,
        telegram_chat_id: user.telegram_chat_id || undefined,
        channels_for_notification: user.channels_for_notification,
      },
      letterId,
      letterNote,
      photoUrl,
    });

    // Проверяем результат отправки
    const hasSuccess = Object.values(result).some((r) => r?.success);
    if (!hasSuccess) {
      console.error('Failed to send notifications');
      return NextResponse.json(
        { success: false, error: 'Failed to send notifications', details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error('Error in notify-user:', e);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: e },
      { status: 500 }
    );
  }
}
