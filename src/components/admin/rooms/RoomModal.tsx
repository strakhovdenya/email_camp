import React, { useState, useEffect } from 'react';
import type { Room } from '@/types/supabase';

interface RoomModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Room>) => void;
  loading?: boolean;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, open, onClose, onSave, loading }) => {
  const [roomNumber, setRoomNumber] = useState(room?.room_number || '');

  useEffect(() => {
    setRoomNumber(room?.room_number || '');
  }, [room, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {room ? 'Редактировать комнату' : 'Добавить комнату'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ id: room?.id, room_number: roomNumber });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Номер комнаты</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100">
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {loading ? 'Сохранение...' : room ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;
