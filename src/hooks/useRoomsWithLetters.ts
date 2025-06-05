import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useRoomsWithLetters = () => {
  return useQuery({
    queryKey: ['rooms-with-letters'],
    queryFn: async () => {
      const { data: rooms, error } = await supabase
        .from('rooms')
        .select('id, room_number, letters(id, status)');
      if (error) throw error;
      return (rooms || []).map((room) => ({
        ...room,
        total_letters: room.letters.length,
        delivered_count: room.letters.filter((l) => l.status === 'delivered').length,
        undelivered_count: room.letters.filter((l) => l.status !== 'delivered').length,
      }));
    },
  });
};
