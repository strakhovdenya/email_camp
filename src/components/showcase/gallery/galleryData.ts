import React from 'react';
import {
  PhotoLibrary as GalleryIcon,
  Dashboard as DashboardIcon,
  Email as EmailIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  PhoneIphone as MobileIcon,
  Computer as DesktopIcon,
} from '@mui/icons-material';

// Константы категорий устройств
export const DEVICE_CATEGORIES = {
  ALL: 'all',
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as const;

// Константы функциональных категорий
export const FUNCTIONAL_CATEGORIES = {
  ALL: 'all',
  CORE: 'core',
  AUTH: 'auth',
  ADMIN: 'admin',
  SHOWCASE: 'showcase',
} as const;

// Типы категорий
export type DeviceCategory = (typeof DEVICE_CATEGORIES)[keyof typeof DEVICE_CATEGORIES];
export type FunctionalCategory = (typeof FUNCTIONAL_CATEGORIES)[keyof typeof FUNCTIONAL_CATEGORIES];
export type DeviceCategoryFilter = Exclude<DeviceCategory, 'all'>;
export type FunctionalCategoryFilter = Exclude<FunctionalCategory, 'all'>;

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  deviceCategory: DeviceCategoryFilter;
  functionalCategory: FunctionalCategoryFilter;
  image: string;
  tags: string[];
}

export interface CategoryConfig {
  key: DeviceCategory | FunctionalCategory;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const galleryItems: GalleryItem[] = [
  // Desktop страницы
  {
    id: '1',
    title: 'Главная страница',
    description: 'Скриншот страницы: Главная страница',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/desktop/homepage.png',
    tags: ['UI/UX'],
  },
  {
    id: '2',
    title: 'Страница комнаты',
    description: 'Скриншот страницы: Страница комнаты',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/desktop/room-page.png',
    tags: ['Комнаты'],
  },
  {
    id: '3',
    title: 'Выдача писем',
    description: 'Скриншот страницы: Выдача писем',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/desktop/deliver-page.png',
    tags: ['Выдача'],
  },
  {
    id: '4',
    title: 'Авторизация',
    description: 'Скриншот страницы: Авторизация',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/desktop/auth-page.png',
    tags: ['Авторизация'],
  },
  {
    id: '5',
    title: 'Регистрация',
    description: 'Скриншот страницы: Регистрация',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/desktop/signup-page.png',
    tags: ['Авторизация'],
  },
  {
    id: '6',
    title: 'Админ панель',
    description: 'Скриншот страницы: Админ панель',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/desktop/admin-dashboard.png',
    tags: ['Админ'],
  },
  {
    id: '7',
    title: 'Управление письмами',
    description: 'Скриншот страницы: Управление письмами',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/desktop/admin-letters.png',
    tags: ['Админ', 'Письма'],
  },
  {
    id: '8',
    title: 'Управление пользователями',
    description: 'Скриншот страницы: Управление пользователями',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/desktop/admin-users.png',
    tags: ['Админ', 'Пользователи'],
  },
  {
    id: '9',
    title: 'Управление комнатами',
    description: 'Скриншот страницы: Управление комнатами',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/desktop/admin-rooms.png',
    tags: ['Админ', 'Комнаты'],
  },
  {
    id: '10',
    title: 'Обзор проекта',
    description: 'Скриншот страницы: Обзор проекта',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/desktop/showcase-overview.png',
    tags: ['Showcase'],
  },
  {
    id: '11',
    title: 'Демо приложения',
    description: 'Скриншот страницы: Демо приложения',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/desktop/showcase-demo.png',
    tags: ['Showcase'],
  },
  {
    id: '12',
    title: 'Возможности',
    description: 'Скриншот страницы: Возможности',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/desktop/showcase-features.png',
    tags: ['Showcase'],
  },
  {
    id: '13',
    title: 'Технологии',
    description: 'Скриншот страницы: Технологии',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/desktop/showcase-tech.png',
    tags: ['Showcase'],
  },
  {
    id: '14',
    title: 'Архитектура',
    description: 'Скриншот страницы: Архитектура',
    deviceCategory: DEVICE_CATEGORIES.DESKTOP,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/desktop/showcase-architecture.png',
    tags: ['Showcase'],
  },
  // Mobile страницы
  {
    id: '15',
    title: 'Главная страница (мобильная)',
    description: 'Скриншот страницы: Главная страница (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/homepage.png',
    tags: ['UI/UX', 'Мобильная'],
  },
  {
    id: '16',
    title: 'Страница комнаты (мобильная)',
    description: 'Скриншот страницы: Страница комнаты (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/room-page.png',
    tags: ['Комнаты', 'Мобильная'],
  },
  {
    id: '17',
    title: 'Выдача писем (мобильная)',
    description: 'Скриншот страницы: Выдача писем (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/deliver-page.png',
    tags: ['Выдача', 'Мобильная'],
  },
  {
    id: '18',
    title: 'Авторизация (мобильная)',
    description: 'Скриншот страницы: Авторизация (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/mobile/auth-page.png',
    tags: ['Авторизация', 'Мобильная'],
  },
  {
    id: '19',
    title: 'Регистрация (мобильная)',
    description: 'Скриншот страницы: Регистрация (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/mobile/signup-page.png',
    tags: ['Авторизация', 'Мобильная'],
  },
  {
    id: '20',
    title: 'Админ панель (мобильная)',
    description: 'Скриншот страницы: Админ панель (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-dashboard.png',
    tags: ['Админ', 'Мобильная'],
  },
  {
    id: '21',
    title: 'Управление письмами (мобильная)',
    description: 'Скриншот страницы: Управление письмами (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-letters.png',
    tags: ['Админ', 'Письма', 'Мобильная'],
  },
  {
    id: '22',
    title: 'Управление пользователями (мобильная)',
    description: 'Скриншот страницы: Управление пользователями (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-users.png',
    tags: ['Админ', 'Пользователи', 'Мобильная'],
  },
  {
    id: '23',
    title: 'Управление комнатами (мобильная)',
    description: 'Скриншот страницы: Управление комнатами (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-rooms.png',
    tags: ['Админ', 'Комнаты', 'Мобильная'],
  },
  {
    id: '24',
    title: 'Обзор проекта (мобильная)',
    description: 'Скриншот страницы: Обзор проекта (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-overview.png',
    tags: ['Showcase', 'Мобильная'],
  },
  {
    id: '25',
    title: 'Демо приложения (мобильная)',
    description: 'Скриншот страницы: Демо приложения (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-demo.png',
    tags: ['Showcase', 'Мобильная'],
  },
  {
    id: '26',
    title: 'Возможности (мобильная)',
    description: 'Скриншот страницы: Возможности (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-features.png',
    tags: ['Showcase', 'Мобильная'],
  },
  {
    id: '27',
    title: 'Технологии (мобильная)',
    description: 'Скриншот страницы: Технологии (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-tech.png',
    tags: ['Showcase', 'Мобильная'],
  },
  {
    id: '28',
    title: 'Архитектура (мобильная)',
    description: 'Скриншот страницы: Архитектура (мобильная версия)',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-architecture.png',
    tags: ['Showcase', 'Мобильная'],
  },
];

const deviceCategories: CategoryConfig[] = [
  {
    key: DEVICE_CATEGORIES.ALL,
    label: 'Все',
    icon: React.createElement(GalleryIcon),
    color: '#2563eb',
  },
  {
    key: DEVICE_CATEGORIES.DESKTOP,
    label: 'Десктоп',
    icon: React.createElement(DesktopIcon),
    color: '#059669',
  },
  {
    key: DEVICE_CATEGORIES.MOBILE,
    label: 'Мобильные',
    icon: React.createElement(MobileIcon),
    color: '#dc2626',
  },
];

const functionalCategories: CategoryConfig[] = [
  {
    key: FUNCTIONAL_CATEGORIES.ALL,
    label: 'Все функции',
    icon: React.createElement(DashboardIcon),
    color: '#2563eb',
  },
  {
    key: FUNCTIONAL_CATEGORIES.CORE,
    label: 'Основные',
    icon: React.createElement(EmailIcon),
    color: '#059669',
  },
  {
    key: FUNCTIONAL_CATEGORIES.AUTH,
    label: 'Авторизация',
    icon: React.createElement(SecurityIcon),
    color: '#dc2626',
  },
  {
    key: FUNCTIONAL_CATEGORIES.ADMIN,
    label: 'Администрирование',
    icon: React.createElement(DashboardIcon),
    color: '#ea580c',
  },
  {
    key: FUNCTIONAL_CATEGORIES.SHOWCASE,
    label: 'Демонстрация',
    icon: React.createElement(NotificationIcon),
    color: '#7c3aed',
  },
];

export const galleryData = {
  items: galleryItems,
  deviceCategories,
  functionalCategories,
  title: 'Галерея',
  subtitle: 'Скриншоты интерфейса и демонстрация возможностей системы',
};
