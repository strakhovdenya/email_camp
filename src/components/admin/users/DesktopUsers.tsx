import React, { useState } from 'react';
import { useUsersDataSource, useUserMutationsDataSource } from '@/hooks/useUsersDataSource';
import { User } from '@/types/supabase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import UserModal from './UserModal';
import WarningModal from './WarningModal';
import {
  tableRowClass,
  tableCellClass,
  tableHeadClass,
  tableWrapperClass,
  tableHeaderRowClass,
} from '../common/tableStyles';
import Tooltip from '@mui/material/Tooltip';

const roleColors: Record<string, string> = {
  admin: '#2563eb',
  staff: '#059669',
  camper: '#f59e42',
};

const channelIcons: Record<string, React.ReactNode> = {
  email: '✉️',
  sms: '📱',
  push: '📢',
};

const emptyIllustration = (
  <div className="flex flex-col items-center justify-center py-24 opacity-70">
    <span className="text-6xl mb-4">👥</span>
    <div className="text-2xl font-semibold text-gray-500">Пользователей нет</div>
    <div className="text-base text-gray-400">Добавьте первого пользователя</div>
  </div>
);

const columns = [
  { key: 'name', label: 'Имя', width: 180 },
  { key: 'email', label: 'Email', width: 180 },
  { key: 'room', label: 'Комната', width: 80 },
  { key: 'role', label: 'Роль', width: 90 },
  { key: 'channels', label: 'Каналы', width: 160 },
  { key: 'actions', label: '', width: 140 },
];

const DesktopUsers: React.FC = () => {
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
    <div className="w-full min-w-0">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск пользователей..."
          className="rounded-lg border border-blue-200 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150 shadow-sm w-full max-w-xs"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 600, ml: 2, textTransform: 'none', boxShadow: 2 }}
          onClick={handleAdd}
        >
          Добавить
        </Button>
      </div>
      <div className={tableWrapperClass}>
        <TableContainer component={Paper} sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Table className="w-full min-w-[900px]">
            <TableHead>
              <TableRow className={tableHeaderRowClass}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={tableHeadClass} style={{ width: col.width }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.key} className={tableCellClass}>
                        <Skeleton variant="rectangular" height={28} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {emptyIllustration}
                  </TableCell>
                </TableRow>
              ) : (
                <AnimatePresence>
                  {filteredUsers.map((user: User) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
                      className={tableRowClass}
                    >
                      <TableCell className="px-2 py-2 font-medium text-gray-900">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6', fontSize: 15 }}>
                            {user.first_name?.[0] || ''}
                            {user.last_name?.[0] || ''}
                          </Avatar>
                          <span className="truncate">
                            {user.last_name} {user.first_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={tableCellClass + ' text-gray-700'}>
                        {user.email}
                      </TableCell>
                      <TableCell className={tableCellClass + ' text-blue-700 font-medium'}>
                        {user.room?.room_number || '—'}
                      </TableCell>
                      <TableCell className={tableCellClass}>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            backgroundColor: roleColors[user.role] || '#6b7280',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                      </TableCell>
                      <TableCell className={tableCellClass}>
                        <div className="flex gap-1">
                          {user.channels_for_notification?.map((channel: string) => (
                            <span key={channel} title={channel}>
                              {channelIcons[channel] || '❓'}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className={tableCellClass}>
                        <div className="flex gap-2 justify-end">
                          <Tooltip title="Редактировать">
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ minWidth: 0, p: 1, borderRadius: '50%' }}
                              onClick={() => handleEdit(user)}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ minWidth: 0, p: 1, borderRadius: '50%' }}
                              onClick={() => handleDelete(user)}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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

export default DesktopUsers;
