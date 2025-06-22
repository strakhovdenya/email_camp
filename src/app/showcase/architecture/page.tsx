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
      {value === index && (
        <Box sx={{ p: { xs: '2px', md: 3 }, overflow: 'hidden', width: '100%', minWidth: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DatabaseTable = ({
  name,
  columns,
  color,
}: {
  name: string;
  columns: Array<{ name: string; type: string; key?: boolean; foreign?: boolean }>;
  color: string;
}) => (
  <Card
    sx={{
      minWidth: 0,
      width: '100%',
      maxWidth: '100%',
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `2px solid ${color}30`,
      overflow: 'hidden',
    }}
  >
    <CardContent sx={{ p: { xs: '4px', md: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: { xs: '4px', md: 1 },
          color,
          fontSize: { xs: '0.85rem', md: '1.25rem' },
          wordBreak: 'break-word',
        }}
      >
        {name}
      </Typography>
      {columns.map((column, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: { xs: '2px', md: 1 },
            flexWrap: 'nowrap',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: column.key ? 700 : 400,
              color: column.key
                ? 'primary.main'
                : column.foreign
                  ? 'secondary.main'
                  : 'text.primary',
              fontSize: { xs: '0.7rem', md: '0.875rem' },
              minWidth: 0,
              flex: 1,
              mr: { xs: '2px', md: 1 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {column.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
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

  const apiEndpoints = [
    { method: 'GET', path: '/api/letters', description: 'Получить список писем' },
    { method: 'POST', path: '/api/letters', description: 'Добавить новое письмо' },
    { method: 'POST', path: '/api/letters/deliver', description: 'Отметить письмо как выданное' },
    { method: 'GET', path: '/api/rooms', description: 'Получить список комнат' },
    {
      method: 'GET',
      path: '/api/rooms/[roomNumber]/users',
      description: 'Получить жильцов комнаты',
    },
    { method: 'GET', path: '/api/users', description: 'Получить список пользователей' },
    { method: 'POST', path: '/api/users/invite', description: 'Пригласить пользователя' },
    { method: 'GET', path: '/api/auth/me', description: 'Получить текущего пользователя' },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 0.5, md: 4 },
        px: { xs: 0, sm: 1, md: 3 },
        width: '100%',
        maxWidth: { xs: '100vw', md: 'xl' },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 1, md: 6 },
          px: { xs: '4px', md: 0 },
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: { xs: 0.5, md: 2 },
            fontWeight: 800,
            fontSize: { xs: '1.3rem', sm: '2.5rem', md: '3.5rem' },
            wordBreak: 'break-word',
            hyphens: 'auto',
          }}
        >
          Архитектура системы
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            px: { xs: '4px', sm: 0 },
            fontSize: { xs: '0.75rem', md: '1.25rem' },
            wordBreak: 'break-word',
            hyphens: 'auto',
            lineHeight: { xs: 1.2, md: 1.5 },
          }}
        >
          Детальное описание структуры базы данных и архитектуры приложения
        </Typography>
      </Box>

      {/* Architecture Overview */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{
          p: { xs: '6px 8px', sm: 2, md: 4 },
          mb: { xs: 1, md: 6 },
          mx: { xs: 0, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: { xs: '6px', md: 3 },
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '0.9rem', md: '2.125rem' },
            px: { xs: 0, md: 0 },
            wordBreak: 'break-word',
          }}
        >
          Общая архитектура
        </Typography>

        {/* Mobile version - Compact horizontal */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            py: '4px',
            px: 0,
            gap: '4px',
          }}
        >
          {[
            { label: 'Next.js', color: '#000000', icon: <CodeIcon /> },
            { label: 'API', color: '#2563eb', icon: <ApiIcon /> },
            { label: 'Supabase', color: '#3ecf8e', icon: <CloudIcon /> },
            { label: 'Postgres', color: '#336791', icon: <DatabaseIcon /> },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}
              >
                <Avatar
                  sx={{
                    bgcolor: item.color,
                    width: 22,
                    height: 22,
                    mb: '1px',
                    '& .MuiSvgIcon-root': { fontSize: '0.8rem' },
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.55rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    lineHeight: 1,
                    color: 'text.secondary',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
              {index < 3 && (
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                  }}
                >
                  →
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Desktop version */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
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
                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      mx: 'auto',
                      mb: 1,
                      width: 40,
                      height: 40,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Card>
              ) : (
                <Typography variant="h4" color="text.secondary" sx={{ fontSize: '2.125rem' }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: { xs: 1, md: 4 }, mx: { xs: 0, sm: 0 }, overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: { xs: '0.7rem', md: '1rem' },
              minWidth: { xs: 50, md: 160 },
              px: { xs: '4px', md: 3 },
              py: { xs: '4px', md: 1.5 },
            },
            '& .MuiTabs-indicator': {
              height: 3,
            },
            '& .MuiTabs-scrollButtons': {
              width: { xs: 24, md: 48 },
            },
            '& .MuiTabs-scroller': {
              overflow: 'auto !important',
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: { xs: 'block', md: 'block' }, textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>База данных</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>БД</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: { xs: 'block', md: 'block' }, textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>API Структура</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>API</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: { xs: 'block', md: 'block' }, textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>DataSource</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>DS</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: { xs: 'block', md: 'block' }, textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Безопасность</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>Защита</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: { xs: 'block', md: 'block' }, textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Метрики</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>Метрики</Box>
              </Box>
            }
          />
        </Tabs>
      </Paper>

      {/* Database Schema */}
      <TabPanel value={tabValue} index={0}>
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
      </TabPanel>

      {/* API Structure */}
      <TabPanel value={tabValue} index={1}>
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
          API Структура
        </Typography>

        <Box sx={{ mb: { xs: 1, md: 6 } }}>
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index} sx={{ mb: { xs: '4px', md: 2 }, p: { xs: '4px', md: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: { xs: '2px', md: 2 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: 'wrap',
                }}
              >
                <Chip
                  label={endpoint.method}
                  color={
                    endpoint.method === 'GET'
                      ? 'primary'
                      : endpoint.method === 'POST'
                        ? 'success'
                        : 'default'
                  }
                  size="small"
                  sx={{ mb: { xs: '2px', sm: 0 }, fontSize: { xs: '0.65rem', md: '0.8125rem' } }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', md: '1rem' },
                    wordBreak: 'break-all',
                    flex: { xs: 'none', sm: 1 },
                    minWidth: 0,
                  }}
                >
                  {endpoint.path}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.65rem', md: '0.875rem' },
                    flex: { xs: 'none', md: 2 },
                  }}
                >
                  {endpoint.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: { xs: '4px', md: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              mb: { xs: 1, md: 2 },
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.5rem' },
            }}
          >
            Пример API ответа
          </Typography>
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{
              borderRadius: 8,
              fontSize: '0.65rem',
              overflow: 'auto',
              padding: '8px',
            }}
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

      {/* DataSource Architecture */}
      <TabPanel value={tabValue} index={2}>
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
            MockDataSource используется для тестирования и демонстрации функциональности без
            реальной базы данных.
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
      </TabPanel>

      {/* Security */}
      <TabPanel value={tabValue} index={3}>
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
          Система безопасности
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
            mb: { xs: 1, md: 6 },
            alignItems: { xs: 'center', md: 'stretch' },
            px: { xs: '2px', md: 0 },
          }}
        >
          {[
            {
              title: 'Row Level Security',
              description: 'Политики безопасности на уровне строк БД',
              color: '#dc2626',
              features: [
                'Изоляция данных пользователей',
                'Контроль доступа админов',
                'Автоматическая фильтрация',
              ],
            },
            {
              title: 'JWT Аутентификация',
              description: 'Безопасная аутентификация через Supabase',
              color: '#2563eb',
              features: ['Токены доступа', 'Refresh токены', 'Автоматическое обновление'],
            },
            {
              title: 'Валидация данных',
              description: 'Проверка данных на всех уровнях',
              color: '#059669',
              features: ['Client-side валидация', 'Server-side проверки', 'Типизация TypeScript'],
            },
          ].map((security, index) => (
            <Box
              key={security.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' },
                minWidth: { xs: 'auto', md: 280 },
                width: { xs: '100%', md: 'auto' },
                maxWidth: { xs: 400, md: 'none' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    p: { xs: 2, md: 3 },
                    height: '100%',
                    background: `linear-gradient(135deg, ${security.color}10 0%, ${security.color}05 100%)`,
                    border: `1px solid ${security.color}30`,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: security.color,
                      mb: 2,
                      width: { xs: 36, md: 40 },
                      height: { xs: 36, md: 40 },
                    }}
                  >
                    <SecurityIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {security.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                    }}
                  >
                    {security.description}
                  </Typography>
                  {security.features.map((feature, featureIndex) => (
                    <Chip
                      key={featureIndex}
                      label={feature}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        mb: 1,
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                      }}
                    />
                  ))}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Пример RLS политики
          </Typography>
          <SyntaxHighlighter
            language="sql"
            style={oneDark}
            customStyle={{
              borderRadius: 8,
              fontSize: '0.75rem',
              overflow: 'auto',
            }}
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

      {/* Metrics Tab */}
      <TabPanel value={tabValue} index={4}>
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
          Ключевые метрики
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
            gap: { xs: '4px', md: 2 },
            justifyContent: 'center',
            mb: { xs: 1, md: 8 },
            px: { xs: '2px', md: 0 },
            maxWidth: { md: '100%' },
          }}
        >
          {[
            { label: 'Время разработки', value: '8 недель', color: '#2563eb' },
            { label: 'Строк кода', value: '15,000+', color: '#7c3aed' },
            { label: 'Компонентов React', value: '45+', color: '#059669' },
            { label: 'API эндпоинтов', value: '12', color: '#dc2626' },
            { label: 'Покрытие тестами', value: '89%', color: '#ea580c' },
            { label: 'Lighthouse Score', value: '95/100', color: '#0891b2' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: { xs: '4px', md: 2 },
                  textAlign: 'center',
                  minWidth: { xs: 0, md: 160 },
                  minHeight: { xs: 'auto', md: 120 },
                  height: { xs: 'auto', md: '100%' },
                  background: `linear-gradient(135deg, ${metric.color}10 0%, ${metric.color}05 100%)`,
                  border: `1px solid ${metric.color}30`,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: metric.color,
                    mb: { xs: '2px', md: 1 },
                    fontSize: { xs: '0.9rem', sm: '1.75rem', md: '1.5rem' },
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', md: '0.875rem' },
                    lineHeight: { xs: 1.1, md: 1.43 },
                  }}
                >
                  {metric.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>

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
          Технические особенности
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'stretch' },
            px: { xs: '2px', md: 0 },
          }}
        >
          {[
            {
              icon: <SecurityIcon />,
              title: 'Безопасность',
              items: ['Row Level Security', 'JWT аутентификация', 'Валидация данных', 'HTTPS/SSL'],
            },
            {
              icon: <DatabaseIcon />,
              title: 'Производительность',
              items: [
                'Server-Side Rendering',
                'React Query кэширование',
                'Оптимизация изображений',
                'Code splitting',
              ],
            },
            {
              icon: <CodeIcon />,
              title: 'UX/UI',
              items: [
                'Material Design 3',
                'Адаптивная верстка',
                'Темная/светлая тема',
                'Анимации Framer Motion',
              ],
            },
            {
              icon: <ApiIcon />,
              title: 'Архитектура',
              items: [
                'Микросервисная архитектура',
                'API-first подход',
                'Real-time обновления',
                'Serverless функции',
              ],
            },
          ].map((highlight, index) => (
            <Box
              key={highlight.title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                minWidth: { xs: 0, md: 280 },
                width: { xs: '100%', md: 'auto' },
                maxWidth: { xs: '100%', md: 'none' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card sx={{ p: { xs: '4px', md: 3 }, height: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: { xs: '4px', md: 2 },
                      flexWrap: 'wrap',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        mr: { xs: '4px', md: 2 },
                        width: { xs: 24, md: 40 },
                        height: { xs: 24, md: 40 },
                      }}
                    >
                      {highlight.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '0.85rem', md: '1.25rem' },
                      }}
                    >
                      {highlight.title}
                    </Typography>
                  </Box>
                  {highlight.items.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: { xs: '2px', md: 1 },
                        mb: { xs: '2px', md: 1 },
                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                      }}
                    />
                  ))}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </TabPanel>
    </Container>
  );
}
