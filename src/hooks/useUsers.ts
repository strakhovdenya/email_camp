import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/supabase';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Ошибка получения пользователей');
      return result.data || [];
    },
  });
}
