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

export const stepsData: StepData[] = [
  {
    id: 1,
    icon: React.createElement(QrCodeIcon),
    title: 'Поступление почты в лагерь',
    description: 'Почтальон доставляет письма, сотрудник сортирует по комнатам',
    details: [
      'На каждой папке комнаты наклеены два QR-кода',
      'QR-код "Приём" - для регистрации поступления',
      'QR-код "Выдача" - для отметки получения',
      'Письма размещаются в соответствующие папки',
    ],
    color: '#2563eb',
    side: 'left',
    illustration: React.createElement(InboxIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 2,
    icon: React.createElement(CameraIcon),
    title: 'Быстрая регистрация через QR',
    description: 'Сотрудник сканирует QR-код папки и регистрирует письмо за секунды',
    details: [
      'Сканирование QR-кода "Приём" на папке комнаты',
      'Выбор получателя письма из списка жителей',
      'Фотографирование письма для подтверждения',
      'Автоматическое сохранение в базе данных',
    ],
    color: '#7c3aed',
    side: 'right',
    illustration: React.createElement(QrCodeIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 3,
    icon: React.createElement(NotificationsIcon),
    title: 'Мгновенные уведомления',
    description: 'Житель лагеря немедленно получает уведомление о письме',
    details: [
      'Автоматическая отправка Email уведомления',
      'Сообщение в Telegram бот (если подключен)',
      'Уведомление содержит информацию о письме',
      'Житель точно знает, что письмо есть',
    ],
    color: '#059669',
    side: 'left',
    illustration: React.createElement(PhoneIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 4,
    icon: React.createElement(WalkIcon),
    title: 'Целевое посещение инфо-поинта',
    description: 'Житель приходит только зная, что письмо гарантированно есть',
    details: [
      'Никаких ежедневных "проверочных" визитов',
      'Житель уверен в наличии письма',
      'Отсутствие очередей и потери времени',
      'Эффективное использование времени всех сторон',
    ],
    color: '#dc2626',
    side: 'right',
    illustration: React.createElement(PersonIcon, { sx: { fontSize: 120 } }),
  },
  {
    id: 5,
    icon: React.createElement(HandshakeIcon),
    title: 'Быстрая выдача письма',
    description: 'Сотрудник сканирует QR "Выдача" и передаёт письмо',
    details: [
      'Сканирование QR-кода "Выдача" на папке',
      'Быстрый поиск письма в нужной папке',
      'Отметка о выдаче в приложении',
      'Передача письма жителю лагеря',
      'Автоматическое закрытие процесса',
    ],
    color: '#ea580c',
    side: 'left',
    illustration: React.createElement(HandshakeIcon, { sx: { fontSize: 120 } }),
  },
];
