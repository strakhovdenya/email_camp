import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface AddLetterInput {
  room_number: string;
  note?: string;
  photo_url?: string;
  user_id?: number;
}

export function useAddLetter(roomNumber?: string) {
  const queryClient = useQueryClient();
  return useMutation({
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
            photo_url: input.photo_url ?? null,
            user_id: input.user_id ?? null,
          },
        ])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['letters'] });
      if (roomNumber) {
        void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
      }
    },
  });
}

export function useMarkAsDelivered(roomNumber?: string) {
  const queryClient = useQueryClient();
  return useMutation({
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
      if (roomNumber) {
        void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
      }
    },
  });
}
