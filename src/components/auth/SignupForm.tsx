'use client';

import React, { useState, useRef, useEffect } from 'react';
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useToast } from '@/providers/ToastProvider';
import { supabase } from '@/lib/auth';
import Divider from '@mui/material/Divider';
import { USER_ROLES, ROLE_ADMIN } from '@/constants/userRoles';
import { useRouter } from 'next/navigation';
import { TOAST_TYPES } from '@/constants/toastTypes';

const REGISTRATION_ROLES = USER_ROLES.filter((r) => r.canRegister);
const ALLOWED_ROLES = REGISTRATION_ROLES.map((r) => r.value);

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [onlyAdmin, setOnlyAdmin] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
      // После этого пользователь будет перенаправлен на страницу аутентификации Google
      // Обработка данных пользователя будет происходить на странице callback
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Ошибка регистрации через Google',
        TOAST_TYPES.ERROR
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ALLOWED_ROLES.includes(role)) {
      showToast('Недопустимая роль', TOAST_TYPES.ERROR);
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      showToast('Пожалуйста, заполните имя и фамилию', TOAST_TYPES.ERROR);
      return;
    }
    setLoading(true);
    try {
      console.log('Начало регистрации:', { email, role, firstName, lastName });

      // Регистрация в Supabase Auth
      const { data, error } = await signUpWithEmail(email, password, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        role,
      });
      console.log('Результат регистрации:', { data, error });

      if (error) {
        const msg = error.message || '';
        if (
          msg.toLowerCase().includes('user already registered') ||
          (msg.toLowerCase().includes('email') && msg.toLowerCase().includes('exists'))
        ) {
          showToast(
            'Пользователь с таким email уже существует. Войдите в систему.',
            TOAST_TYPES.ERROR
          );
          router.push('/auth');
          return;
        }
        showToast(msg || 'Ошибка регистрации!!', TOAST_TYPES.ERROR);
        return;
      }
      const user = data.user;
      if (user?.user_metadata?.email_verified === false) {
        showToast('Проверьте почту для подтверждения регистрации.', TOAST_TYPES.SUCCESS);
        setEmail('');
        setPassword('');
        setRole(REGISTRATION_ROLES[0].value);
        setFirstName('');
        setLastName('');
        setAwaitingConfirmation(true);
        return;
      } else {
        showToast(
          'Пользователь с таким email уже существует. Войдите в систему.',
          TOAST_TYPES.ERROR
        );
        router.push('/auth');
        return;
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      showToast(error instanceof Error ? error.message : 'Ошибка регистрации', TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const checkEmailConfirmed = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.email_confirmed_at) {
      showToast('Почта подтверждена! Выполняется вход...', TOAST_TYPES.SUCCESS);
      setAwaitingConfirmation(false);
      router.push('/');
    } else {
      showToast('Почта ещё не подтверждена. Попробуйте позже.', TOAST_TYPES.INFO);
    }
  };

  useEffect(() => {
    if (!awaitingConfirmation) return;
    pollingRef.current = setInterval(async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email_confirmed_at) {
        showToast('Почта подтверждена! Выполняется вход...', TOAST_TYPES.SUCCESS);
        setAwaitingConfirmation(false);
        clearInterval(pollingRef.current!);
        router.push('/');
      }
    }, 15000); // 15 секунд
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [awaitingConfirmation, router, showToast]);

  useEffect(() => {
    // Проверяем, есть ли админ в базе
    supabase
      .from('users')
      .select('id')
      .eq('role', ROLE_ADMIN)
      .then(({ data }) => {
        if (!data || data.length === 0) setOnlyAdmin(true);
      });
  }, []);

  return (
    <Box className="w-full max-w-sm mx-auto p-6 space-y-6">
      <Typography variant="h5" component="h1" className="text-center font-semibold">
        Регистрация
      </Typography>
      {awaitingConfirmation ? (
        <Box className="space-y-4 text-center">
          <Typography variant="body1" color="primary">
            Проверьте почту для подтверждения регистрации.
            <br />
            После подтверждения вы будете автоматически перенаправлены.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={checkEmailConfirmed}
            disabled={loading}
          >
            Я уже подтвердил почту
          </Button>
        </Box>
      ) : (
        <>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleSignUp}
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
            Зарегистрироваться через Google
          </Button>
          <Divider className="my-4">или</Divider>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControl fullWidth required>
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Роль"
                onChange={(e) => setRole(e.target.value as string)}
                disabled={onlyAdmin}
              >
                {onlyAdmin ? (
                  <MenuItem value={ROLE_ADMIN}>Администратор</MenuItem>
                ) : (
                  REGISTRATION_ROLES.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
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
              Зарегистрироваться
            </Button>
          </form>
        </>
      )}
    </Box>
  );
}
