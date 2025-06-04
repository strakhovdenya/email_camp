import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types/supabase';

export function useUsersByRoom(roomNumber: string) {
  return useQuery<User[]>({
    queryKey: ['users', roomNumber],
    queryFn: async () => {
      // Получаем id комнаты по номеру
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', roomNumber)
        .single();
      if (roomError || !room) throw roomError || new Error('Комната не найдена');
      // Получаем пользователей этой комнаты
      const { data, error } = await supabase
        .from('users')
        .select('*, room:rooms(room_number)')
        .eq('room_id', room.id);
      if (error) throw error;
      return data || [];
    },
  });
}
