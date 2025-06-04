import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types/supabase';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*, room:rooms(room_number)');
      if (error) throw error;
      return data || [];
    },
  });
}
