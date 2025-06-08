import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/lib/database.types';

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
      console.error('Ошибка при обмене кода на сессию:', sessionError);
      return NextResponse.redirect(`${requestUrl.origin}/auth?error=invalid_code`);
    }

    if (session?.user) {
      // Проверяем, существует ли уже запись в таблице users
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 - запись не найдена
        console.error('Ошибка при проверке существующего пользователя:', checkError);
        return NextResponse.redirect(`${requestUrl.origin}/auth?error=db_error`);
      }

      // Если записи нет, создаем новую
      if (!existingUser) {
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: session.user.id,
            email: session.user.email,
            role: session.user.user_metadata.role || 'staff',
            first_name: session.user.user_metadata.first_name,
            last_name: session.user.user_metadata.last_name,
          },
        ]);

        if (insertError) {
          console.error('Ошибка при создании записи пользователя:', insertError);
          return NextResponse.redirect(`${requestUrl.origin}/auth?error=db_error`);
        }
      }
    }
  }

  // URL для перенаправления после успешной аутентификации
  return NextResponse.redirect(`${requestUrl.origin}/auth/email-verified`);
}
