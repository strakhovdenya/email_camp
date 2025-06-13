import { useQuery } from '@tanstack/react-query';
import { RoomWithLetters } from '@/types/rooms';

export const useRoomsWithLetters = () => {
  return useQuery<RoomWithLetters[]>({
    queryKey: ['rooms-with-letters'],
    queryFn: async () => {
      const response = await fetch('/api/rooms-with-letters');
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Ошибка получения комнат с письмами');
      return result.data || [];
    },
  });
};
