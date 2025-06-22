import React from 'react';
import { Typography, Box, Paper, Card, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function DataSourceTab() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, md: 4 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '1rem', md: '2.125rem' },
          px: { xs: '2px', md: 0 },
          wordBreak: 'break-word',
        }}
      >
        DataSource Архитектура
      </Typography>

      <Paper sx={{ p: { xs: '4px', md: 3 }, mb: { xs: 1, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Паттерн абстракции данных
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: { xs: 1, md: 2 }, fontSize: { xs: '0.8rem', md: '1rem' } }}
        >
          DataSource архитектура позволяет легко переключаться между различными источниками данных
          (Supabase, Mock, PostgreSQL, MySQL) изменением одной настройки в конфигурации.
          MockDataSource используется для тестирования и демонстрации функциональности без реальной
          базы данных.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {[
            'Единый интерфейс',
            'Легкое переключение',
            'Тестируемость',
            'Демо режим',
            'Типобезопасность',
          ].map((benefit) => (
            <Chip key={benefit} label={benefit} variant="outlined" size="small" />
          ))}
        </Box>
      </Paper>

      {/* DataSource Structure */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '4px', md: 4 },
          mb: { xs: 1, md: 4 },
          justifyContent: 'center',
          alignItems: { xs: 'stretch', md: 'flex-start' },
        }}
      >
        {/* Interfaces */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            sx={{
              p: { xs: '4px', md: 3 },
              minWidth: { xs: 0, md: 300 },
              background: 'linear-gradient(135deg, #2563eb10 0%, #2563eb05 100%)',
              border: '2px solid #2563eb30',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                color: '#2563eb',
                fontSize: { xs: '0.9rem', md: '1.25rem' },
              }}
            >
              📋 Интерфейсы
            </Typography>
            {[
              'IDataSource - главный интерфейс',
              'IUserDataSource - операции с пользователями',
              'ILetterDataSource - операции с письмами',
              'IRoomDataSource - операции с комнатами',
            ].map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  mb: { xs: '2px', md: 1 },
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                • {item}
              </Typography>
            ))}
          </Card>
        </motion.div>

        {/* Factory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            sx={{
              p: { xs: '4px', md: 3 },
              minWidth: { xs: 0, md: 300 },
              background: 'linear-gradient(135deg, #7c3aed10 0%, #7c3aed05 100%)',
              border: '2px solid #7c3aed30',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                color: '#7c3aed',
                fontSize: { xs: '0.9rem', md: '1.25rem' },
              }}
            >
              🏭 Фабрика
            </Typography>
            {[
              'Singleton паттерн',
              'Переключение по конфигурации',
              'Автоматическая инициализация',
              'Управление жизненным циклом',
            ].map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  mb: { xs: '2px', md: 1 },
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                • {item}
              </Typography>
            ))}
          </Card>
        </motion.div>

        {/* Implementations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            sx={{
              p: { xs: '4px', md: 3 },
              minWidth: { xs: 0, md: 300 },
              background: 'linear-gradient(135deg, #05966910 0%, #05966905 100%)',
              border: '2px solid #05966930',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                color: '#059669',
                fontSize: { xs: '0.9rem', md: '1.25rem' },
              }}
            >
              🔌 Реализации
            </Typography>
            {[
              'SupabaseDataSource - продакшн',
              'MockDataSource - тестирование и демо',
              'PostgreSQLDataSource - планируется',
              'MySQLDataSource - планируется',
            ].map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  mb: { xs: '2px', md: 1 },
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                • {item}
              </Typography>
            ))}
          </Card>
        </motion.div>
      </Box>

      {/* Configuration Example */}
      <Paper sx={{ p: { xs: '4px', md: 3 }, mb: { xs: 1, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Конфигурация источника данных
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{
            borderRadius: 8,
            fontSize: '0.75rem',
            overflow: 'auto',
          }}
        >
          {`// src/config/datasource.ts
export type DataSourceType = 'supabase' | 'mock' | 'postgresql' | 'mysql';

// НАСТРОЙКА: Измените эту переменную для переключения источника данных
export const CURRENT_DATASOURCE: DataSourceType = 'supabase'; // или 'mock'

// Переключение на mock для тестирования и демо
// export const CURRENT_DATASOURCE: DataSourceType = 'mock';

// Демо режим с предзаполненными данными
// - Пользователи из разных комнат
// - Письма в разных статусах
// - Имитация задержек API`}
        </SyntaxHighlighter>
      </Paper>

      {/* Usage Example */}
      <Paper sx={{ p: { xs: '4px', md: 3 }, mb: { xs: 1, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Использование в компонентах
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{
            borderRadius: 8,
            fontSize: '0.75rem',
            overflow: 'auto',
          }}
        >
          {`// Использование через хуки (рекомендуется)
import { useUsersDataSource, useUserMutationsDataSource } from '@/hooks/useUsersDataSource';

function UsersList() {
  // Получение данных с React Query кешированием
  const { data: users, isLoading, error } = useUsersDataSource();
  
  // Мутации с автоматическим обновлением кеша
  const { createUser, updateUser, deleteUser } = useUserMutationsDataSource();
  
  const handleCreateUser = async () => {
    await createUser.mutateAsync({
      first_name: 'Иван',
      last_name: 'Петров',
      email: 'ivan@example.com',
      room_number: '101',
    });
  };
  
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.first_name} {user.last_name}</div>
      ))}
    </div>
  );
}`}
        </SyntaxHighlighter>
      </Paper>

      {/* Direct Usage */}
      <Paper sx={{ p: { xs: '4px', md: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Прямое использование DataSource
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{
            borderRadius: 8,
            fontSize: '0.75rem',
            overflow: 'auto',
          }}
        >
          {`// Прямое использование (для серверного кода)
import { getDataSource } from '@/datasources/factory';

async function processUsers() {
  const dataSource = getDataSource();
  
  // Работа с пользователями
  const users = await dataSource.users.getUsers();
  const newUser = await dataSource.users.createUser({
    first_name: 'Анна',
    last_name: 'Сидорова',
    email: 'anna@example.com',
    room_number: '205',
  });
  
  // Работа с письмами
  const letters = await dataSource.letters.getLetters();
  const stats = await dataSource.letters.getLetterStats();
  
  // Работа с комнатами
  const rooms = await dataSource.rooms.getRoomsWithLetters();
  
  return { users, letters, stats, rooms };
}`}
        </SyntaxHighlighter>
      </Paper>
    </>
  );
}
