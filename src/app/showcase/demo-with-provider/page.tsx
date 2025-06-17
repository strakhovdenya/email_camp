'use client';

import { DataSourceProvider } from '@/providers/DataSourceProvider';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, Switch, FormControlLabel, Alert } from '@mui/material';
import type { DataSourceType } from '@/config/datasource';

// Импортируем ОБЫЧНЫЕ хуки - те же, что и в основном приложении
import { useUsersDataSource } from '@/hooks/useUsersDataSource';
import { useLettersDataSource } from '@/hooks/useLettersDataSource';
import { useRoomsDataSource } from '@/hooks/useRoomsDataSource';

function DemoContentWithSameHooks() {
  // Используем обычные хуки - они автоматически подхватят контекстный DataSource
  const { data: users, isLoading: usersLoading } = useUsersDataSource();
  const { data: letters, isLoading: lettersLoading } = useLettersDataSource();
  const { data: rooms, isLoading: roomsLoading } = useRoomsDataSource();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Демо с теми же хуками, но другими данными
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пользователи
            </Typography>
            {usersLoading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Typography variant="body2">Загружено: {users?.length || 0} пользователей</Typography>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Письма
            </Typography>
            {lettersLoading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Typography variant="body2">Загружено: {letters?.length || 0} писем</Typography>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Комнаты
            </Typography>
            {roomsLoading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Typography variant="body2">Загружено: {rooms?.length || 0} комнат</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Alert severity="success">
        ✅ Эти данные загружены через ТЕ ЖЕ хуки (useUsersDataSource, useLettersDataSource,
        useRoomsDataSource), но из другого источника данных благодаря DataSourceProvider!
      </Alert>
    </Box>
  );
}

export default function DemoWithProviderPage() {
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>('mock');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Демо: Те же хуки, разные данные
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Этот пример показывает, как использовать <strong>те же самые хуки</strong>
        (useUsersDataSource, useLettersDataSource, useRoomsDataSource), но с разными источниками
        данных.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Переключить источник данных для демо
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={dataSourceType === 'supabase'}
                onChange={(e) => setDataSourceType(e.target.checked ? 'supabase' : 'mock')}
              />
            }
            label={`Источник: ${dataSourceType === 'supabase' ? 'Supabase (реальные данные)' : 'Mock (локальные данные)'}`}
          />
        </CardContent>
      </Card>

      {/* Оборачиваем в DataSourceProvider - теперь все хуки внутри будут использовать этот источник */}
      <DataSourceProvider type={dataSourceType}>
        <DemoContentWithSameHooks />
      </DataSourceProvider>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Как это работает:
          </Typography>
          <Typography variant="body2" component="div">
            1. Мы модифицировали базовый хук <code>useDataSource</code>
            <br />
            2. Теперь он проверяет, есть ли DataSourceProvider в контексте
            <br />
            3. Если есть - использует контекстный источник данных
            <br />
            4. Если нет - использует глобальный источник из конфига
            <br />
            5. <strong>Все существующие хуки автоматически поддерживают это!</strong>
            <br />
            6. Никаких новых хуков создавать не нужно
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
