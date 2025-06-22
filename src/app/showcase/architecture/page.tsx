'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Card, Paper, Tab, Tabs, Chip, Avatar } from '@mui/material';
import {
  Storage as DatabaseIcon,
  Security as SecurityIcon,
  Api as ApiIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  TabPanel,
  ArchitectureOverview,
  DatabaseTab,
  DataSourceTab,
} from '@/components/showcase/architecture';

export default function ArchitecturePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
      <ArchitectureOverview />

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
        <DatabaseTab />
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
                  size="small"
                  sx={{
                    bgcolor:
                      endpoint.method === 'GET'
                        ? '#10b981'
                        : endpoint.method === 'POST'
                          ? '#3b82f6'
                          : '#f59e0b',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                    minWidth: { xs: 'auto', md: 60 },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', md: '0.875rem' },
                    flex: 1,
                    minWidth: 0,
                    wordBreak: 'break-all',
                  }}
                >
                  {endpoint.path}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.7rem', md: '0.875rem' },
                    flex: { xs: 1, sm: 'auto' },
                    minWidth: 0,
                  }}
                >
                  {endpoint.description}
                </Typography>
              </Box>
            </Card>
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
            Пример использования API
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
            {`// Получение списка писем
const response = await fetch('/api/letters', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const letters = await response.json();

// Добавление нового письма
const newLetter = await fetch('/api/letters', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'user-uuid',
    status: 'pending'
  })
});`}
          </SyntaxHighlighter>
        </Paper>
      </TabPanel>

      {/* DataSource Architecture */}
      <TabPanel value={tabValue} index={2}>
        <DataSourceTab />
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
          Безопасность
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
            gap: { xs: '4px', md: 2 },
            justifyContent: 'center',
            mb: { xs: 1, md: 8 },
            px: { xs: '2px', md: 0 },
            maxWidth: { md: '100%' },
          }}
        >
          {[
            {
              title: 'Row Level Security',
              description: 'Защита данных на уровне строк в PostgreSQL',
              icon: '🔒',
              features: [
                'Автоматическая фильтрация',
                'Политики доступа',
                'Защита от SQL-инъекций',
                'Контроль по ролям',
              ],
            },
            {
              title: 'JWT Authentication',
              description: 'Безопасная аутентификация с токенами',
              icon: '🎫',
              features: [
                'Статeless токены',
                'Автоматическое обновление',
                'Защищенные маршруты',
                'Middleware проверка',
              ],
            },
            {
              title: 'API Protection',
              description: 'Защита API эндпоинтов',
              icon: '🛡️',
              features: [
                'Rate limiting',
                'CORS настройки',
                'Валидация входных данных',
                'Логирование запросов',
              ],
            },
            {
              title: 'Data Encryption',
              description: 'Шифрование чувствительных данных',
              icon: '🔐',
              features: [
                'HTTPS/TLS',
                'Хеширование паролей',
                'Шифрование в БД',
                'Безопасные cookies',
              ],
            },
          ].map((security, index) => (
            <Box
              key={security.title}
              sx={{
                gridColumn: { xs: '1', sm: index < 2 ? '1 / -1' : 'auto', md: 'auto' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    p: { xs: '4px', md: 2 },
                    textAlign: 'center',
                    minHeight: { xs: 'auto', md: 200 },
                    height: { xs: 'auto', md: '100%' },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '2.5rem' },
                      mb: { xs: '2px', md: 1 },
                    }}
                  >
                    {security.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: '2px', md: 1 },
                      fontSize: { xs: '0.8rem', md: '1.25rem' },
                    }}
                  >
                    {security.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: { xs: '4px', md: 2 },
                      fontSize: { xs: '0.7rem', md: '0.875rem' },
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
