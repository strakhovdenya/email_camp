'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Tab,
  Tabs,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Storage as DatabaseIcon,
  Security as SecurityIcon,
  Api as ApiIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`arch-tabpanel-${index}`}
      aria-labelledby={`arch-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DatabaseTable = ({ 
  name, 
  columns, 
  color 
}: {
  name: string;
  columns: Array<{ name: string; type: string; key?: boolean; foreign?: boolean }>;
  color: string;
}) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.02 }}
    sx={{
      minWidth: 280,
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `2px solid ${color}30`,
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color }}>
        {name}
      </Typography>
      {columns.map((column, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: column.key ? 700 : 400,
              color: column.key ? 'primary.main' : column.foreign ? 'secondary.main' : 'text.primary',
            }}
          >
            {column.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {column.type}
          </Typography>
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default function ArchitecturePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const databaseTables = [
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
      ]
    },
    {
      name: 'rooms',
      color: '#7c3aed',
      columns: [
        { name: 'id', type: 'UUID', key: true },
        { name: 'room_number', type: 'VARCHAR', key: true },
        { name: 'created_at', type: 'TIMESTAMP' },
      ]
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
      ]
    }
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/letters', description: 'Получить список писем' },
    { method: 'POST', path: '/api/letters', description: 'Добавить новое письмо' },
    { method: 'POST', path: '/api/letters/deliver', description: 'Отметить письмо как выданное' },
    { method: 'GET', path: '/api/rooms', description: 'Получить список комнат' },
    { method: 'GET', path: '/api/rooms/[roomNumber]/users', description: 'Получить жильцов комнаты' },
    { method: 'GET', path: '/api/users', description: 'Получить список пользователей' },
    { method: 'POST', path: '/api/users/invite', description: 'Пригласить пользователя' },
    { method: 'GET', path: '/api/auth/me', description: 'Получить текущего пользователя' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 2, fontWeight: 800 }}
        >
          Архитектура системы
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          Детальное описание структуры базы данных и архитектуры приложения
        </Typography>
      </Box>

      {/* Architecture Overview */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ p: 4, mb: 6 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          Общая архитектура
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
            mb: 4,
          }}
        >
          {[
            { label: 'Next.js Frontend', color: '#000000', icon: <CodeIcon /> },
            { label: '↓', color: 'transparent' },
            { label: 'API Routes', color: '#2563eb', icon: <ApiIcon /> },
            { label: '↓', color: 'transparent' },
            { label: 'Supabase Client', color: '#3ecf8e', icon: <CloudIcon /> },
            { label: '↓', color: 'transparent' },
            { label: 'PostgreSQL', color: '#336791', icon: <DatabaseIcon /> },
          ].map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              {item.color !== 'transparent' ? (
                <Card
                  sx={{
                    p: 2,
                    minWidth: 120,
                    background: `linear-gradient(135deg, ${item.color}10 0%, ${item.color}05 100%)`,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  <Avatar sx={{ bgcolor: item.color, mx: 'auto', mb: 1 }}>
                    {item.icon}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Card>
              ) : (
                <Typography variant="h4" color="text.secondary">
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: '1rem',
            },
          }}
        >
          <Tab label="База данных" />
          <Tab label="API Структура" />
          <Tab label="Безопасность" />
        </Tabs>
      </Paper>

      {/* Database Schema */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Схема базы данных
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center',
            mb: 6
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

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Связи между таблицами
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>users.room_number</strong> → <strong>rooms.room_number</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Каждый пользователь привязан к определенной комнате
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>letters.user_id</strong> → <strong>users.id</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Каждое письмо адресовано конкретному пользователю
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Пример SQL запроса
          </Typography>
          <SyntaxHighlighter
            language="sql"
            style={oneDark}
            customStyle={{ borderRadius: 8 }}
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
      </TabPanel>

      {/* API Structure */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          API Структура
        </Typography>
        
        <Box sx={{ mb: 6 }}>
          {apiEndpoints.map((endpoint, index) => (
            <Card
              key={index}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{ mb: 2, p: 3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={endpoint.method}
                  color={
                    endpoint.method === 'GET' ? 'primary' :
                    endpoint.method === 'POST' ? 'success' :
                    'default'
                  }
                  size="small"
                />
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  {endpoint.path}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {endpoint.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Пример API ответа
          </Typography>
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{ borderRadius: 8 }}
          >
{`{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "status": "pending",
      "created_at": "2024-01-15T10:30:00Z",
      "users": {
        "first_name": "Иван",
        "last_name": "Петров"
      },
      "rooms": {
        "room_number": "101"
      },
      "notification_statuses": {
        "email": "sent",
        "telegram": "sent"
      }
    }
  ]
}`}
          </SyntaxHighlighter>
        </Paper>
      </TabPanel>

      {/* Security */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Система безопасности
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center',
            mb: 6
          }}
        >
          {[
            {
              title: 'Row Level Security',
              description: 'Политики безопасности на уровне строк БД',
              color: '#dc2626',
              features: ['Изоляция данных пользователей', 'Контроль доступа админов', 'Автоматическая фильтрация']
            },
            {
              title: 'JWT Аутентификация',
              description: 'Безопасная аутентификация через Supabase',
              color: '#2563eb',
              features: ['Токены доступа', 'Refresh токены', 'Автоматическое обновление']
            },
            {
              title: 'Валидация данных',
              description: 'Проверка данных на всех уровнях',
              color: '#059669',
              features: ['Client-side валидация', 'Server-side проверки', 'Типизация TypeScript']
            }
          ].map((security, index) => (
            <Box 
              key={security.title}
              sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' },
                minWidth: 300
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    background: `linear-gradient(135deg, ${security.color}10 0%, ${security.color}05 100%)`,
                    border: `1px solid ${security.color}30`,
                  }}
                >
                  <Avatar sx={{ bgcolor: security.color, mb: 2 }}>
                    <SecurityIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {security.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {security.description}
                  </Typography>
                  {security.features.map((feature, featureIndex) => (
                    <Chip
                      key={featureIndex}
                      label={feature}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Пример RLS политики
          </Typography>
          <SyntaxHighlighter
            language="sql"
            style={oneDark}
            customStyle={{ borderRadius: 8 }}
          >
{`-- Политика для таблицы letters
CREATE POLICY "Users can view own letters" ON letters
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );

-- Политика для вставки писем (только админы)
CREATE POLICY "Only admins can insert letters" ON letters
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );`}
          </SyntaxHighlighter>
        </Paper>
      </TabPanel>
    </Container>
  );
} 