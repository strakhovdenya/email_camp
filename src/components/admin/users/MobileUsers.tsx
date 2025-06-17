import React, { useState } from 'react';
import { useUsersDataSource, useUserMutationsDataSource } from '@/hooks/useUsersDataSource';
import { User } from '@/types/supabase';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import MobileUserCard from './MobileUserCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { AnimatePresence } from 'framer-motion';

const MobileUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deleteCascadeUser, setDeleteCascadeUser] = useState<User | null>(null);
  
  // Используем DataSource архитектуру
  const { data: users = [], isLoading } = useUsersDataSource();
  const { createUser, updateUser, deleteUser, cascadeDeleteUser } = useUserMutationsDataSource();

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
        await updateUser.mutateAsync(data);
      } else {
        // Создание нового пользователя
        await createUser.mutateAsync(data);
      }
      setModalOpen(false);
      setModalUser(null);
    } catch (error) {
      // Ошибка уже обработана в мутации
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (user: User) => {
    try {
      await deleteUser.mutateAsync(user.id);
    } catch (error: any) {
      if (error.message === 'CASCADE_REQUIRED') {
        setWarningMessage(
          'Сначала удалите все письма, связанные с этим пользователем. Вы можете сделать это автоматически.'
        );
        setDeleteCascadeUser(user);
        setWarningOpen(true);
      }
    }
  };

  const handleCascadeDelete = async () => {
    if (!deleteCascadeUser) return;
    try {
      await cascadeDeleteUser.mutateAsync(deleteCascadeUser.id);
      setDeleteCascadeUser(null);
      setWarningOpen(false);
    } catch (error) {
      // Ошибка уже обработана в мутации
      console.error('Error cascade deleting user:', error);
    }
  };

  const isSaving = createUser.isPending || updateUser.isPending;

  return (
    <div className="p-2 pb-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-2 rounded-b-2xl shadow-md">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск пользователей..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ borderRadius: 2, background: 'white', mt: 1, mb: 1 }}
        />
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-gray-400">Загрузка...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Пользователи не найдены</div>
      ) : (
        <AnimatePresence>
          {filteredUsers.map((user: User) => (
            <MobileUserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      )}
      <Fab
        color="primary"
        aria-label="Добавить пользователя"
        onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          boxShadow: 4,
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
        }}
      >
        <AddIcon />
      </Fab>
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
