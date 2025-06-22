import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  ErrorOutline as ProblemIcon,
  Lightbulb as SolutionIcon,
  CheckCircle as ResultIcon,
} from '@mui/icons-material';
import { OverviewCard } from './OverviewCard';
import { keyAspectsStyles } from './KeyAspects.styles';

export const KeyAspects = () => {
  const aspects = [
    {
      icon: <ProblemIcon />,
      title: 'Проблема',
      description: 'Неэффективный процесс получения почты в лагере',
      color: '#dc2626',
      details: [
        'Ежедневные очереди на инфо-поинте после 14:00',
        'Ручная проверка папок каждой комнаты сотрудниками',
        'Потеря времени при отсутствии писем',
        'Неопределенность для жителей лагеря',
      ],
    },
    {
      icon: <SolutionIcon />,
      title: 'Решение',
      description: 'QR-система с автоматическими уведомлениями',
      color: '#059669',
      details: [
        'QR-коды на папках комнат для быстрой регистрации',
        'Автоматические уведомления в Telegram/Email',
        'Жители приходят только при наличии почты',
        'Экономия времени сотрудников и жителей',
      ],
    },
    {
      icon: <ResultIcon />,
      title: 'Результат',
      description: 'Оптимизированный процесс получения почты',
      color: '#2563eb',
      details: [
        'Устранение ежедневных очередей на инфо-поинте',
        'Гарантированное получение почты при посещении',
        'Минимальные затраты времени сотрудников',
        'Полная прозрачность и отслеживание процесса',
      ],
    },
  ];

  return (
    <Box sx={keyAspectsStyles.container}>
      <Typography variant="h3" sx={keyAspectsStyles.title}>
        Ключевые аспекты
      </Typography>
      <Box sx={keyAspectsStyles.aspectsGrid}>
        {aspects.map((aspect, index) => (
          <Box key={aspect.title} sx={keyAspectsStyles.aspectItem}>
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
  );
};
