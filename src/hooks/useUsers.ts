import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type User = Database['public']['Tables']['users']['Row'];

export function useUsers(roomNumber?: string) {
  return useQuery<User[]>({
    queryKey: ['users', roomNumber],
    queryFn: async () => {
      if (roomNumber) {
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
      } else {
        // Все пользователи
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('last_name', { ascending: true });
        if (error) throw error;
        return data || [];
      }
    },
  });
}
