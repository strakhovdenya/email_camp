import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface RoomWithLetters {
  room_number: string;
  letters_count: number;
}

interface RoomData {
  room_number: string;
  letters: { count: number }[];
}

export const useRoomsWithLetters = () => {
  const { data: rooms = [], isLoading } = useQuery<RoomWithLetters[]>({
    queryKey: ['rooms-with-letters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('room_number, letters:letters(count)')
        .order('room_number', { ascending: true });
      if (error) throw error;
      return (data || []).map((room: RoomData) => ({
        room_number: room.room_number,
        letters_count: room.letters?.[0]?.count || 0,
      }));
    },
  });
  return { rooms, isLoading };
};
