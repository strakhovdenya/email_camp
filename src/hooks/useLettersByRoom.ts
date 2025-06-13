import { useQuery } from '@tanstack/react-query';
import type { LetterWithRelations } from '@/types/supabase';

export function useLettersByRoom(roomNumber: string) {
  return useQuery<LetterWithRelations[]>({
    queryKey: ['letters', roomNumber],
    queryFn: async () => {
      const response = await fetch(`/api/letters/by-room?roomNumber=${roomNumber}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch letters');
      }

      return result.data;
    },
  });
}
