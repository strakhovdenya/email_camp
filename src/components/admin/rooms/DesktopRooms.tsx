import React, { useState } from 'react';
import { useRooms } from '@/hooks/useRooms';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import { useRoomActions } from '@/hooks/useRoomActions';
import type { Room } from '@/types/supabase';
import RoomModal from './RoomModal';

const columns = [
  { key: 'room_number', label: 'Номер комнаты' },
  { key: 'created_at', label: 'Создана' },
  { key: 'actions', label: '', className: 'text-right' },
];

const DesktopRooms: React.FC = () => {
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
    <div>
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
        <ActionButton color="primary" icon={<span>＋</span>} onClick={handleAdd}>
          Добавить
        </ActionButton>
      </div>
      <AdminTable
        columns={columns}
        data={filteredRooms}
        isLoading={isLoading}
        emptyText="Комнаты не найдены"
        renderRow={(room: Room) => (
          <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
              {room.room_number}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
              {new Date(room.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right">
              <ActionButton
                color="primary"
                icon={<span>✏️</span>}
                className="mr-2"
                onClick={() => handleEdit(room)}
              >
                Редактировать
              </ActionButton>
              <ActionButton
                color="danger"
                icon={<span>🗑️</span>}
                onClick={() => handleDelete(room)}
              >
                Удалить
              </ActionButton>
            </td>
          </tr>
        )}
      />
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

export default DesktopRooms;
