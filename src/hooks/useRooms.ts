import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Room } from '@/types/supabase';

export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('room_number', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}
