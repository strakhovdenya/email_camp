import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import { User } from '@/types/supabase';

export function useUserActions(refetch?: () => void) {
  const { showToast } = useToast();

  const saveUser = async (data: Partial<User>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showToast(
          data.id ? 'Пользователь успешно обновлён' : 'Пользователь успешно создан',
          TOAST_TYPES.SUCCESS
        );
        refetch?.();
        return true;
      } else {
        showToast('Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
        return false;
      }
    } catch (error) {
      showToast('Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const deleteUser = async (user: User) => {
    try {
      const response = await fetch(`/api/users?id=${user.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showToast('Пользователь успешно удалён', TOAST_TYPES.SUCCESS);
        refetch?.();
        return true;
      } else if (result.requiresCascade) {
        return 'cascade_required';
      } else {
        showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
        return false;
      }
    } catch (error) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const cascadeDeleteUser = async (user: User) => {
    try {
      const response = await fetch(`/api/users?id=${user.id}&cascade=true`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showToast('Пользователь и все письма удалены', TOAST_TYPES.SUCCESS);
        refetch?.();
        return true;
      } else {
        showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
        return false;
      }
    } catch (error) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  return { saveUser, deleteUser, cascadeDeleteUser };
}
