import React from 'react';
import { User } from '@/types/supabase';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

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

interface MobileUserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const MobileUserCard: React.FC<MobileUserCardProps> = ({ user, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 24 }}
    transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
    className="group rounded-2xl border border-blue-100 bg-white/60 backdrop-blur-lg text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01] p-4 mb-4 flex flex-col"
  >
    <div className="flex items-center gap-3 mb-2">
      <Avatar sx={{ width: 40, height: 40, bgcolor: '#3b82f6', fontSize: 18 }}>
        {user.first_name?.[0] || ''}
        {user.last_name?.[0] || ''}
      </Avatar>
      <div className="flex flex-col min-w-0">
        <span className="font-semibold text-base truncate">
          {user.last_name} {user.first_name}
        </span>
        <span className="text-xs text-gray-500 truncate">{user.email}</span>
        {user.room?.room_number && (
          <span className="text-xs text-blue-700 font-medium">
            Комната: {user.room.room_number}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <Chip
        label={user.role}
        size="small"
        sx={{
          bgcolor: roleColors[user.role] || '#e5e7eb',
          color: '#fff',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}
      />
      {user.channels_for_notification && user.channels_for_notification.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {user.channels_for_notification.map((ch) => (
            <Chip
              key={ch}
              label={ch}
              size="small"
              icon={<span style={{ fontSize: '1.1em' }}>{channelIcons[ch] || '🔔'}</span>}
              sx={{
                bgcolor: '#f3f4f6',
                color: '#2563eb',
                fontWeight: 500,
                mr: 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
    <div className="flex gap-2 mt-auto">
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<EditIcon fontSize="small" />}
        sx={{ borderRadius: 2, fontWeight: 600, flex: 1, textTransform: 'none' }}
        onClick={() => onEdit(user)}
      >
        Редактировать
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon fontSize="small" />}
        sx={{ borderRadius: 2, fontWeight: 600, flex: 1, textTransform: 'none' }}
        onClick={() => onDelete(user)}
      >
        Удалить
      </Button>
    </div>
  </motion.div>
);

export default MobileUserCard;
