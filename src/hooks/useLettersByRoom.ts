import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { LetterWithRelations } from '@/types/supabase';

export function useLettersByRoom(roomNumber: string) {
  return useQuery<LetterWithRelations[]>({
    queryKey: ['letters', roomNumber],
    queryFn: async () => {
      // Получаем id комнаты по номеру
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', roomNumber)
        .single();
      if (roomError || !room) throw roomError || new Error('Комната не найдена');
      // Получаем письма этой комнаты
      const { data, error } = await supabase
        .from('letters')
        .select('*, rooms(room_number), users(id, first_name, last_name, email)')
        .eq('room_id', room.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}
