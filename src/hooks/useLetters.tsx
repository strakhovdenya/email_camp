import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { NotificationToast } from '@/components/ui/NotificationToast';
import React from 'react';

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

export function useAddLetter(roomNumber?: string) {
  const queryClient = useQueryClient();
  // Состояние для loader
  const [notifying, setNotifying] = React.useState(false);

  const mutation = useMutation({
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
            const resJson = await response.json();
            const result = resJson.result || {};
            const statuses: { channel: 'email' | 'telegram'; success: boolean }[] = [];
            if ('email' in result)
              statuses.push({ channel: 'email', success: !!result.email.success });
            if ('telegram' in result)
              statuses.push({ channel: 'telegram', success: !!result.telegram.success });
            toast.custom(() => <NotificationToast statuses={statuses} />, { duration: 5000 });
          } else {
            toast.custom(
              () => (
                <NotificationToast
                  statuses={[
                    { channel: 'email', success: false },
                    { channel: 'telegram', success: false },
                  ]}
                />
              ),
              { duration: 5000 }
            );
          }
        } catch (error) {
          console.error('Error notifying user:', error);
          toast.custom(
            () => (
              <NotificationToast
                statuses={[
                  { channel: 'email', success: false },
                  { channel: 'telegram', success: false },
                ]}
              />
            ),
            { duration: 5000 }
          );
        } finally {
          setNotifying(false);
        }
      }

      return data;
    },
    onSuccess: () => {
      invalidateMailQueries(queryClient, roomNumber);
      toast.success('Letter added successfully!');
    },
    onError: (error) => {
      console.error('Error adding letter:', error);
      toast.error('Error adding letter. Please try again.');
    },
  });

  return { ...mutation, notifying };
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
      invalidateMailQueries(queryClient, roomNumber);
      toast.success('Письмо выдано!');
    },
    onError: (error) => {
      console.error('Error marking letter as delivered:', error);
      toast.error('Ошибка при выдаче письма');
    },
  });
}
