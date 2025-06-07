import React, { useState, useEffect } from 'react';
import type { Room } from '@/types/supabase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface RoomModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Room>) => void;
  loading?: boolean;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, open, onClose, onSave, loading }) => {
  const [roomNumber, setRoomNumber] = useState(room?.room_number || '');

  useEffect(() => {
    setRoomNumber(room?.room_number || '');
  }, [room, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: room?.id, room_number: roomNumber });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontSize: 20 }}>
        {room ? 'Редактировать комнату' : 'Добавить комнату'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1, pb: 1 }}>
          <TextField
            label="Номер комнаты"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : room ? (
              'Сохранить'
            ) : (
              'Добавить'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RoomModal;
