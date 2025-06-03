'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import StatusBadge from '@/components/admin/StatusBadge';
import type { LetterWithRelations } from '@/types/supabase';

const columns = [
  { key: 'room', label: 'Комната' },
  { key: 'recipient', label: 'Получатель' },
  { key: 'status', label: 'Статус' },
  { key: 'notified', label: 'Уведомлено' },
  { key: 'created_at', label: 'Создано' },
  { key: 'actions', label: '', className: 'text-right' },
];

export default function LettersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: letters = [], isLoading } = useQuery<LetterWithRelations[]>({
    queryKey: ['letters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('letters')
        .select(`*, rooms (room_number), users (first_name, last_name)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredLetters = letters.filter((letter: LetterWithRelations) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      letter.rooms?.room_number.toLowerCase().includes(searchLower) ||
      `${letter.users?.first_name} ${letter.users?.last_name}`.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <SectionHeader
        icon={
          <span role="img" aria-label="letters">
            ✉️
          </span>
        }
        title="Письма"
        description="Список всех писем, их статусов и уведомлений."
      />
      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск по комнате или получателю..."
        />
      </div>
      <AdminTable
        columns={columns}
        data={filteredLetters}
        isLoading={isLoading}
        emptyText="Писем не найдено"
        renderRow={(letter: LetterWithRelations) => (
          <tr key={letter.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
              {letter.rooms?.room_number}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
              {letter.users?.first_name} {letter.users?.last_name}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <StatusBadge status={letter.status} />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <StatusBadge status={letter.recipient_notified ? 'notified' : 'pending'} />
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
              {new Date(letter.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right">
              <ActionButton color="primary" icon={<span>👁️</span>} className="mr-2">
                Просмотр
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
