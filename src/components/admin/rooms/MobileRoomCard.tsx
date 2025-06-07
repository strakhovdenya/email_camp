import React from 'react';
import type { Room } from '@/types/supabase';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface MobileRoomCardProps {
  room: Room;
  onEdit: () => void;
  onDelete: (room: Room) => void;
}

const MobileRoomCard: React.FC<MobileRoomCardProps> = ({ room, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 24 }}
    transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
    className="group rounded-2xl border border-blue-100 bg-white/60 backdrop-blur-lg text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01] p-4 mb-4 flex flex-col"
  >
    <div className="font-bold text-base mb-1">Комната {room.room_number}</div>
    <div className="text-xs text-gray-500 mb-2">
      Создана: {format(new Date(room.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}
    </div>
    <div className="flex gap-2 mt-auto">
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<EditIcon fontSize="small" />}
        sx={{ borderRadius: 2, fontWeight: 600, flex: 1, textTransform: 'none' }}
        onClick={onEdit}
      >
        Редактировать
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon fontSize="small" />}
        sx={{ borderRadius: 2, fontWeight: 600, flex: 1, textTransform: 'none' }}
        onClick={() => onDelete(room)}
      >
        Удалить
      </Button>
    </div>
  </motion.div>
);

export default MobileRoomCard;
