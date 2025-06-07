import React, { useState, useEffect } from 'react';
import type { User } from '@/types/supabase';
import { NOTIFICATION_CHANNELS } from '@/constants/notificationChannels';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormLabel from '@mui/material/FormLabel';

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  loading?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ user, open, onClose, onSave, loading }) => {
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [roomId, setRoomId] = useState<string | null>(user?.room_id?.toString() || null);
  const [role, setRole] = useState<'admin' | 'staff' | 'camper'>(user?.role || 'camper');
  const [channels, setChannels] = useState<string[]>(user?.channels_for_notification || []);

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, room_number')
        .order('room_number', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setRoomId(user?.room_id?.toString() || null);
    setRole(user?.role || 'camper');
    setChannels(user?.channels_for_notification || []);
  }, [user, open]);

  useEffect(() => {
    if (role !== 'camper') setRoomId(null);
  }, [role]);

  const handleChannelToggle = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || (role === 'camper' && !roomId)) {
      return;
    }
    await onSave({
      id: user?.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      room_id: role === 'camper' ? roomId : null,
      role,
      channels_for_notification: channels,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontSize: 20 }}>
        <span className="text-xl font-semibold">
          {user ? 'Редактировать пользователя' : 'Добавить пользователя'}
        </span>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1, pb: 1 }}>
          <div className="space-y-4">
            <TextField
              label="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="Телефон"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <FormControl fullWidth sx={{ mb: 1 }} size="small">
              <InputLabel>Роль</InputLabel>
              <Select
                value={role}
                label="Роль"
                onChange={(e) => setRole(e.target.value as 'admin' | 'staff' | 'camper')}
                size="small"
              >
                <MenuItem value="camper">Camper</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            {role === 'camper' && (
              <>
                <FormControl fullWidth sx={{ mb: 1 }} size="small">
                  <InputLabel>Комната</InputLabel>
                  <Select
                    value={roomId || ''}
                    label="Комната"
                    onChange={(e) => setRoomId(e.target.value || null)}
                    required
                    size="small"
                  >
                    <MenuItem value="">Выберите комнату</MenuItem>
                    {rooms.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        {room.room_number}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl component="fieldset" sx={{ mb: 1 }}>
                  <FormLabel component="legend" sx={{ fontSize: 14, mb: 0.5 }}>
                    Каналы уведомлений
                  </FormLabel>
                  <FormGroup row>
                    {NOTIFICATION_CHANNELS.map((channel) => (
                      <FormControlLabel
                        key={channel}
                        control={
                          <Checkbox
                            checked={channels.includes(channel)}
                            onChange={() => handleChannelToggle(channel)}
                            sx={{
                              color: '#3b82f6',
                              '&.Mui-checked': {
                                color: '#2563eb',
                              },
                              p: 0.5,
                            }}
                            size="small"
                          />
                        }
                        label={<span style={{ fontSize: 13 }}>{channel}</span>}
                        sx={{ mr: 2 }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
            }}
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
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : user ? (
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

export default UserModal;
