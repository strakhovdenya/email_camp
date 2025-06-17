import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataSource } from './useDataSource';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import type { CreateRoomInput, UpdateRoomInput } from '@/datasources/interfaces/IDataSource';

export function useRoomsDataSource() {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => dataSource.rooms.getRooms(),
  });
}

export function useRoomsWithLettersDataSource() {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['rooms', 'with-letters'],
    queryFn: () => dataSource.rooms.getRoomsWithLetters(),
  });
}

export function useRoomMutationsDataSource() {
  const dataSource = useDataSource();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createRoom = useMutation({
    mutationFn: (data: CreateRoomInput) => dataSource.rooms.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      showToast('Комната успешно создана', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при создании комнаты', TOAST_TYPES.ERROR);
    },
  });

  const updateRoom = useMutation({
    mutationFn: (data: UpdateRoomInput) => dataSource.rooms.updateRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      showToast('Комната успешно обновлена', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при обновлении комнаты', TOAST_TYPES.ERROR);
    },
  });

  const deleteRoom = useMutation({
    mutationFn: (id: string) => dataSource.rooms.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      showToast('Комната успешно удалена', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      // Специальная обработка для случая с существующими пользователями
      if (error.message.includes('users_exist') || error.message.includes('пользователей')) {
        showToast('Сначала удалите или переместите всех пользователей из этой комнаты', TOAST_TYPES.ERROR);
      } else {
        showToast(error.message || 'Ошибка при удалении комнаты', TOAST_TYPES.ERROR);
      }
    },
  });

  return {
    createRoom,
    updateRoom,
    deleteRoom,
  };
} 
 
 
 
 