'use client';

import React, { useState, FormEvent } from 'react';
import { useLetterMutationsDataSource } from '@/hooks/useLettersDataSource';
import { useUsersByRoomDataSource } from '@/hooks/useUsersDataSource';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import { PhotoDropzone } from './ui';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import type { User } from '@/datasources/interfaces/IUserDataSource';

interface AddLetterFormProps {
  onRoomNumberChange: (roomNumber: string) => void;
  initialRoomNumber?: string;
}

export const AddLetterForm: React.FC<AddLetterFormProps> = ({
  onRoomNumberChange,
  initialRoomNumber = '',
}): React.ReactElement => {
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber);
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Используем новую DataSource архитектуру
  const { createLetter } = useLetterMutationsDataSource();
  const { data: users = [], isLoading: usersLoading } = useUsersByRoomDataSource(roomNumber);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!roomNumber.trim() || !selectedUserId) return;

    void (async (): Promise<void> => {
      try {
        let photoUrl: string | undefined = undefined;
        if (photo) {
          const fileExt = photo.name.split('.').pop();
          const fileName = `letter_${Date.now()}.${fileExt}`;
          const { error } = await supabase.storage.from('letters-photos').upload(fileName, photo);
          if (error) throw error;
          const { data: publicUrlData } = supabase.storage
            .from('letters-photos')
            .getPublicUrl(fileName);
          photoUrl = publicUrlData?.publicUrl;
        }
        
        await createLetter.mutateAsync({
          room_number: roomNumber,
          note: note.trim() || undefined,
          photo_url: photoUrl,
          user_id: selectedUserId,
        });

        onRoomNumberChange(roomNumber);
        setNote('');
        setPhoto(null);
        setPhotoPreview(null);
        setSelectedUserId(null);
      } catch (error) {
        // Ошибка уже обработана в мутации
        console.error('Error adding letter:', error);
      }
    })();
  };

  const handlePhotoAccepted = async (file: File) => {
    // Сжимаем фото перед загрузкой
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // максимум 1 МБ
      maxWidthOrHeight: 2048, // максимум 2048px по ширине или высоте
      useWebWorker: true,
    });
    setPhoto(compressedFile);
    setPhotoPreview(URL.createObjectURL(compressedFile));
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const isLoading = createLetter.isPending;

  return (
    <Card elevation={3} sx={{ borderRadius: 3, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ pb: 1 }}>
          <TextField
            label="Номер комнаты"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Описание письма"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
            placeholder="Например: для мамы, от бабушки..."
            inputProps={{ maxLength: 100 }}
          />
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Фото письма (по желанию)
            </label>
            <PhotoDropzone
              onFileAccepted={handlePhotoAccepted}
              previewUrl={photoPreview}
              onRemove={photo ? handleRemovePhoto : undefined}
            />
          </div>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="user-label">Получатель</InputLabel>
            <Select
              labelId="user-label"
              value={selectedUserId ?? ''}
              label="Получатель"
              onChange={(e) => setSelectedUserId(e.target.value as string | null)}
              required
              disabled={usersLoading || users.length === 0}
            >
              <MenuItem value="" disabled>
                {usersLoading ? 'Загрузка...' : 'Выберите получателя'}
              </MenuItem>
              {users.map((user: User) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.last_name} {user.first_name} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', pb: 2, pr: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !roomNumber.trim()}
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
            {isLoading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Добавить письмо'
            )}
          </Button>
        </CardActions>
        {createLetter.isError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Ошибка при добавлении письма. Попробуйте ещё раз.
          </p>
        )}
      </form>
    </Card>
  );
};
