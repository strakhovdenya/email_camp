import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { QUERY_KEYS } from './useLetters';

export interface RoomLetter {
  id: number;
  room_id: number;
  created_at: string;
  delivered_at: string | null;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
  note?: string;
  photo_url?: string;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  room_number?: string;
  telegram_chat_id?: string | null;
}

export function useRoomLetters(roomNumber: string) {
  return useQuery<RoomLetter[]>({
    queryKey: [QUERY_KEYS.LETTERS, roomNumber],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('letters_with_rooms')
        .select('*')
        .eq('room_number', roomNumber)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}
