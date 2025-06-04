import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import SectionHeader from '@/components/admin/SectionHeader';
import SearchInput from '@/components/admin/SearchInput';
import AdminTable from '@/components/admin/AdminTable';
import ActionButton from '@/components/admin/ActionButton';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import { User } from '@/types/supabase';
import { useUserActions } from '@/hooks/useUserActions';

const columns = [
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'channels', label: 'Каналы уведомлений' },
  { key: 'actions', label: '', className: 'text-right' },
];

const DesktopUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deleteCascadeUser, setDeleteCascadeUser] = useState<User | null>(null);
  const { data: users = [], isLoading, refetch } = useUsers();
  const { saveUser, deleteUser, cascadeDeleteUser } = useUserActions(refetch);

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
    const ok = await saveUser(data);
    if (ok) {
      setModalOpen(false);
      setModalUser(null);
    }
  };

  const handleDelete = async (user: User) => {
    const result = await deleteUser(user);
    if (result === 'cascade_required') {
      setWarningMessage(
        'Сначала удалите все письма, связанные с этим пользователем. Вы можете сделать это автоматически.'
      );
      setDeleteCascadeUser(user);
      setWarningOpen(true);
    }
  };

  const handleCascadeDelete = async () => {
    if (!deleteCascadeUser) return;
    await cascadeDeleteUser(deleteCascadeUser);
    setDeleteCascadeUser(null);
    setWarningOpen(false);
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
};

export default DesktopUsers;
