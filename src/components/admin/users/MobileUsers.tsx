import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/supabase';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import { useUserActions } from '@/hooks/useUserActions';
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
          {filteredUsers.map((user) => (
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
