import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

type LetterWithRoom = Database['public']['Views']['letters_with_rooms']['Row'];
type Room = Database['public']['Tables']['rooms']['Row'];
type RoomResponse = PostgrestSingleResponse<Pick<Room, 'id'>>;
type LetterResponse = PostgrestSingleResponse<LetterWithRoom>;
type NewLetter = Omit<Database['public']['Tables']['letters']['Insert'], 'room_id'> & {
  room_number: string;
  barcode_id?: string;
};

interface OfflineLetter {
  id: number;
  room_number: string;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
  created_at: string;
}

interface UseLettersResult {
  letters: LetterWithRoom[] | undefined;
  isLoading: boolean;
  addLetter: ReturnType<typeof useMutation<LetterWithRoom, Error, NewLetter>>;
  markAsDelivered: ReturnType<typeof useMutation<LetterWithRoom, Error, number>>;
}

export function useLetters(roomNumber?: string): UseLettersResult {
  const queryClient = useQueryClient();

  const { data: letters, isLoading } = useQuery({
    queryKey: ['letters', roomNumber],
    queryFn: async (): Promise<LetterWithRoom[]> => {
      try {
        const roomResponse: RoomResponse = await supabase
          .from('rooms')
          .select('id')
          .eq('room_number', roomNumber)
          .single();

        if (roomResponse.error) throw roomResponse.error;
        if (!roomResponse.data) throw new Error('Room not found');

        const lettersResponse = await supabase
          .from('letters_with_rooms')
          .select('*')
          .eq('room_id', roomResponse.data.id)
          .order('created_at', { ascending: false });

        if (lettersResponse.error) throw lettersResponse.error;
        return lettersResponse.data as LetterWithRoom[];
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
    mutationFn: async (newLetter: NewLetter): Promise<LetterWithRoom> => {
      // Сначала получаем или создаем комнату
      const roomResponse: RoomResponse = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', newLetter.room_number)
        .single();

      if (roomResponse.error && roomResponse.error.code === 'PGRST116') {
        // Комната не найдена, создаем новую
        const newRoomResponse: RoomResponse = await supabase
          .from('rooms')
          .insert({ room_number: newLetter.room_number })
          .select()
          .single();

        if (newRoomResponse.error) throw newRoomResponse.error;
        if (!newRoomResponse.data) throw new Error('Failed to create room');

        // Создаем письмо с новой комнатой
        const letterResponse: LetterResponse = await supabase
          .from('letters')
          .insert({
            ...newLetter,
            room_id: newRoomResponse.data.id,
          })
          .select()
          .single();

        if (letterResponse.error) throw letterResponse.error;
        if (!letterResponse.data) throw new Error('Failed to create letter');

        return letterResponse.data;
      } else if (roomResponse.error) {
        throw roomResponse.error;
      }

      if (!roomResponse.data) throw new Error('Room not found');

      // Создаем письмо с существующей комнатой
      const letterResponse: LetterResponse = await supabase
        .from('letters')
        .insert({
          ...newLetter,
          room_id: roomResponse.data.id,
        })
        .select()
        .single();

      if (letterResponse.error) throw letterResponse.error;
      if (!letterResponse.data) throw new Error('Failed to create letter');

      return letterResponse.data;
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
    onError: (error: Error, variables: NewLetter): void => {
      // В офлайн-режиме сохраняем в локальное хранилище
      if (!navigator.onLine) {
        const offlineData = JSON.parse(
          localStorage.getItem('offlineLetters') || '[]',
        ) as OfflineLetter[];

        const newOfflineLetter: OfflineLetter = {
          id: Date.now(),
          room_number: variables.room_number,
          status: 'pending',
          sync_status: 'pending',
          created_at: new Date().toISOString(),
        };

        offlineData.push(newOfflineLetter);
        localStorage.setItem('offlineLetters', JSON.stringify(offlineData));
      }
    },
  });

  const markAsDelivered = useMutation({
    mutationFn: async (letterId: number): Promise<LetterWithRoom> => {
      const response: LetterResponse = await supabase
        .from('letters')
        .update({
          status: 'delivered',
          delivered_at: new Date().toISOString(),
        })
        .eq('id', letterId)
        .select()
        .single();

      if (response.error) throw response.error;
      if (!response.data) throw new Error('Failed to update letter');

      return response.data;
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
    },
  });

  return {
    letters,
    isLoading,
    addLetter,
    markAsDelivered,
  };
}
