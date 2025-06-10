import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/lib/database.types';
import { ROLE_ADMIN } from '@/constants/userRoles';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Обмениваем код на сессию
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      return NextResponse.redirect(`${requestUrl.origin}/auth?error=invalid_code`);
    }

    if (session?.user) {
      const meta = session.user.user_metadata;
      const firstName = meta.first_name || meta.full_name?.split(' ')[0] || '';
      const lastName = meta.last_name || meta.full_name?.split(' ').slice(1).join(' ') || '';
      let role = meta.role || '';
      // Проверяем, существует ли уже запись в таблице users
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id, role')
        .eq('role', ROLE_ADMIN)
        .single();
      if (!existingUser) {
        // Первый пользователь — всегда admin
        role = ROLE_ADMIN;
      }

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 - запись не найдена
        return NextResponse.redirect(`${requestUrl.origin}/auth?error=db_error`);
      }

      // Если не хватает данных — редиректим на /auth/complete-profile
      if (!firstName || !lastName || !role) {
        return NextResponse.redirect(`${requestUrl.origin}/auth/complete-profile`);
      }

      // Если записи нет, создаем новую
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: session.user.id,
          email: session.user.email,
          role,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (insertError) {
        return NextResponse.redirect(`${requestUrl.origin}/auth?error=db_error`);
      }
    }
  }

  // URL для перенаправления после успешной аутентификации
  return NextResponse.redirect(`${requestUrl.origin}/auth/email-verified`);
}
