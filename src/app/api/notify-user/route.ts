import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { notifyUser } from '@/services/notifications/notifyUser';

export async function POST(request: Request) {
  try {
    const { userId, letterId, letterNote, photoUrl } = await request.json();
    if (!userId || !letterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    type User = {
      id: string;
      email: string;
      channels_for_notification: string[];
      telegram_chat_id?: string | null | undefined;
    };

    // Получаем пользователя с нужными полями
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, channels_for_notification')
      .eq('id', userId)
      .single();
    if (userError) {
      return NextResponse.json({ error: 'Supabase error', details: userError }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    (user as User).telegram_chat_id = '123';

    const result = await notifyUser({
      user,
      letterId,
      letterNote,
      photoUrl,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
