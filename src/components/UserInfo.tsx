'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/auth';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { USER_ROLES, ROLE_ADMIN, ROLE_STAFF } from '@/constants/userRoles';

const ROLE_LABELS: Record<string, string> = {};
USER_ROLES.forEach((r) => {
  ROLE_LABELS[r.value] = r.label;
});

export default function UserInfo() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  if (isLoading || !user) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      sx={{ p: 1, minWidth: 200 }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: '#1976d2' }}>{user.email?.[0]?.toUpperCase() || '?'}</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} sx={{ lineHeight: 1 }}>
            {user.email}
          </Typography>
          <Chip
            label={ROLE_LABELS[user.role] || user.role}
            color={
              user.role === ROLE_ADMIN
                ? 'primary'
                : user.role === ROLE_STAFF
                  ? 'secondary'
                  : 'default'
            }
            size="small"
            sx={{ mt: 0.5, fontWeight: 500 }}
          />
        </Box>
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ minWidth: 0, px: 1.5 }}
      >
        Выйти
      </Button>
    </Box>
  );
}
