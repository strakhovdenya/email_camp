import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/supabase';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import { supabase } from '@/lib/supabase';

const channelIcons: Record<string, string> = {
  email: '✉️',
  sms: '📱',
  push: '📢',
};

const channelColors: Record<string, string> = {
  email: 'bg-blue-100 text-blue-700',
  sms: 'bg-green-100 text-green-700',
  push: 'bg-yellow-100 text-yellow-700',
};

const MobileUserCard: React.FC<{
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}> = ({ user, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow p-4 mb-3 flex flex-col">
    <div className="font-bold text-base mb-1">
      {user.last_name} {user.first_name}
    </div>
    <div className="text-xs text-gray-500 mb-1">{user.email}</div>
    {user.channels_for_notification && user.channels_for_notification.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-2">
        {user.channels_for_notification.map((ch) => (
          <span
            key={ch}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${channelColors[ch] || 'bg-gray-100 text-gray-700'}`}
          >
            <span>{channelIcons[ch] || '🔔'}</span>
            {ch}
          </span>
        ))}
      </div>
    )}
    <div className="flex gap-2 mt-auto">
      <button
        className="flex-1 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
        onClick={() => onEdit(user)}
      >
        ✏️ Редактировать
      </button>
      <button
        className="flex-1 py-2 rounded bg-red-600 text-white text-sm font-semibold"
        onClick={() => onDelete(user)}
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
);

const MobileUsers: React.FC = () => {
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
      showToast('Ошибка при сохранении пользователя', TOAST_TYPES.ERROR);
    }
  };

  const handleDelete = async (user: User) => {
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
        'Сначала удалите все письма, связанные с этим пользователем. Вы можете сделать это автоматически.'
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
    const { error: lettersError } = await supabase
      .from('letters')
      .delete()
      .eq('user_id', deleteCascadeUser.id);
    if (lettersError) {
      showToast('Ошибка при удалении писем пользователя', TOAST_TYPES.ERROR);
      setDeleteCascadeUser(null);
      return;
    }
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

export default MobileUsers;
