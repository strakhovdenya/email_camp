import { Metadata } from 'next';
import { SignupForm } from '@/components/auth/SignupForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Создайте новый аккаунт администратора или сотрудника',
};

export default async function SignupPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Регистрация</h1>
          <p className="mt-2 text-sm text-gray-600">Только для администраторов и сотрудников</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
