'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Tabs, Tab, Alert, Switch, FormControlLabel } from '@mui/material';
import { DataSourceProvider } from '@/providers/DataSourceProvider';
import { useDemoUsers, useDemoLetters, useDemoUserMutations, useDemoLetterMutations } from '@/hooks/useDemoDataSource';
import type { DataSourceType } from '@/config/datasource';

function DemoContent() {
  const { data: users, isLoading: usersLoading } = useDemoUsers();
  const { data: letters, isLoading: lettersLoading } = useDemoLetters();
  const { createUser } = useDemoUserMutations();
  const { createLetter } = useDemoLetterMutations();

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
        room_number: '101',
        note: `Тестовое письмо создано ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      console.error('Ошибка создания письма:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Демо с переопределенным DataSource
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пользователи
            </Typography>
            {usersLoading ? (
              <Typography>Загрузка...</Typography>
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

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Письма
            </Typography>
            {lettersLoading ? (
              <Typography>Загрузка...</Typography>
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
      </Box>

      <Alert severity="info">
        Эти данные загружены через контекстный DataSource, 
        независимо от глобальной настройки в config/datasource.ts
      </Alert>
    </Box>
  );
}

export default function DemoDataSourcePage() {
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>('mock');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Демо: Переопределение DataSource
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Эта страница демонстрирует, как можно локально переопределить источник данных 
        в отдельной части приложения, не влияя на глобальные настройки.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Настройки DataSource для этой демо
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={dataSourceType === 'supabase'}
                onChange={(e) => setDataSourceType(e.target.checked ? 'supabase' : 'mock')}
              />
            }
            label={`Использовать: ${dataSourceType === 'supabase' ? 'Supabase (реальные данные)' : 'Mock (локальные данные)'}`}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Переключите, чтобы увидеть разные источники данных
          </Typography>
        </CardContent>
      </Card>

      {/* Оборачиваем в DataSourceProvider с выбранным типом */}
      <DataSourceProvider type={dataSourceType}>
        <DemoContent />
      </DataSourceProvider>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Как это работает:
          </Typography>
          <Typography variant="body2" component="div">
            1. Компонент <code>DemoContent</code> обернут в <code>DataSourceProvider</code>
            <br />
            2. <code>DataSourceProvider</code> создает локальный контекст с выбранным источником данных
            <br />
            3. Хуки <code>useDemoUsers</code>, <code>useDemoLetters</code> используют контекстный источник
            <br />
            4. Если контекст недоступен, хуки автоматически используют глобальный источник
            <br />
            5. Это позволяет иметь разные источники данных в разных частях приложения
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 
 
 
 