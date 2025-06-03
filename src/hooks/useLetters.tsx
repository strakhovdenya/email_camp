import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { TOAST_TYPES } from '@/constants/toastTypes';
import React from 'react';
import type { Letter } from '@/components/ui/LetterCard/types';

interface AddLetterInput {
  room_number: string;
  note?: string;
  photo_url?: string;
  user_id?: number;
}

// Query keys
export const QUERY_KEYS = {
  LETTERS: 'letters',
  ROOMS_WITH_LETTERS: 'rooms-with-letters',
  USERS: 'users',
};

// Утилита для инвалидации связанных с письмами запросов
export function invalidateMailQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  roomNumber?: string
) {
  void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LETTERS] });
  if (roomNumber) {
    void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LETTERS, roomNumber] });
  }
  void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS_WITH_LETTERS] });
}

type UseAddLetterResult = UseMutationResult<Letter, Error, AddLetterInput, unknown> & {
  notifying: boolean;
};

export function useAddLetter(roomNumber?: string): UseAddLetterResult {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  // Состояние для loader
  const [notifying, setNotifying] = React.useState(false);

  const mutation = useMutation<Letter, Error, AddLetterInput>({
    mutationFn: async (input: AddLetterInput) => {
      // Создаем письмо
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
            recipient_notified: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // После добавления письма отправляем уведомления через централизованный API-роут
      if (input.user_id) {
        try {
          setNotifying(true);
          const response = await fetch('/api/notify-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: input.user_id,
              letterId: data.id,
              letterNote: input.note,
              photoUrl: input.photo_url,
            }),
          });
          if (response.ok) {
            // Можно расширить ToastProvider для кастомных компонентов
            showToast('Уведомления отправлены', TOAST_TYPES.INFO);
          } else {
            showToast('Ошибка при отправке уведомлений', TOAST_TYPES.ERROR);
          }
        } catch (error) {
          console.error('Error notifying user:', error);
          showToast('Ошибка при отправке уведомлений', TOAST_TYPES.ERROR);
        } finally {
          setNotifying(false);
        }
      }

      return data;
    },
    onSuccess: () => {
      invalidateMailQueries(queryClient, roomNumber);
      showToast('Письмо успешно добавлено!', TOAST_TYPES.SUCCESS);
    },
    onError: (error) => {
      console.error('Error adding letter:', error);
      showToast('Ошибка при добавлении письма. Попробуйте ещё раз.', TOAST_TYPES.ERROR);
    },
  });

  return { ...mutation, notifying };
}

export function useMarkAsDelivered(roomNumber?: string) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
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
      invalidateMailQueries(queryClient, roomNumber);
      showToast('Письмо выдано!', TOAST_TYPES.SUCCESS);
    },
    onError: (error) => {
      console.error('Error marking letter as delivered:', error);
      showToast('Ошибка при выдаче письма', TOAST_TYPES.ERROR);
    },
  });
}
