'use client';

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import { User } from '@/types/supabase';

const columns = [
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'channels', label: 'Каналы уведомлений' },
  { key: 'actions', label: '', className: 'text-right' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users = [], isLoading } = useUsers();

  const filteredUsers = users.filter(
    (user: User) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SectionHeader
        icon={
          <span role="img" aria-label="users">
            👥
          </span>
        }
        title="Пользователи"
        description="Список всех пользователей системы, их email и каналы уведомлений."
      />
      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск пользователей..."
        />
        <ActionButton color="primary" icon={<span>＋</span>}>
          Добавить
        </ActionButton>
      </div>
      <AdminTable
        columns={columns}
        data={filteredUsers}
        isLoading={isLoading}
        emptyText="Пользователи не найдены"
        renderRow={(user: User) => (
          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
              {user.last_name} {user.first_name}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
              {user.email}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
              {user.channels_for_notification?.join(', ') || '—'}
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
