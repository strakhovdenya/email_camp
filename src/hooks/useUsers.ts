import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import { QUERY_KEYS } from './useLetters';

export type User = Database['public']['Tables']['users']['Row'];

export function useUsers(roomNumber: string) {
  return useQuery<User[]>({
    queryKey: [QUERY_KEYS.USERS, roomNumber],
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
        .select('*')
        .eq('room_id', room.id)
        .order('last_name', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}
