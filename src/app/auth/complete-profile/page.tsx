'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CompleteProfilePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Новый useEffect для обработки access_token и refresh_token из hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token });
        window.location.hash = '';
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Нет данных пользователя');
        setLoading(false);
        return;
      }
      setEmail(user.email || '');
      setRole(user.user_metadata?.role || '');
      // Проверяем, есть ли уже запись в users
      const { data: userRow } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (userRow) {
        router.push('/');
        return;
      }
      // Проверяем, установлен ли пароль (user.has_password не всегда есть, поэтому пробуем обновить пароль только если явно задано)
      setShowPasswordFields(
        !user?.app_metadata?.provider || user?.app_metadata?.provider === 'email'
      );
      setLoading(false);
    })();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Нет данных пользователя');
      if (showPasswordFields) {
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
        // Устанавливаем пароль
        const { error: pwError } = await supabase.auth.updateUser({ password });
        if (pwError) throw pwError;
      }
      // Добавляем запись в users
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: user.id,
          email: user.email,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          role: role,
        },
      ]);
      if (dbError) throw dbError;
      // Обновляем user_metadata
      await supabase.auth.updateUser({
        data: { first_name: firstName.trim(), last_name: lastName.trim(), role },
      });
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении профиля');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <Box className="w-full max-w-sm mx-auto p-6 space-y-6">
      <Typography variant="h5" component="h1" className="text-center font-semibold">
        Завершите регистрацию
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField fullWidth label="Email" value={email} disabled />
        <TextField
          fullWidth
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField fullWidth label="Роль" value={role} disabled />
        {showPasswordFields && (
          <>
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
          </>
        )}
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}>
          Сохранить
        </Button>
      </form>
    </Box>
  );
}
