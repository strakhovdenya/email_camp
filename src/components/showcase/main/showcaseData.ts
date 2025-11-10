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

export const getFeatures = (t: (key: string) => string): FeatureData[] => [
  {
    icon: React.createElement(EmailIcon),
    title: t('features.mainFeatures.qrCodes.title'),
    description: t('features.mainFeatures.qrCodes.description'),
    color: '#2563eb',
  },
  {
    icon: React.createElement(RoomIcon),
    title: t('features.mainFeatures.notifications.title'),
    description: t('features.mainFeatures.notifications.description'),
    color: '#7c3aed',
  },
  {
    icon: React.createElement(NotificationIcon),
    title: t('features.mainFeatures.tracking.title'),
    description: t('features.mainFeatures.tracking.description'),
    color: '#059669',
  },
  {
    icon: React.createElement(DashboardIcon),
    title: t('features.mainFeatures.analytics.title'),
    description: t('features.mainFeatures.analytics.description'),
    color: '#dc2626',
  },
  {
    icon: React.createElement(SecurityIcon),
    title: t('features.mainFeatures.security.title'),
    description: t('features.mainFeatures.security.description'),
    color: '#ea580c',
  },
  {
    icon: React.createElement(SpeedIcon),
    title: t('features.mainFeatures.performance.title'),
    description: t('features.mainFeatures.performance.description'),
    color: '#0891b2',
  },
];

export const getStats = (t: (key: string) => string): StatData[] => [
  { label: t('stats.items.linesOfCode'), value: 15000, suffix: '+' },
  { label: t('stats.items.components'), value: 45, suffix: '' },
  { label: t('stats.items.apiRoutes'), value: 12, suffix: '' },
  { label: t('stats.items.tests'), value: 89, suffix: '%' },
];

export const getTechStack = () => [
  'Next.js 14',
  'TypeScript',
  'Supabase',
  'React Query',
  'MUI',
  'Framer Motion',
];

export const getShowcaseData = (t: (key: string) => string) => ({
  hero: {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
  },
  features: getFeatures(t),
  stats: getStats(t),
  techStack: getTechStack(),
});
