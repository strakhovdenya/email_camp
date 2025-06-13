'use client';

import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Mail, Lock } from 'lucide-react';
import { useToast } from '@/providers/ToastProvider';
import { useSearchParams, useRouter } from 'next/navigation';
import { TOAST_TYPES } from '@/constants/toastTypes';

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || '';
  const errorDescription = searchParams?.get('error_description') || '';
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      if (onSuccess) onSuccess();
      router.push('/');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Ошибка входа', TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
      if (onSuccess) onSuccess();
      router.push('/');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Ошибка входа через Google',
        TOAST_TYPES.ERROR
      );
      setLoading(false);
    }
  };

  return (
    <Box className="w-full max-w-sm mx-auto p-6 space-y-6">
      <Typography variant="h5" component="h1" className="text-center font-semibold">
        Вход в систему
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={handleGoogleSignIn}
        disabled={loading}
        startIcon={
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        }
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          py: 1.5,
          borderColor: '#e5e7eb',
          '&:hover': {
            borderColor: '#d1d5db',
            background: '#f9fafb',
          },
        }}
      >
        Войти через Google
      </Button>
      <Divider className="my-4">или</Divider>
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: <Mail className="w-5 h-5 text-gray-400 mr-2" />,
          }}
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: <Lock className="w-5 h-5 text-gray-400 mr-2" />,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            py: 1.5,
            '&:hover': {
              background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
            },
          }}
        >
          Войти
        </Button>
      </form>
      <div className="text-center space-y-2">
        <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:text-blue-700">
          Забыли пароль?
        </Link>
        <div className="text-sm text-gray-500">
          Нет аккаунта?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700">
            Зарегистрироваться
          </Link>
        </div>
        {error === 'access_denied' && errorDescription?.includes('expired') && (
          <div className="text-sm text-gray-500 mt-4">
            Ссылка для подтверждения истекла.{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700">
              Зарегистрироваться заново
            </Link>
          </div>
        )}
      </div>
    </Box>
  );
}
