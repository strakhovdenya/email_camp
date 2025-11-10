'use client';

import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DatabaseTable } from './DatabaseTable';
import * as styles from './DatabaseTab.styles';
import { useLocale } from '@/contexts/LocaleContext';

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
  const { t } = useLocale();

  return (
    <>
      <Typography variant="h4" sx={styles.titleStyles}>
        {t('architecture.databaseTab.title')}
      </Typography>

      <Box sx={styles.tablesContainerStyles}>
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

      <Paper sx={styles.paperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.databaseTab.relationships.title')}
        </Typography>
        <Box sx={styles.relationshipBoxStyles}>
          <Typography variant="body1" sx={styles.relationshipTitleStyles}>
            <strong>{t('architecture.databaseTab.relationships.usersRooms.title')}</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.relationshipDescriptionStyles}
          >
            {t('architecture.databaseTab.relationships.usersRooms.description')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={styles.relationshipTitleStyles}>
            <strong>{t('architecture.databaseTab.relationships.lettersUsers.title')}</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.relationshipDescriptionStyles}
          >
            {t('architecture.databaseTab.relationships.lettersUsers.description')}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={styles.lastPaperStyles}>
        <Typography variant="h5" sx={styles.sectionTitleStyles}>
          {t('architecture.databaseTab.sqlExample.title')}
        </Typography>
        <SyntaxHighlighter
          language="sql"
          style={oneDark}
          customStyle={styles.syntaxHighlighterStyles}
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
