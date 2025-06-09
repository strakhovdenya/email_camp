'use client';
import { useState, useEffect } from 'react';
import { USER_ROLES, ROLE_ADMIN } from '@/constants/userRoles';
import { supabase } from '@/lib/auth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(USER_ROLES[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // Получаем роль текущего пользователя
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data?.user;
      if (!user) {
        setIsAdmin(false);
        return;
      }
      let role = user.user_metadata?.role;
      if (!role) {
        const { data: userRow } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        role = userRow?.role;
      }
      setIsAdmin(role === ROLE_ADMIN);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (isAdmin === false) {
      setError('Только администратор может приглашать пользователей');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName, last_name: lastName, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка при создании пользователя');
      setSuccess(true);
      setEmail('');
      setFirstName('');
      setLastName('');
      setRole(USER_ROLES[0].value);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при отправке приглашения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="w-full max-w-md mx-auto p-6 space-y-6">
      <Typography variant="h6" className="text-center font-semibold">
        Пригласить пользователя
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <FormControl fullWidth required>
          <InputLabel id="role-label">Роль</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Роль"
            onChange={(e) => setRole(e.target.value as string)}
          >
            {USER_ROLES.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">Пользователь приглашён!</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || isAdmin === false}
        >
          Пригласить
        </Button>
      </form>
      {isAdmin === false && (
        <Typography color="error" className="text-center mt-2">
          Только администратор может приглашать пользователей
        </Typography>
      )}
    </Box>
  );
}
