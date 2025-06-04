import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import { supabase } from '@/lib/supabase';
import type { Room } from '@/types/supabase';

export function useRoomActions(refetch?: () => void) {
  const { showToast } = useToast();

  const saveRoom = async (data: Partial<Room>) => {
    try {
      if (data.id) {
        const { error } = await supabase
          .from('rooms')
          .update({
            room_number: data.room_number,
          })
          .eq('id', data.id);
        if (error) throw error;
        showToast('Комната успешно обновлена', TOAST_TYPES.SUCCESS);
      } else {
        const { error } = await supabase.from('rooms').insert([
          {
            room_number: data.room_number,
          },
        ]);
        if (error) throw error;
        showToast('Комната успешно создана', TOAST_TYPES.SUCCESS);
      }
      refetch?.();
      return true;
    } catch (error) {
      showToast('Ошибка при сохранении комнаты', TOAST_TYPES.ERROR);
      return false;
    }
  };

  const deleteRoom = async (room: Room) => {
    try {
      const { error } = await supabase.from('rooms').delete().eq('id', room.id);
      if (error) throw error;
      showToast('Комната успешно удалена', TOAST_TYPES.SUCCESS);
      refetch?.();
      return true;
    } catch (error) {
      showToast('Ошибка при удалении комнаты', TOAST_TYPES.ERROR);
      return false;
    }
  };

  return { saveRoom, deleteRoom, showToast };
}
