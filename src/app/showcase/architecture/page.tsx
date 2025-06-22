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
import * as styles from './styles';

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
    <Container maxWidth="xl" sx={styles.containerStyles}>
      {/* Header */}
      <Box sx={styles.headerBoxStyles}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={styles.titleStyles}
        >
          Архитектура системы
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={styles.subtitleStyles}>
          Детальное описание структуры базы данных и архитектуры приложения
        </Typography>
      </Box>

      {/* Architecture Overview */}
      <ArchitectureOverview />

      {/* Tabs */}
      <Paper sx={styles.tabsPaperStyles}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={styles.tabsStyles}
        >
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>База данных</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>БД</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>API Структура</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>API</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>DataSource</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>DS</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Безопасность</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>Защита</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
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
        <Typography variant="h4" sx={styles.apiTitleStyles}>
          API Структура
        </Typography>

        <Box sx={{ mb: { xs: 1, md: 6 } }}>
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index} sx={styles.apiEndpointCardStyles}>
              <Box sx={styles.apiEndpointBoxStyles}>
                <Chip
                  label={endpoint.method}
                  size="small"
                  sx={styles.getMethodChipStyles(endpoint.method)}
                />
                <Typography variant="body2" sx={styles.apiPathStyles}>
                  {endpoint.path}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.apiDescriptionStyles}>
                  {endpoint.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        <Paper sx={styles.codeExamplePaperStyles}>
          <Typography variant="h5" sx={styles.codeExampleTitleStyles}>
            Пример использования API
          </Typography>
          <SyntaxHighlighter
            language="typescript"
            style={oneDark}
            customStyle={styles.syntaxHighlighterStyles}
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
        <Typography variant="h4" sx={styles.apiTitleStyles}>
          Безопасность
        </Typography>

        <Box sx={styles.securityGridStyles}>
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
            <Box key={security.title} sx={styles.getSecurityGridItemStyles(index)}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card sx={styles.securityCardStyles}>
                  <Typography variant="h3" sx={styles.securityIconStyles}>
                    {security.icon}
                  </Typography>
                  <Typography variant="h6" sx={styles.securityTitleStyles}>
                    {security.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.securityDescriptionStyles}
                  >
                    {security.description}
                  </Typography>
                  {security.features.map((feature, featureIndex) => (
                    <Chip
                      key={featureIndex}
                      label={feature}
                      size="small"
                      variant="outlined"
                      sx={styles.securityChipStyles}
                    />
                  ))}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Paper sx={styles.codeExamplePaperStyles}>
          <Typography variant="h5" sx={styles.codeExampleTitleStyles}>
            Пример RLS политики
          </Typography>
          <SyntaxHighlighter
            language="sql"
            style={oneDark}
            customStyle={styles.syntaxHighlighterStyles}
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
        <Typography variant="h4" sx={styles.apiTitleStyles}>
          Ключевые метрики
        </Typography>

        <Box sx={styles.metricsGridStyles}>
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
              <Card sx={styles.getMetricCardStyles(metric.color)}>
                <Typography variant="h4" sx={styles.getMetricValueStyles(metric.color)}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.metricLabelStyles}>
                  {metric.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>

        <Typography variant="h4" sx={styles.apiTitleStyles}>
          Технические особенности
        </Typography>

        <Box sx={styles.techFeaturesBoxStyles}>
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
            <Box key={highlight.title} sx={styles.techFeatureItemStyles}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card sx={styles.techFeatureCardStyles}>
                  <Box sx={styles.techFeatureHeaderStyles}>
                    <Avatar sx={styles.techFeatureAvatarStyles}>{highlight.icon}</Avatar>
                    <Typography variant="h6" sx={styles.techFeatureTitleStyles}>
                      {highlight.title}
                    </Typography>
                  </Box>
                  {highlight.items.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={styles.techFeatureChipStyles}
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
