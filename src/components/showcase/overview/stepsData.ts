import React from 'react';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Handshake as HandshakeIcon,
  QrCode as QrCodeIcon,
  CameraAlt as CameraIcon,
  DirectionsWalk as WalkIcon,
  Inbox as InboxIcon,
  PhoneIphone as PhoneIcon,
} from '@mui/icons-material';

export interface StepData {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
  side: 'left' | 'right';
  illustration: React.ReactNode;
}

export const getStepsData = (t: (key: string) => string): StepData[] => [
  {
    id: 1,
    icon: React.createElement(QrCodeIcon),
    title: t('overview.steps.1.title'),
    description: t('overview.steps.1.description'),
    details: [
      t('overview.steps.1.details.0'),
      t('overview.steps.1.details.1'),
      t('overview.steps.1.details.2'),
      t('overview.steps.1.details.3'),
    ],
    color: '#2563eb',
    side: 'left',
    illustration: React.createElement(InboxIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 2,
    icon: React.createElement(CameraIcon),
    title: t('overview.steps.2.title'),
    description: t('overview.steps.2.description'),
    details: [
      t('overview.steps.2.details.0'),
      t('overview.steps.2.details.1'),
      t('overview.steps.2.details.2'),
      t('overview.steps.2.details.3'),
    ],
    color: '#7c3aed',
    side: 'right',
    illustration: React.createElement(QrCodeIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 3,
    icon: React.createElement(NotificationsIcon),
    title: t('overview.steps.3.title'),
    description: t('overview.steps.3.description'),
    details: [
      t('overview.steps.3.details.0'),
      t('overview.steps.3.details.1'),
      t('overview.steps.3.details.2'),
      t('overview.steps.3.details.3'),
    ],
    color: '#059669',
    side: 'left',
    illustration: React.createElement(PhoneIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 4,
    icon: React.createElement(WalkIcon),
    title: t('overview.steps.4.title'),
    description: t('overview.steps.4.description'),
    details: [
      t('overview.steps.4.details.0'),
      t('overview.steps.4.details.1'),
      t('overview.steps.4.details.2'),
      t('overview.steps.4.details.3'),
    ],
    color: '#dc2626',
    side: 'right',
    illustration: React.createElement(PersonIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 5,
    icon: React.createElement(HandshakeIcon),
    title: t('overview.steps.5.title'),
    description: t('overview.steps.5.description'),
    details: [
      t('overview.steps.5.details.0'),
      t('overview.steps.5.details.1'),
      t('overview.steps.5.details.2'),
      t('overview.steps.5.details.3'),
      t('overview.steps.5.details.4'),
    ],
    color: '#ea580c',
    side: 'left',
    illustration: React.createElement(HandshakeIcon, { sx: { fontSize: 120 } }),
  },
];
