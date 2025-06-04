import React, { useState } from 'react';
import { useRooms } from '@/hooks/useRooms';
import type { Room } from '@/types/supabase';
import RoomModal from './RoomModal';
import { useRoomActions } from '@/hooks/useRoomActions';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import MobileRoomCard from './MobileRoomCard';

const MobileRooms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoom, setModalRoom] = useState<Room | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { data: rooms = [], isLoading, refetch } = useRooms();
  const { saveRoom, deleteRoom } = useRoomActions(refetch);

  const filteredRooms = rooms.filter((room: Room) =>
    room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setModalRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setModalRoom(room);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Room>) => {
    setIsSaving(true);
    try {
      const ok = await saveRoom(data);
      if (ok) {
        setModalOpen(false);
        setModalRoom(null);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (room: Room) => {
    await deleteRoom(room);
  };

  return (
    <div className="p-2 pb-20 min-h-screen bg-gray-50">
      <SectionHeader
        icon={
          <span role="img" aria-label="rooms">
            🏠
          </span>
        }
        title="Комнаты"
        description="Список всех комнат в системе."
      />
      <div className="flex justify-between items-center mb-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Поиск комнат..." />
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-400">Загрузка...</div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Комнаты не найдены</div>
        ) : (
          filteredRooms.map((room: Room) => (
            <MobileRoomCard
              key={room.id}
              room={room}
              onEdit={() => handleEdit(room)}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      <button
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg flex items-center justify-center"
        onClick={handleAdd}
        aria-label="Добавить комнату"
      >
        +
      </button>
      <RoomModal
        room={modalRoom}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalRoom(null);
        }}
        onSave={handleSave}
        loading={isSaving}
      />
    </div>
  );
};

export default MobileRooms;
