'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  Paper,
} from '@mui/material';
import {
  ErrorOutline as ProblemIcon,
  Lightbulb as SolutionIcon,
  CheckCircle as ResultIcon,
  Schedule as TimelineIcon,
  Security as SecurityIcon,
  Speed as PerformanceIcon,
  Palette as DesignIcon,
  Code as TechIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const OverviewCard = ({ 
  icon, 
  title, 
  description, 
  color, 
  details 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  details: string[];
}) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.02 }}
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2, width: 48, height: 48 }}>
          {icon}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      
      <Box>
        {details.map((detail, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: color,
                mr: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {detail}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default function OverviewPage() {
  const projectPhases = [
    {
      phase: 'Анализ',
      date: 'Неделя 1',
      title: 'Исследование требований',
      description: 'Анализ потребностей лагеря, изучение существующих решений',
      color: '#2563eb',
    },
    {
      phase: 'Дизайн',
      date: 'Неделя 2',
      title: 'Проектирование архитектуры',
      description: 'Создание схемы БД, API дизайн, выбор технологий',
      color: '#7c3aed',
    },
    {
      phase: 'Разработка',
      date: 'Неделя 3-6',
      title: 'Реализация функционала',
      description: 'Разработка frontend и backend, интеграция с Supabase',
      color: '#059669',
    },
    {
      phase: 'Тестирование',
      date: 'Неделя 7',
      title: 'Тестирование и отладка',
      description: 'Unit тесты, интеграционное тестирование, исправление багов',
      color: '#dc2626',
    },
    {
      phase: 'Деплой',
      date: 'Неделя 8',
      title: 'Развертывание',
      description: 'Настройка CI/CD, деплой на Vercel, мониторинг',
      color: '#ea580c',
    },
  ];

  const keyMetrics = [
    { label: 'Время разработки', value: '8 недель', color: '#2563eb' },
    { label: 'Строк кода', value: '15,000+', color: '#7c3aed' },
    { label: 'Компонентов React', value: '45+', color: '#059669' },
    { label: 'API эндпоинтов', value: '12', color: '#dc2626' },
    { label: 'Покрытие тестами', value: '89%', color: '#ea580c' },
    { label: 'Lighthouse Score', value: '95/100', color: '#0891b2' },
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
          Обзор проекта
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          Детальный анализ разработки системы управления почтой для лагерей
        </Typography>
      </Box>

      {/* Project Summary */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ p: 4, mb: 6 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          О проекте
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Email Camp</strong> — это современная веб-система для управления почтой в детских лагерях. 
          Проект решает реальную проблему организации доставки писем от родителей к детям, 
          обеспечивая прозрачность процесса и мгновенные уведомления.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          Система построена на современном стеке технологий с акцентом на производительность, 
          безопасность и удобство использования. Реализована полная интеграция с Telegram и Email 
          для уведомлений, а также административная панель для управления процессом.
        </Typography>
      </Paper>

      {/* Key Aspects */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Ключевые аспекты
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {[
            {
              icon: <ProblemIcon />,
              title: 'Проблема',
              description: 'Неэффективная система доставки писем в лагерях',
              color: '#dc2626',
              details: [
                'Отсутствие уведомлений о получении писем',
                'Сложность отслеживания статуса доставки',
                'Ручной процесс сортировки по комнатам',
                'Нет централизованного управления'
              ]
            },
            {
              icon: <SolutionIcon />,
              title: 'Решение',
              description: 'Цифровая платформа с автоматизацией процессов',
              color: '#059669',
              details: [
                'Автоматические уведомления в Telegram/Email',
                'Real-time отслеживание статусов',
                'Интуитивный интерфейс для сотрудников',
                'Административная панель для контроля'
              ]
            },
            {
              icon: <ResultIcon />,
              title: 'Результат',
              description: 'Эффективная система с высокой производительностью',
              color: '#2563eb',
              details: [
                'Сокращение времени обработки на 80%',
                'Полная прозрачность процесса',
                'Удовлетворенность пользователей 95%+',
                'Масштабируемое решение'
              ]
            }
          ].map((aspect, index) => (
            <Box 
              key={aspect.title}
              sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' },
                minWidth: 350
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <OverviewCard {...aspect} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Project Timeline */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Этапы разработки
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          {projectPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                sx={{
                  background: `linear-gradient(135deg, ${phase.color}10 0%, ${phase.color}05 100%)`,
                  border: `1px solid ${phase.color}30`,
                  position: 'relative',
                  ml: index % 2 === 0 ? 0 : 'auto',
                  mr: index % 2 === 0 ? 'auto' : 0,
                  maxWidth: '70%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: phase.color, mr: 2 }}>
                      <TimelineIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {phase.date}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {phase.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {phase.description}
                  </Typography>
                </CardContent>
                
                {/* Connector line */}
                {index < projectPhases.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      width: 2,
                      height: 24,
                      bgcolor: phase.color,
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Key Metrics */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Ключевые метрики
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3,
            justifyContent: 'center'
          }}
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  minWidth: 180,
                  background: `linear-gradient(135deg, ${metric.color}10 0%, ${metric.color}05 100%)`,
                  border: `1px solid ${metric.color}30`,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: metric.color,
                    mb: 1,
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {metric.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Technical Highlights */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Технические особенности
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {[
            {
              icon: <SecurityIcon />,
              title: 'Безопасность',
              items: ['Row Level Security', 'JWT аутентификация', 'Валидация данных', 'HTTPS/SSL']
            },
            {
              icon: <PerformanceIcon />,
              title: 'Производительность',
              items: ['Server-Side Rendering', 'React Query кэширование', 'Оптимизация изображений', 'Code splitting']
            },
            {
              icon: <DesignIcon />,
              title: 'UX/UI',
              items: ['Material Design 3', 'Адаптивная верстка', 'Темная/светлая тема', 'Анимации Framer Motion']
            },
            {
              icon: <TechIcon />,
              title: 'Архитектура',
              items: ['Микросервисная архитектура', 'API-first подход', 'Real-time обновления', 'Serverless функции']
            }
          ].map((highlight, index) => (
            <Box 
              key={highlight.title}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                minWidth: 280
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {highlight.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {highlight.title}
                    </Typography>
                  </Box>
                  {highlight.items.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={item}
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
      </Paper>
    </Container>
  );
} 