import React from 'react';
import { Box } from '@mui/material';
import {
  QrCode as QrCodeIcon,
  Notifications as NotificationIcon,
  Timeline as TrackingIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { FeatureCard, FeatureCardProps } from './FeatureCard';
import * as styles from './MainFeatures.styles';

const mainFeatures: FeatureCardProps[] = [
  {
    title: 'QR-коды для скорости',
    description: 'Мгновенная регистрация и выдача писем',
    icon: <QrCodeIcon />,
    color: '#2563eb',
    benefits: [
      'Два QR-кода на каждой папке комнаты',
      'Сканирование вместо ручного ввода данных',
      'Регистрация письма за 10-15 секунд',
      'Исключение ошибок при вводе информации',
    ],
    stats: [
      { label: 'секунд', value: '10-15', color: '#2563eb' },
      { label: 'на регистрацию', value: '⚡' },
    ],
  },
  {
    title: 'Автоматические уведомления',
    description: 'Мгновенная доставка информации жителям',
    icon: <NotificationIcon />,
    color: '#059669',
    benefits: [
      'Telegram бот для мгновенных уведомлений',
      'Email дублирование для надежности',
      'Автоматическая отправка при регистрации',
      'Персонализированные сообщения',
    ],
    stats: [
      { label: 'каналов', value: '2', color: '#059669' },
      { label: 'уведомлений', value: '📱' },
    ],
  },
  {
    title: 'Отслеживание в реальном времени',
    description: 'Полная прозрачность процесса доставки',
    icon: <TrackingIcon />,
    color: '#7c3aed',
    benefits: [
      'Статусы: получено, уведомлено, выдано',
      'История всех операций с письмами',
      'Время поступления и выдачи',
      'Поиск и фильтрация по любым критериям',
    ],
    stats: [
      { label: 'статуса', value: '3', color: '#7c3aed' },
      { label: 'отслеживания', value: '👁️' },
    ],
  },
  {
    title: 'Аналитика и отчеты',
    description: 'Данные для оптимизации работы',
    icon: <AnalyticsIcon />,
    color: '#dc2626',
    benefits: [
      'Статистика по комнатам и периодам',
      'Время обработки и выдачи писем',
      'Эффективность работы сотрудников',
      'Экспорт данных (планируется к реализации)',
    ],
    stats: [
      { label: 'метрик', value: '10+', color: '#dc2626' },
      { label: 'аналитики', value: '📊' },
    ],
  },
];

export function MainFeatures() {
  return (
    <Box sx={styles.outerContainerStyles}>
      <Box sx={styles.innerContainerStyles}>
        {mainFeatures.map((feature, index) => (
          <Box key={index} sx={styles.featureItemStyles}>
            <FeatureCard {...feature} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
