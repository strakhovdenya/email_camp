'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function InvitePage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!password || password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }
    try {
      if (!token) throw new Error('Некорректная ссылка приглашения');
      // Активируем сессию по токену
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(token);
      if (sessionError) throw sessionError;
      // Устанавливаем пароль
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) throw pwError;
      setSuccess(true);
      setTimeout(() => router.push('/auth'), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при установке пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="w-full max-w-sm mx-auto p-6 space-y-6">
      <Typography variant="h5" component="h1" className="text-center font-semibold">
        Установка пароля
      </Typography>
      {success ? (
        <Typography color="success.main" className="text-center">
          Пароль установлен! Перенаправление на вход...
        </Typography>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}>
            Установить пароль
          </Button>
        </form>
      )}
    </Box>
  );
}
