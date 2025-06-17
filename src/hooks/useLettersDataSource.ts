import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataSource } from './useDataSource';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import { useState } from 'react';
import type { CreateLetterInput, UpdateLetterInput } from '@/datasources/interfaces/IDataSource';

export function useLettersDataSource() {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['letters'],
    queryFn: () => dataSource.letters.getAllLetters(),
  });
}

export function useLettersByRoomDataSource(roomNumber: string) {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['letters', 'room', roomNumber],
    queryFn: () => dataSource.letters.getLettersByRoom(roomNumber),
    enabled: !!roomNumber,
  });
}

export function useLetterStatsDataSource() {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['letters', 'stats'],
    queryFn: () => dataSource.letters.getLetterStats(),
  });
}

export function useLetterMutationsDataSource() {
  const dataSource = useDataSource();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [notifying, setNotifying] = useState(false);

  const createLetter = useMutation({
    mutationFn: async (data: CreateLetterInput) => {
      setNotifying(true);
      
      try {
        const letter = await dataSource.letters.createLetter(data);
        
        // Отправляем уведомление если указан user_id (как в оригинальном useAddLetter)
        if (data.user_id) {
          try {
            const notifyResponse = await fetch('/api/notify-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: data.user_id,
                letterId: letter.id,
                letterNote: data.note,
                photoUrl: data.photo_url,
              }),
            });
            const notifyResult = await notifyResponse.json();
            if (notifyResult.success) {
              showToast('Уведомление отправлено!', TOAST_TYPES.SUCCESS);
              
              // Инвалидируем все связанные запросы после успешной отправки уведомления
              // Это обновит статусы уведомлений в интерфейсе
              setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['letters'] });
                queryClient.invalidateQueries({ queryKey: ['letters', 'room'] });
                queryClient.invalidateQueries({ queryKey: ['rooms-with-letters'] });
              }, 100);
            } else {
              showToast('Ошибка при отправке уведомления', TOAST_TYPES.ERROR);
            }
          } catch (error) {
            showToast('Ошибка при отправке уведомления', TOAST_TYPES.ERROR);
          }
        }
        
        return letter;
      } finally {
        setNotifying(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      showToast('Письмо успешно добавлено!', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при добавлении письма', TOAST_TYPES.ERROR);
    },
  });

  const updateLetter = useMutation({
    mutationFn: (data: UpdateLetterInput & { id: string }) => dataSource.letters.updateLetter(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      showToast('Письмо успешно обновлено', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при обновлении письма', TOAST_TYPES.ERROR);
    },
  });

  const deleteLetter = useMutation({
    mutationFn: (id: string) => dataSource.letters.deleteLetter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      showToast('Письмо успешно удалено', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при удалении письма', TOAST_TYPES.ERROR);
    },
  });

  const markAsDelivered = useMutation({
    mutationFn: (id: string) => dataSource.letters.deliverLetter(id),
    onSuccess: () => {
      // Добавляем небольшую задержку перед обновлением данных
      // чтобы анимация успела завершиться
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['letters'] });
      }, 100);
      
      // Показываем стандартное сообщение успеха
      showToast('Письмо успешно выдано получателю', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при выдаче письма', TOAST_TYPES.ERROR);
    },
  });

  return {
    createLetter: { ...createLetter, notifying },
    updateLetter,
    deleteLetter,
    markAsDelivered,
  };
} 
 
 
 