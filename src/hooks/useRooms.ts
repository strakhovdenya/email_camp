import { useQuery } from '@tanstack/react-query';
import type { Room } from '@/types/supabase';

export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('/api/rooms');
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Ошибка получения списка комнат');
      return result.data || [];
    },
  });
}
