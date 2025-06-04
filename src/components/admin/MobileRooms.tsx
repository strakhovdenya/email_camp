import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import type { Room } from '@/types/supabase';

const MobileRoomCard: React.FC<{
  room: Room;
  onEdit: () => void;
  onDelete: (room: Room) => void;
}> = ({ room, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow p-4 mb-3 flex flex-col">
    <div className="font-bold text-base mb-1">Комната {room.room_number}</div>
    <div className="text-xs text-gray-500 mb-2">
      Создана: {new Date(room.created_at).toLocaleDateString()}
    </div>
    <div className="flex gap-2 mt-auto">
      <button
        className="flex-1 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
        onClick={onEdit}
      >
        ✏️ Редактировать
      </button>
      <button
        className="flex-1 py-2 rounded bg-red-600 text-white text-sm font-semibold"
        onClick={() => onDelete(room)}
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
);

const MobileRooms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('room_number', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const { showToast } = useToast();

  const filteredRooms = rooms.filter((room: Room) =>
    room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = () => {
    // TODO: реализовать редактирование комнаты
  };

  const handleAdd = () => {
    // Удалить: setModalRoom(null);
    // Удалить: setModalOpen(true);
  };

  const handleDelete = async (room: Room) => {
    if (!window.confirm(`Удалить комнату ${room.room_number}?`)) return;
    const { error } = await supabase.from('rooms').delete().eq('id', room.id);
    if (error) {
      showToast('Ошибка при удалении комнаты', TOAST_TYPES.ERROR);
    } else {
      showToast('Комната успешно удалена', TOAST_TYPES.SUCCESS);
      refetch();
    }
  };

  return (
    <div className="p-2 pb-20 min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 pb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск комнат..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base mb-2"
        />
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-gray-400">Загрузка...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Комнаты не найдены</div>
      ) : (
        filteredRooms.map((room) => (
          <MobileRoomCard key={room.id} room={room} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
      <button
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg flex items-center justify-center"
        onClick={handleAdd}
        aria-label="Добавить комнату"
      >
        +
      </button>
      {/* Модалка для добавления/редактирования комнаты (заглушка) */}
      {/* <RoomModal ... /> */}
    </div>
  );
};

export default MobileRooms;
