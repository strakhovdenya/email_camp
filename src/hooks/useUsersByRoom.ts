import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/supabase';

export function useUsersByRoom(roomNumber: string) {
  return useQuery<User[]>({
    queryKey: ['users', roomNumber],
    queryFn: async () => {
      const res = await fetch(`/api/rooms/${roomNumber}/users`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Ошибка при получении пользователей');
      return result.data || [];
    },
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}
