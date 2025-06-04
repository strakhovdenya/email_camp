import React from 'react';
import type { Room } from '@/types/supabase';

interface MobileRoomCardProps {
  room: Room;
  onEdit: () => void;
  onDelete: (room: Room) => void;
}

const MobileRoomCard: React.FC<MobileRoomCardProps> = ({ room, onEdit, onDelete }) => (
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

export default MobileRoomCard;
