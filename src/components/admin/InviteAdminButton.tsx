'use client';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'sonner';
import { supabase } from '@/lib/auth';
import { ROLE_ADMIN, ROLE_STAFF } from '@/constants/userRoles';

export function InviteAdminButton() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>(ROLE_STAFF);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data?.user;
      if (!user) {
        if (isMounted) setIsAdmin(false);
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
      if (isMounted) setIsAdmin(role === ROLE_ADMIN);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInvite = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send invite');
      }

      toast.success('Приглашение успешно отправлено');
      setIsOpen(false);
      setEmail('');
      setRole(ROLE_STAFF);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send invite');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
        sx={{
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 2,
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
          },
        }}
      >
        Пригласить пользователя
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontSize: 20 }}>
          <span className="text-xl font-semibold">Пригласить нового пользователя</span>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
              size="small"
              placeholder="email@example.com"
              sx={{ mb: 1 }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="role-select-label">Роль</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Роль"
                onChange={(e) => setRole(e.target.value as string)}
              >
                <MenuItem value={ROLE_ADMIN}>Администратор</MenuItem>
                <MenuItem value={ROLE_STAFF}>Персонал</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleInvite}
            disabled={isLoading || !email}
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Отправить приглашение'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
