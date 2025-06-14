import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import React from 'react';
import type { Letter } from '@/components/ui/LetterCard/types';

interface AddLetterInput {
  room_number: string;
  note?: string;
  photo_url?: string;
  user_id?: string;
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
      setNotifying(true);
      const response = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      setNotifying(false);
      if (result.success) {
        showToast(result.message || 'Письмо успешно добавлено!', TOAST_TYPES.SUCCESS);

        // Отправляем уведомление
        if (input.user_id) {
          try {
            const notifyResponse = await fetch('/api/notify-user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: input.user_id,
                letterId: result.data.id,
                letterNote: input.note,
                photoUrl: input.photo_url,
              }),
            });
            const notifyResult = await notifyResponse.json();
            if (notifyResult.success) {
              showToast('Уведомление отправлено!', TOAST_TYPES.SUCCESS);
            } else {
              showToast('Ошибка при отправке уведомления', TOAST_TYPES.ERROR);
            }
          } catch (error) {
            showToast('Ошибка при отправке уведомления неожиданная', TOAST_TYPES.ERROR);
          }
        }
        return result.data;
      } else {
        throw new Error(result.error || 'Неизвестная ошибка');
      }
    },
    onSuccess: () => {
      invalidateMailQueries(queryClient, roomNumber);
    },
    onError: () => {
      // Ошибка уже обработана через showToast в mutationFn
    },
  });

  return { ...mutation, notifying };
}

export function useMarkAsDelivered(roomNumber?: string) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async (letterId: string) => {
      const response = await fetch('/api/letters/deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letterId }),
      });
      const result = await response.json();
      if (result.success) {
        const letter = result.data;
        const recipientName = letter.users ? 
          `${letter.users.last_name} ${letter.users.first_name}` : 
          `комната ${letter.room_number}`;
        
        showToast(
          `Письмо выдано получателю: ${recipientName}`, 
          TOAST_TYPES.SUCCESS
        );
        return result.data;
      } else {
        showToast(result.error || 'Ошибка при выдаче письма', TOAST_TYPES.ERROR);
        throw new Error(result.error || 'Ошибка при выдаче письма');
      }
    },
    onSuccess: () => {
      // Добавляем небольшую задержку перед обновлением данных
      // чтобы анимация успела завершиться
      setTimeout(() => {
      invalidateMailQueries(queryClient, roomNumber);
      }, 100);
    },
    onError: () => {
      // Ошибка уже обработана через showToast
    },
  });
}
