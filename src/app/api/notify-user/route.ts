import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';
import { notifyUser } from '@/services/notifications/notifyUser';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

export async function POST(request: Request) {
  try {
    const supabase = supabaseService.getAdminClient();
    const { userId, letterId, letterNote, photoUrl } = await request.json();
    if (!userId || !letterId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Получаем пользователя с нужными полями
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, channels_for_notification, telegram_chat_id')
      .eq('id', userId)
      .single();
    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { success: false, error: 'Error fetching user', details: userError },
        { status: 500 }
      );
    }
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Проверяем наличие каналов уведомлений
    if (!user.channels_for_notification || user.channels_for_notification.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No notification channels configured for user' },
        { status: 400 }
      );
    }

    const result = await notifyUser({
      user,
      letterId,
      letterNote,
      photoUrl,
    });

    // Проверяем результат отправки
    const hasSuccess = Object.values(result).some((r) => r?.success);
    if (!hasSuccess) {
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
