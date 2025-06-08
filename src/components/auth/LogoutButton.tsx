'use client';

import { signOut } from '@/lib/auth';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/auth');
    } else {
      alert('Ошибка при выходе из аккаунта');
    }
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Выйти
    </Button>
  );
}
