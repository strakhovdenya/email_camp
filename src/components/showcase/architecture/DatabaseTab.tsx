import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DatabaseTable } from './DatabaseTable';

interface DatabaseColumn {
  name: string;
  type: string;
  key?: boolean;
  foreign?: boolean;
}

interface DatabaseTableData {
  name: string;
  color: string;
  columns: DatabaseColumn[];
}

const databaseTables: DatabaseTableData[] = [
  {
    name: 'users',
    color: '#2563eb',
    columns: [
      { name: 'id', type: 'UUID', key: true },
      { name: 'email', type: 'VARCHAR', key: true },
      { name: 'first_name', type: 'VARCHAR' },
      { name: 'last_name', type: 'VARCHAR' },
      { name: 'role', type: 'ENUM' },
      { name: 'telegram_id', type: 'BIGINT' },
      { name: 'room_number', type: 'VARCHAR', foreign: true },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    name: 'rooms',
    color: '#7c3aed',
    columns: [
      { name: 'id', type: 'UUID', key: true },
      { name: 'room_number', type: 'VARCHAR', key: true },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    name: 'letters',
    color: '#059669',
    columns: [
      { name: 'id', type: 'UUID', key: true },
      { name: 'user_id', type: 'UUID', foreign: true },
      { name: 'status', type: 'ENUM' },
      { name: 'notification_statuses', type: 'JSONB' },
      { name: 'created_at', type: 'TIMESTAMP' },
      { name: 'delivered_at', type: 'TIMESTAMP' },
    ],
  },
];

export function DatabaseTab() {
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
        Схема базы данных
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: { xs: 'nowrap', md: 'wrap' },
          gap: { xs: '4px', md: 4 },
          justifyContent: 'center',
          mb: { xs: 1, md: 6 },
          alignItems: { xs: 'stretch', md: 'flex-start' },
          px: { xs: '2px', md: 0 },
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {databaseTables.map((table, index) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DatabaseTable {...table} />
          </motion.div>
        ))}
      </Box>

      <Paper sx={{ p: { xs: '4px', md: 3 }, mb: { xs: 1, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Связи между таблицами
        </Typography>
        <Box sx={{ mb: { xs: 1, md: 3 } }}>
          <Typography
            variant="body1"
            sx={{ mb: { xs: '2px', md: 1 }, fontSize: { xs: '0.8rem', md: '1rem' } }}
          >
            <strong>users.room_number</strong> → <strong>rooms.room_number</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: { xs: 1, md: 2 }, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
          >
            Каждый пользователь привязан к определенной комнате
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{ mb: { xs: '2px', md: 1 }, fontSize: { xs: '0.8rem', md: '1rem' } }}
          >
            <strong>letters.user_id</strong> → <strong>users.id</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: { xs: 1, md: 2 }, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
          >
            Каждое письмо адресовано конкретному пользователю
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: { xs: '4px', md: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Пример SQL запроса
        </Typography>
        <SyntaxHighlighter
          language="sql"
          style={oneDark}
          customStyle={{
            borderRadius: 8,
            fontSize: '0.65rem',
            overflow: 'auto',
            padding: '8px',
          }}
        >
          {`-- Получить все письма с информацией о получателях и комнатах
SELECT 
  l.id,
  l.status,
  l.created_at,
  u.first_name,
  u.last_name,
  r.room_number
FROM letters l
JOIN users u ON l.user_id = u.id
JOIN rooms r ON u.room_number = r.room_number
WHERE l.status = 'pending'
ORDER BY l.created_at DESC;`}
        </SyntaxHighlighter>
      </Paper>
    </>
  );
}
