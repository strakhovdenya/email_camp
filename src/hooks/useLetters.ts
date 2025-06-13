import { useQuery } from '@tanstack/react-query';
import type { LetterWithRelations } from '@/types/supabase';

export function useLetters() {
  return useQuery<LetterWithRelations[]>({
    queryKey: ['letters'],
    queryFn: async () => {
      const response = await fetch('/api/letters');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch letters');
      }

      return result.data;
    },
  });
}
