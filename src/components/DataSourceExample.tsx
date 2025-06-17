'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useUsersDataSource, useUserMutationsDataSource } from '@/hooks/useUsersDataSource';
import { useLettersDataSource, useLetterMutationsDataSource } from '@/hooks/useLettersDataSource';
import { useRoomsDataSource } from '@/hooks/useRoomsDataSource';
import { CURRENT_DATASOURCE } from '@/config/datasource';

export default function DataSourceExample() {
  const [selectedRoom, setSelectedRoom] = useState('101');

  // Используем новые хуки с DataSource абстракцией
  const { data: users, isLoading: usersLoading, error: usersError } = useUsersDataSource();
  const { data: letters, isLoading: lettersLoading, error: lettersError } = useLettersDataSource();
  const { data: rooms, isLoading: roomsLoading, error: roomsError } = useRoomsDataSource();

  const { createUser } = useUserMutationsDataSource();
  const { createLetter } = useLetterMutationsDataSource();

  const handleCreateTestUser = async () => {
    try {
      await createUser.mutateAsync({
        first_name: 'Тест',
        last_name: 'Пользователь',
        email: `test${Date.now()}@example.com`,
        room_id: null,
      });
    } catch (error) {
      console.error('Ошибка создания пользователя:', error);
    }
  };

  const handleCreateTestLetter = async () => {
    try {
      await createLetter.mutateAsync({
        room_number: selectedRoom,
        note: `Тестовое письмо создано ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      console.error('Ошибка создания письма:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Демонстрация DataSource архитектуры
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Текущий источник данных: <strong>{CURRENT_DATASOURCE}</strong>
        <br />
        Измените <code>CURRENT_DATASOURCE</code> в <code>src/config/datasource.ts</code> 
        для переключения между Supabase и Mock данными
      </Alert>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
        {/* Пользователи */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пользователи
            </Typography>
            {usersLoading ? (
              <CircularProgress size={20} />
            ) : usersError ? (
              <Typography color="error">Ошибка загрузки</Typography>
            ) : (
              <Typography variant="body2">
                Загружено: {users?.length || 0} пользователей
              </Typography>
            )}
            <Button 
              onClick={handleCreateTestUser}
              disabled={createUser.isPending}
              size="small"
              sx={{ mt: 1 }}
            >
              {createUser.isPending ? 'Создание...' : 'Создать тестового'}
            </Button>
          </CardContent>
        </Card>

        {/* Письма */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Письма
            </Typography>
            {lettersLoading ? (
              <CircularProgress size={20} />
            ) : lettersError ? (
              <Typography color="error">Ошибка загрузки</Typography>
            ) : (
              <Typography variant="body2">
                Загружено: {letters?.length || 0} писем
              </Typography>
            )}
            <Button 
              onClick={handleCreateTestLetter}
              disabled={createLetter.isPending}
              size="small"
              sx={{ mt: 1 }}
            >
              {createLetter.isPending ? 'Создание...' : 'Создать тестовое'}
            </Button>
          </CardContent>
        </Card>

        {/* Комнаты */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Комнаты
            </Typography>
            {roomsLoading ? (
              <CircularProgress size={20} />
            ) : roomsError ? (
              <Typography color="error">Ошибка загрузки</Typography>
            ) : (
              <Typography variant="body2">
                Загружено: {rooms?.length || 0} комнат
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Как переключить источник данных:
          </Typography>
          <Typography variant="body2" component="div">
            1. Откройте файл <code>src/config/datasource.ts</code>
            <br />
            2. Измените <code>CURRENT_DATASOURCE</code> на:
            <br />
            • <code>'supabase'</code> - для использования реальной БД
            <br />
            • <code>'mock'</code> - для использования mock данных
            <br />
            3. Перезагрузите страницу
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 
 
 
 
 