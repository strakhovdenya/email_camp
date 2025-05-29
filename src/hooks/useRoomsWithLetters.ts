import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { QUERY_KEYS } from './useLetters';

interface RoomWithPendingLetters {
  room_number: string;
  pending_count: number;
}

export const useRoomsWithLetters = () => {
  const { data: rooms = [], isLoading } = useQuery<RoomWithPendingLetters[]>({
    queryKey: [QUERY_KEYS.ROOMS_WITH_LETTERS],
    queryFn: async () => {
      // Получаем все комнаты с id и room_number
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('id, room_number')
        .order('room_number', { ascending: true });
      if (roomsError) throw roomsError;

      // Для каждой комнаты считаем количество писем со статусом 'pending' по room_id
      const result = await Promise.all(
        (roomsData || []).map(async (room) => {
          const { count, error: pendingError } = await supabase
            .from('letters')
            .select('*', { count: 'exact', head: true })
            .eq('room_id', room.id)
            .eq('status', 'pending');
          if (pendingError) throw pendingError;
          return {
            room_number: room.room_number,
            pending_count: count || 0,
          };
        })
      );
      return result;
    },
  });
  return { rooms, isLoading };
};
