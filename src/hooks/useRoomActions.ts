import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import type { Room } from '@/types/supabase';

export function useRoomActions(refetch?: () => void) {
  const { showToast } = useToast();

  const saveRoom = async (data: Partial<Room>) => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showToast(
          data.id ? 'Комната успешно обновлена' : 'Комната успешно создана',
          TOAST_TYPES.SUCCESS
        );
        refetch?.();
        return true;
      } else {
        showToast('Ошибка при сохранении комнаты', TOAST_TYPES.ERROR);
        return false;
      }
    } catch (error) {
      showToast('Ошибка при сохранении комнаты', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const deleteRoom = async (room: Room) => {
    try {
      const response = await fetch(`/api/rooms?id=${room.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showToast('Комната успешно удалена', TOAST_TYPES.SUCCESS);
        refetch?.();
        return true;
      } else if (result.users_exist) {
        showToast(
          'Сначала удалите или переместите всех пользователей из этой комнаты',
          TOAST_TYPES.ERROR
        );
        return 'users_exist';
      } else {
        showToast('Ошибка при удалении комнаты', TOAST_TYPES.ERROR);
        return false;
      }
    } catch (error) {
      showToast('Ошибка при удалении комнаты', TOAST_TYPES.ERROR);
      return false;
    }
  };

  return { saveRoom, deleteRoom };
}
