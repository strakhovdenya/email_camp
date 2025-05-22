import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Letter {
  id: number;
  room_id: number;
  // room_number не хранится в таблице, но может быть в view или для фильтрации
  created_at: string;
  delivered_at: string | null;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
}

interface AddLetterInput {
  room_number: string;
  note?: string;
}

export const useLetters = (roomNumber?: string) => {
  const queryClient = useQueryClient();

  const { data: letters = [], isLoading } = useQuery<Letter[]>({
    queryKey: ['letters', roomNumber],
    queryFn: async () => {
      let query = supabase.from('letters').select('*').order('created_at', { ascending: false });
      if (roomNumber) {
        // Получаем room_id по room_number
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('id')
          .eq('room_number', roomNumber)
          .single();
        if (roomError) throw roomError;
        if (!room) return [];
        query = query.eq('room_id', room.id);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const addLetter = useMutation({
    mutationFn: async (input: AddLetterInput) => {
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', input.room_number)
        .single();

      if (roomError) throw roomError;

      const { data, error } = await supabase
        .from('letters')
        .insert([
          {
            room_id: room.id,
            status: 'pending',
            sync_status: 'pending',
            note: input.note ?? null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['letters'] });
      void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
  });

  const markAsDelivered = useMutation({
    mutationFn: async (letterId: number) => {
      const { data, error } = await supabase
        .from('letters')
        .update({
          status: 'delivered',
          delivered_at: new Date().toISOString(),
        })
        .eq('id', letterId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['letters'] });
      void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
  });

  return {
    letters,
    isLoading,
    addLetter,
    markAsDelivered,
  };
};
