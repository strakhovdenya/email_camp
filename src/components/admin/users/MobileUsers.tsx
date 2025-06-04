import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/supabase';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import { useUserActions } from '@/hooks/useUserActions';
import MobileUserCard from './MobileUserCard';

const MobileUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deleteCascadeUser, setDeleteCascadeUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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
    setIsSaving(true);
    try {
      const ok = await saveUser(data);
      if (ok) {
        setModalOpen(false);
        setModalUser(null);
      }
    } finally {
      setIsSaving(false);
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
    <div className="p-2 pb-20 min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 pb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск пользователей..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base mb-2"
        />
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-gray-400">Загрузка...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Пользователи не найдены</div>
      ) : (
        filteredUsers.map((user) => (
          <MobileUserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
      <button
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg flex items-center justify-center"
        onClick={handleAdd}
        aria-label="Добавить пользователя"
      >
        +
      </button>
      <UserModal
        user={modalUser}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalUser(null);
        }}
        onSave={handleSave}
        loading={isSaving}
      />
      <WarningModal
        open={warningOpen}
        message={warningMessage}
        onClose={() => {
          setWarningOpen(false);
          setDeleteCascadeUser(null);
        }}
        onConfirm={handleCascadeDelete}
      />
    </div>
  );
};

export default MobileUsers;
