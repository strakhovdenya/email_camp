import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  try {
    // Публичный клиент для проверки роли
    const supabasePublic = createRouteHandlerClient({ cookies });
    const { email, role } = await request.json();

    // Проверяем, что пользователь авторизован и является админом
    const {
      data: { user },
    } = await supabasePublic.auth.getUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { data: userData, error: userError } = await supabasePublic
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    if (userError || !userData || userData.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Серверный клиент с сервисным ключом для инвайта
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const redirectTo =
      process.env.NODE_ENV === 'production'
        ? 'https://email-camp-khaki.vercel.app/auth/complete-profile'
        : 'http://localhost:3000/auth/complete-profile';

    const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { role },
      redirectTo,
    });
    if (inviteError) {
      console.error('Invite error:', inviteError);
      if (inviteError.status === 422 && inviteError.code === 'email_exists') {
        return NextResponse.json(
          { message: 'Пользователь с таким email уже зарегистрирован.' },
          { status: 409 }
        );
      }
      if (inviteError.status === 400 && inviteError.code === 'email_address_invalid') {
        return NextResponse.json({ message: 'Некорректный формат email адреса.' }, { status: 400 });
      }
      return NextResponse.json({ message: 'Не удалось отправить приглашение.' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invite error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
