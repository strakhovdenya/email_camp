'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import type { Room } from '@/types/supabase';

const columns = [
  { key: 'room_number', label: 'Номер комнаты' },
  { key: 'created_at', label: 'Создана' },
  { key: 'actions', label: '', className: 'text-right' },
];

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: rooms = [], isLoading } = useQuery<Room[]>({
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

  const filteredRooms = rooms.filter((room: Room) =>
    room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <ActionButton color="primary" icon={<span>＋</span>}>
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
              <ActionButton color="primary" icon={<span>✏️</span>} className="mr-2">
                Редактировать
              </ActionButton>
              <ActionButton color="danger" icon={<span>🗑️</span>}>
                Удалить
              </ActionButton>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
