import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ROLE_ADMIN } from '@/constants/userRoles';

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey!);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Список API endpoints, которые работают с API ключами вместо пользовательских сессий
  const publicApiRoutes: string[] = []; // Убираем /api/notify-user
  const isPublicApiRoute = publicApiRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Усиленная защита: запрещаем любые POST-запросы на /auth/signup, если есть хотя бы один admin
  if (req.nextUrl.pathname === '/auth/signup' && (req.method === 'POST' || req.method === 'GET')) {
    const { data: admins } = await supabaseAdmin.from('users').select('id').eq('role', ROLE_ADMIN);
    if (admins && admins.length > 0) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Запретить регистрацию через Google OAuth для новых пользователей
  if (
    req.nextUrl.pathname.startsWith('/auth/v1/authorize') &&
    req.nextUrl.searchParams.get('provider') === 'google'
  ) {
    // Проверяем, есть ли пользователь с таким email в базе (можно реализовать через invite flow)
    // Здесь просто запрещаем self-signup через Google
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    redirectUrl.searchParams.set('error', 'google_signup_disabled');
    return NextResponse.redirect(redirectUrl);
  }

  // Если пользователь не авторизован и пытается получить доступ к защищенным маршрутам
  // Исключаем публичные API routes, которые используют API ключи
  if (!session && 
      !req.nextUrl.pathname.startsWith('/auth') && 
      !req.nextUrl.pathname.startsWith('/showcase') &&
      !isPublicApiRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Если пользователь авторизован и пытается получить доступ к страницам аутентификации, кроме /auth/email-verified и /auth/complete-profile
  if (
    session &&
    req.nextUrl.pathname.startsWith('/auth') &&
    req.nextUrl.pathname !== '/auth/email-verified' &&
    req.nextUrl.pathname !== '/auth/complete-profile'
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Если есть параметры ошибки в URL, перенаправляем на страницу входа с этими параметрами
  const error = req.nextUrl.searchParams.get('error');
  if (error && req.nextUrl.pathname === '/auth') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    redirectUrl.searchParams.set('error', error);
    if (req.nextUrl.searchParams.get('error_description')) {
      redirectUrl.searchParams.set(
        'error_description',
        req.nextUrl.searchParams.get('error_description') || ''
      );
    }
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
