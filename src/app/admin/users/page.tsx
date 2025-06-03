'use client';

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import UserModal from '@/components/admin/UserModal';
import WarningModal from '@/components/admin/WarningModal';
import { User } from '@/types/supabase';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { TOAST_TYPES } from '@/constants/toastTypes';

const columns = [
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'channels', label: 'Каналы уведомлений' },
  { key: 'actions', label: '', className: 'text-right' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deleteCascadeUser, setDeleteCascadeUser] = useState<User | null>(null);
  const { data: users = [], isLoading, refetch } = useUsers();
  const { showToast } = useToast();

  const filteredUsers = users.filter(
    (user: User) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setModalUser(user);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setModalUser(null);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<User>) => {
    try {
      if (data.id) {
        // Обновление существующего пользователя
        const { error } = await supabase
          .from('users')
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            room_id: data.room_id,
            role: data.role,
            channels_for_notification: data.channels_for_notification,
          })
          .eq('id', data.id);
        if (error) throw error;
        showToast('Пользователь успешно обновлён', TOAST_TYPES.SUCCESS);
      } else {
        // Создание нового пользователя
        const { error } = await supabase.from('users').insert([
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            room_id: data.room_id,
            role: data.role,
            channels_for_notification: data.channels_for_notification,
          },
        ]);
        if (error) throw error;
        showToast('Пользователь успешно создан', TOAST_TYPES.SUCCESS);
      }
      setModalOpen(false);
      setModalUser(null);
      refetch();
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
    }
  };

  const handleDelete = async (user: User) => {
    // Проверяем, есть ли письма для пользователя
    const { count, error } = await supabase
      .from('letters')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);
    if (error) {
      setWarningMessage('Ошибка при проверке писем пользователя.');
      setWarningOpen(true);
      return;
    }
    if (count && count > 0) {
      setWarningMessage(
        'Сначала удалите все письма, связанные с этим пользователем.\nВы можете сделать это автоматически.'
      );
      setDeleteCascadeUser(user);
      setWarningOpen(true);
      return;
    }
    if (!window.confirm(`Удалить пользователя ${user.last_name} ${user.first_name}?`)) return;
    const { error: delError } = await supabase.from('users').delete().eq('id', user.id);
    if (delError) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
    } else {
      showToast('Пользователь успешно удалён', TOAST_TYPES.SUCCESS);
      refetch();
    }
  };

  const handleCascadeDelete = async () => {
    if (!deleteCascadeUser) return;
    setWarningOpen(false);
    // Удаляем все письма пользователя
    const { error: lettersError } = await supabase
      .from('letters')
      .delete()
      .eq('user_id', deleteCascadeUser.id);
    if (lettersError) {
      showToast('Ошибка при удалении писем пользователя', TOAST_TYPES.ERROR);
      setDeleteCascadeUser(null);
      return;
    }
    // Удаляем пользователя
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', deleteCascadeUser.id);
    if (userError) {
      showToast('Ошибка при удалении пользователя', TOAST_TYPES.ERROR);
    } else {
      showToast('Пользователь и все письма удалены', TOAST_TYPES.SUCCESS);
      refetch();
    }
    setDeleteCascadeUser(null);
  };

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
        <ActionButton color="primary" icon={<span>＋</span>} onClick={handleAdd}>
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
              <ActionButton
                color="primary"
                icon={<span>✏️</span>}
                className="mr-2"
                onClick={() => handleEdit(user)}
              >
                Редактировать
              </ActionButton>
              <ActionButton
                color="danger"
                icon={<span>🗑️</span>}
                onClick={() => handleDelete(user)}
              >
                Удалить
              </ActionButton>
            </td>
          </tr>
        )}
      />
      <UserModal
        user={modalUser}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalUser(null);
        }}
        onSave={handleSave}
      />
      <WarningModal
        open={warningOpen}
        message={warningMessage}
        onClose={() => {
          setWarningOpen(false);
          setDeleteCascadeUser(null);
        }}
        onConfirm={deleteCascadeUser ? handleCascadeDelete : undefined}
      />
    </div>
  );
}
