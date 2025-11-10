'use client';

import React from 'react';
import { Typography, Box, Paper, Card, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as styles from './DataSourceTab.styles';
import { useLocale } from '@/contexts/LocaleContext';

export function DataSourceTab() {
  const { t } = useLocale();

  return (
    <>
      <Typography variant="h4" sx={styles.titleStyles}>
        {t('architecture.datasourceTab.title')}
      </Typography>

      <Paper sx={styles.paperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.datasourceTab.pattern.title')}
        </Typography>
        <Typography variant="body1" sx={styles.descriptionStyles}>
          {t('architecture.datasourceTab.pattern.description')}
        </Typography>

        <Box sx={styles.benefitsContainerStyles}>
          {[0, 1, 2, 3, 4].map((index) => (
            <Chip
              key={index}
              label={t(`architecture.datasourceTab.benefits.${index}`)}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      </Paper>

      {/* DataSource Structure */}
      <Box sx={styles.structureContainerStyles}>
        {/* Interfaces */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card sx={styles.getStructureCardStyles('#2563eb')}>
            <Typography variant="h6" sx={styles.getStructureCardTitleStyles('#2563eb')}>
              {t('architecture.datasourceTab.interfaces.title')}
            </Typography>
            {[0, 1, 2, 3].map((index) => (
              <Typography key={index} variant="body2" sx={styles.structureCardItemStyles}>
                • {t(`architecture.datasourceTab.interfaces.items.${index}`)}
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
          <Card sx={styles.getStructureCardStyles('#7c3aed')}>
            <Typography variant="h6" sx={styles.getStructureCardTitleStyles('#7c3aed')}>
              {t('architecture.datasourceTab.factory.title')}
            </Typography>
            {[0, 1, 2, 3].map((index) => (
              <Typography key={index} variant="body2" sx={styles.structureCardItemStyles}>
                • {t(`architecture.datasourceTab.factory.items.${index}`)}
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
          <Card sx={styles.getStructureCardStyles('#059669')}>
            <Typography variant="h6" sx={styles.getStructureCardTitleStyles('#059669')}>
              {t('architecture.datasourceTab.implementations.title')}
            </Typography>
            {[0, 1, 2, 3].map((index) => (
              <Typography key={index} variant="body2" sx={styles.structureCardItemStyles}>
                • {t(`architecture.datasourceTab.implementations.items.${index}`)}
              </Typography>
            ))}
          </Card>
        </motion.div>
      </Box>

      {/* Configuration Example */}
      <Paper sx={styles.paperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.datasourceTab.configuration.title')}
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={styles.syntaxHighlighterStyles}
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
      <Paper sx={styles.paperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.datasourceTab.usage.title')}
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={styles.syntaxHighlighterStyles}
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
      <Paper sx={styles.paperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.datasourceTab.directUsage.title')}
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={styles.syntaxHighlighterStyles}
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
