import React from 'react';
import {
  Email as EmailIcon,
  Room as RoomIcon,
  Notifications as NotificationIcon,
  Dashboard as DashboardIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

export interface FeatureData {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface StatData {
  label: string;
  value: number;
  suffix: string;
}

export const features: FeatureData[] = [
  {
    icon: React.createElement(EmailIcon),
    title: 'Управление письмами',
    description: 'Добавление, отслеживание и выдача писем с полной историей операций',
    color: '#2563eb',
  },
  {
    icon: React.createElement(RoomIcon),
    title: 'Система комнат',
    description: 'Организация писем по комнатам с удобной навигацией и поиском',
    color: '#7c3aed',
  },
  {
    icon: React.createElement(NotificationIcon),
    title: 'Уведомления',
    description: 'Мгновенные уведомления через Telegram и Email при получении писем',
    color: '#059669',
  },
  {
    icon: React.createElement(DashboardIcon),
    title: 'Админ панель',
    description: 'Полнофункциональная панель администратора с аналитикой и управлением',
    color: '#dc2626',
  },
  {
    icon: React.createElement(SecurityIcon),
    title: 'Безопасность',
    description: 'Row Level Security, аутентификация и авторизация пользователей',
    color: '#ea580c',
  },
  {
    icon: React.createElement(SpeedIcon),
    title: 'Производительность',
    description: 'Оптимизированные запросы, кэширование и real-time обновления',
    color: '#0891b2',
  },
];

export const stats: StatData[] = [
  { label: 'Строк кода', value: 15000, suffix: '+' },
  { label: 'Компонентов', value: 45, suffix: '' },
  { label: 'API роутов', value: 12, suffix: '' },
  { label: 'Тестов', value: 89, suffix: '%' },
];

export const techStack = [
  'Next.js 14',
  'TypeScript',
  'Supabase',
  'React Query',
  'MUI',
  'Framer Motion',
];

export const showcaseData = {
  hero: {
    title: 'Email Camp',
    subtitle: 'Современная система управления письмами',
    description:
      'Полнофункциональное веб-приложение для эффективного управления почтовой корреспонденцией с уведомлениями в реальном времени',
  },
  features,
  stats,
  techStack,
};
