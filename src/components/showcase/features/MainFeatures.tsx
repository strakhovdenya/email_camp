import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  QrCode as QrCodeIcon,
  Notifications as NotificationIcon,
  Timeline as TrackingIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { FeatureCard, FeatureCardProps } from './FeatureCard';
import * as styles from './MainFeatures.styles';
import { useLocale } from '@/contexts/LocaleContext';

export function MainFeatures() {
  const { t } = useLocale();

  const mainFeatures: FeatureCardProps[] = useMemo(
    () => [
      {
        title: t('features.mainFeatures.qrCodes.title'),
        description: t('features.mainFeatures.qrCodes.description'),
        icon: <QrCodeIcon />,
        color: '#2563eb',
        benefits: [
          t('features.mainFeatures.qrCodes.benefits.0'),
          t('features.mainFeatures.qrCodes.benefits.1'),
          t('features.mainFeatures.qrCodes.benefits.2'),
          t('features.mainFeatures.qrCodes.benefits.3'),
        ],
        stats: [
          {
            label: t('features.mainFeatures.qrCodes.stats.seconds'),
            value: '10-15',
            color: '#2563eb',
          },
          { label: t('features.mainFeatures.qrCodes.stats.perRegistration'), value: '⚡' },
        ],
      },
      {
        title: t('features.mainFeatures.notifications.title'),
        description: t('features.mainFeatures.notifications.description'),
        icon: <NotificationIcon />,
        color: '#059669',
        benefits: [
          t('features.mainFeatures.notifications.benefits.0'),
          t('features.mainFeatures.notifications.benefits.1'),
          t('features.mainFeatures.notifications.benefits.2'),
          t('features.mainFeatures.notifications.benefits.3'),
        ],
        stats: [
          {
            label: t('features.mainFeatures.notifications.stats.channels'),
            value: '2',
            color: '#059669',
          },
          { label: t('features.mainFeatures.notifications.stats.notifications'), value: '📱' },
        ],
      },
      {
        title: t('features.mainFeatures.tracking.title'),
        description: t('features.mainFeatures.tracking.description'),
        icon: <TrackingIcon />,
        color: '#7c3aed',
        benefits: [
          t('features.mainFeatures.tracking.benefits.0'),
          t('features.mainFeatures.tracking.benefits.1'),
          t('features.mainFeatures.tracking.benefits.2'),
          t('features.mainFeatures.tracking.benefits.3'),
        ],
        stats: [
          {
            label: t('features.mainFeatures.tracking.stats.statuses'),
            value: '3',
            color: '#7c3aed',
          },
          { label: t('features.mainFeatures.tracking.stats.tracking'), value: '👁️' },
        ],
      },
      {
        title: t('features.mainFeatures.analytics.title'),
        description: t('features.mainFeatures.analytics.description'),
        icon: <AnalyticsIcon />,
        color: '#dc2626',
        benefits: [
          t('features.mainFeatures.analytics.benefits.0'),
          t('features.mainFeatures.analytics.benefits.1'),
          t('features.mainFeatures.analytics.benefits.2'),
          t('features.mainFeatures.analytics.benefits.3'),
        ],
        stats: [
          {
            label: t('features.mainFeatures.analytics.stats.metrics'),
            value: '10+',
            color: '#dc2626',
          },
          { label: t('features.mainFeatures.analytics.stats.analytics'), value: '📊' },
        ],
      },
    ],
    [t]
  );

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
