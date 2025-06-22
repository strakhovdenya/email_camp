import React from 'react';
import { Typography, Box, Card, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Security as SecurityIcon,
  Storage as DatabaseIcon,
  Api as ApiIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

interface ProjectMetric {
  label: string;
  value: string;
  color: string;
}

const projectMetrics: ProjectMetric[] = [
  { label: 'Время разработки', value: '8 недель', color: '#2563eb' },
  { label: 'Строк кода', value: '15,000+', color: '#7c3aed' },
  { label: 'Компонентов React', value: '45+', color: '#059669' },
  { label: 'API эндпоинтов', value: '12', color: '#dc2626' },
  { label: 'Покрытие тестами', value: '89%', color: '#ea580c' },
  { label: 'Lighthouse Score', value: '95/100', color: '#0891b2' },
];

interface TechHighlight {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const techHighlights: TechHighlight[] = [
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
];

export function MetricsTab() {
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
        Ключевые метрики
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: '4px', md: 4 },
          mb: { xs: 1, md: 6 },
        }}
      >
        {projectMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                p: { xs: '4px', md: 3 },
                textAlign: 'center',
                background: `linear-gradient(135deg, ${metric.color}15 0%, ${metric.color}25 100%)`,
                border: `1px solid ${metric.color}`,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: metric.color,
                  mb: { xs: '2px', md: 1 },
                  fontSize: { xs: '1.2rem', md: '2rem' },
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  fontWeight: 500,
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
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: '4px', md: 4 },
        }}
      >
        {techHighlights.map((highlight, index) => (
          <Box key={highlight.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card
                sx={{
                  p: { xs: '4px', md: 3 },
                  height: '100%',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: { xs: '4px', md: 2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 32, md: 48 },
                      height: { xs: 32, md: 48 },
                      mr: { xs: 1, md: 2 },
                      bgcolor: 'primary.main',
                    }}
                  >
                    {highlight.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', md: '1.25rem' },
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
                      m: { xs: '1px', md: 0.5 },
                      fontSize: { xs: '0.6rem', md: '0.75rem' },
                    }}
                  />
                ))}
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>
    </>
  );
}
