import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataSource } from './useDataSource';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import type { User } from '@/types/supabase';
import type { CreateUserInput, UpdateUserInput } from '@/datasources/interfaces/IDataSource';

// Расширенный интерфейс для UI, который может содержать room_number
// interface UserFormData extends Partial<User> {
//   room_number?: string;
// }

export function useUsersDataSource() {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => dataSource.users.getAllUsers(),
  });
}

export function useUsersByRoomDataSource(roomNumber: string) {
  const dataSource = useDataSource();

  return useQuery({
    queryKey: ['users', 'room', roomNumber],
    queryFn: () => dataSource.users.getUsersByRoom(roomNumber),
    enabled: !!roomNumber,
  });
}

// Хелпер для получения room_id по room_number
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getRoomIdByNumber(roomNumber: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/rooms/by-number/${roomNumber}`);
    if (response.ok) {
      const result = await response.json();
      return result.data?.id || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting room ID:', error);
    return null;
  }
}

export function useUserMutationsDataSource() {
  const dataSource = useDataSource();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createUser = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const data: CreateUserInput = {
        first_name: userData.first_name!,
        last_name: userData.last_name!,
        email: userData.email!,
        phone: userData.phone,
        room_id: userData.room_id,
        role: userData.role || 'camper',
        channels_for_notification: userData.channels_for_notification || undefined,
        telegram_chat_id: userData.telegram_chat_id,
      };

      return dataSource.users.createUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('Пользователь успешно создан', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
    },
  });

  const updateUser = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const data: UpdateUserInput = {
        first_name: userData.first_name || undefined,
        last_name: userData.last_name || undefined,
        email: userData.email || undefined,
        phone: userData.phone,
        room_id: userData.room_id,
        role: userData.role,
        channels_for_notification: userData.channels_for_notification || undefined,
        telegram_chat_id: userData.telegram_chat_id,
      };

      return dataSource.users.updateUser(userData.id!, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('Пользователь успешно обновлён', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => dataSource.users.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('Пользователь успешно удалён', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      if (error.message === 'CASCADE_REQUIRED') {
        // Не показываем тост для cascade - это обработает компонент
        throw error;
      } else {
        showToast(error.message || 'Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
      }
    },
  });

  const cascadeDeleteUser = useMutation({
    mutationFn: (id: string) => dataSource.users.cascadeDeleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('Пользователь и все письма удалены', TOAST_TYPES.SUCCESS);
    },
    onError: (error: Error) => {
      showToast(error.message || 'Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
    },
  });

  const searchUsers = useMutation({
    mutationFn: (query: string) => dataSource.users.searchUsers(query),
  });

  return {
    createUser,
    updateUser,
    deleteUser,
    cascadeDeleteUser,
    searchUsers,
  };
}
