import { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Alert from '@mui/material/Alert';

export const metadata: Metadata = {
  title: 'Вход в систему',
  description: 'Войдите в систему для управления письмами',
};

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { error?: string; error_description?: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Вход в систему</h1>
          <p className="mt-2 text-sm text-gray-600">Войдите в систему для управления письмами</p>
        </div>
        {searchParams.error && (
          <div className="mb-6">
            <Alert severity="error" sx={{ mb: 2 }}>
              {searchParams.error_description || 'Произошла ошибка при входе в систему'}
            </Alert>
          </div>
        )}
        <AuthForm />
      </div>
    </div>
  );
}
