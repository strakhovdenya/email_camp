import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { LetterWithRelations } from '@/types/supabase';

export function useLetters() {
  return useQuery<LetterWithRelations[]>({
    queryKey: ['letters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('*, rooms(room_number), users(first_name, last_name, email)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}
