import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type LetterWithRoom = Database['public']['Views']['letters_with_rooms']['Row'];
type Letter = Database['public']['Tables']['letters']['Row'];
type NewLetter = Omit<Database['public']['Tables']['letters']['Insert'], 'room_id'> & {
  room_number: string;
};

export function useLetters(roomNumber?: string) {
  const queryClient = useQueryClient();

  const { data: letters, isLoading } = useQuery({
    queryKey: ['letters', roomNumber],
    queryFn: async () => {
      try {
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('id')
          .eq('room_number', roomNumber)
          .single();

        if (roomError) throw roomError;

        const { data, error } = await supabase
          .from('letters_with_rooms')
          .select('*')
          .eq('room_id', room.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as LetterWithRoom[];
      } catch (error) {
        // В офлайн-режиме возвращаем кэшированные данные
        const cachedData = queryClient.getQueryData(['letters', roomNumber]);
        if (cachedData) return cachedData as LetterWithRoom[];
        return [];
      }
    },
    enabled: !!roomNumber,
  });

  const addLetter = useMutation({
    mutationFn: async (newLetter: NewLetter) => {
      // Сначала получаем или создаем комнату
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', newLetter.room_number)
        .single();

      if (roomError && roomError.code === 'PGRST116') {
        // Комната не найдена, создаем новую
        const { data: newRoom, error: createRoomError } = await supabase
          .from('rooms')
          .insert({ room_number: newLetter.room_number })
          .select()
          .single();

        if (createRoomError) throw createRoomError;
        
        // Создаем письмо с новой комнатой
        const { data, error } = await supabase
          .from('letters')
          .insert({
            ...newLetter,
            room_id: newRoom.id,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      } else if (roomError) {
        throw roomError;
      }

      // Создаем письмо с существующей комнатой
      const { data, error } = await supabase
        .from('letters')
        .insert({
          ...newLetter,
          room_id: room.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
    onError: (error, variables) => {
      // В офлайн-режиме сохраняем в локальное хранилище
      if (!navigator.onLine) {
        const offlineData = JSON.parse(localStorage.getItem('offlineLetters') || '[]');
        offlineData.push({ 
          ...variables,
          id: Date.now(),
          sync_status: 'pending',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('offlineLetters', JSON.stringify(offlineData));
      }
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
      queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
  });

  return {
    letters,
    isLoading,
    addLetter,
    markAsDelivered,
  };
} 