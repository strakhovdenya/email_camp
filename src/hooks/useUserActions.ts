import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/supabase';

export function useUserActions(refetch?: () => void) {
  const { showToast } = useToast();

  const saveUser = async (data: Partial<User>) => {
    try {
      if (data.id) {
        const { error } = await supabase
          .from('users')
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            room_id: data.room_id,
            role: data.role,
            channels_for_notification: data.channels_for_notification,
          })
          .eq('id', data.id);
        if (error) throw error;
        showToast('Пользователь успешно обновлён', TOAST_TYPES.SUCCESS);
      } else {
        const { error } = await supabase.from('users').insert([
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            room_id: data.room_id,
            role: data.role,
            channels_for_notification: data.channels_for_notification,
          },
        ]);
        if (error) throw error;
        showToast('Пользователь успешно создан', TOAST_TYPES.SUCCESS);
      }
      refetch?.();
      return true;
    } catch (error) {
      showToast('Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const deleteUser = async (user: User) => {
    try {
      const { count, error } = await supabase
        .from('letters')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      if (error) throw error;
      if (count && count > 0) {
        return 'cascade_required';
      }
      const { error: delError } = await supabase.from('users').delete().eq('id', user.id);
      if (delError) throw delError;
      showToast('Пользователь успешно удалён', TOAST_TYPES.SUCCESS);
      refetch?.();
      return true;
    } catch (error) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const cascadeDeleteUser = async (user: User) => {
    try {
      const { error: lettersError } = await supabase
        .from('letters')
        .delete()
        .eq('user_id', user.id);
      if (lettersError) throw lettersError;
      const { error: userError } = await supabase.from('users').delete().eq('id', user.id);
      if (userError) throw userError;
      showToast('Пользователь и все письма удалены', TOAST_TYPES.SUCCESS);
      refetch?.();
      return true;
    } catch (error) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
      return false;
    }
  };

  return { saveUser, deleteUser, cascadeDeleteUser };
}
