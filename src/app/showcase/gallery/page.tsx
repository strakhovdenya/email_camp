'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PhotoLibrary as GalleryIcon,
  Dashboard as DashboardIcon,
  Email as EmailIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  PhoneIphone as MobileIcon,
  Computer as DesktopIcon,
  Close as CloseIcon,
  ZoomIn as ZoomIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Константы категорий устройств
const DEVICE_CATEGORIES = {
  ALL: 'all',
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as const;

// Константы функциональных категорий
const FUNCTIONAL_CATEGORIES = {
  ALL: 'all',
  CORE: 'core',
  AUTH: 'auth',
  ADMIN: 'admin',
  SHOWCASE: 'showcase',
} as const;

// Типы категорий
type DeviceCategory = (typeof DEVICE_CATEGORIES)[keyof typeof DEVICE_CATEGORIES];
type FunctionalCategory = (typeof FUNCTIONAL_CATEGORIES)[keyof typeof FUNCTIONAL_CATEGORIES];
type DeviceCategoryFilter = Exclude<DeviceCategory, 'all'>;
type FunctionalCategoryFilter = Exclude<FunctionalCategory, 'all'>;

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  deviceCategory: DeviceCategoryFilter;
  functionalCategory: FunctionalCategoryFilter;
  image: string;
  tags: string[];
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
    title: 'Главная страница (Мобильная)',
    description: 'Мобильная версия: Главная страница',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/homepage.png',
    tags: ['Мобильный', 'UI/UX'],
  },
  {
    id: '16',
    title: 'Страница комнаты (Мобильная)',
    description: 'Мобильная версия: Страница комнаты',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/room-page.png',
    tags: ['Мобильный', 'Комнаты'],
  },
  {
    id: '17',
    title: 'Выдача писем (Мобильная)',
    description: 'Мобильная версия: Выдача писем',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.CORE,
    image: '/images/gallery/mobile/deliver-page.png',
    tags: ['Мобильный', 'Выдача'],
  },
  {
    id: '18',
    title: 'Авторизация (Мобильная)',
    description: 'Мобильная версия: Авторизация',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/mobile/auth-page.png',
    tags: ['Мобильный', 'Авторизация'],
  },
  {
    id: '19',
    title: 'Регистрация (Мобильная)',
    description: 'Мобильная версия: Регистрация',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.AUTH,
    image: '/images/gallery/mobile/signup-page.png',
    tags: ['Мобильный', 'Авторизация'],
  },
  {
    id: '20',
    title: 'Админ панель (Мобильная)',
    description: 'Мобильная версия: Админ панель',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-dashboard.png',
    tags: ['Мобильный', 'Админ'],
  },
  {
    id: '21',
    title: 'Управление письмами (Мобильная)',
    description: 'Мобильная версия: Управление письмами',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-letters.png',
    tags: ['Мобильный', 'Админ', 'Письма'],
  },
  {
    id: '22',
    title: 'Управление пользователями (Мобильная)',
    description: 'Мобильная версия: Управление пользователями',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-users.png',
    tags: ['Мобильный', 'Админ', 'Пользователи'],
  },
  {
    id: '23',
    title: 'Управление комнатами (Мобильная)',
    description: 'Мобильная версия: Управление комнатами',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.ADMIN,
    image: '/images/gallery/mobile/admin-rooms.png',
    tags: ['Мобильный', 'Админ', 'Комнаты'],
  },
  {
    id: '24',
    title: 'Обзор проекта (Мобильная)',
    description: 'Мобильная версия: Обзор проекта',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-overview.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '25',
    title: 'Демо приложения (Мобильная)',
    description: 'Мобильная версия: Демо приложения',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-demo.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '26',
    title: 'Возможности (Мобильная)',
    description: 'Мобильная версия: Возможности',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-features.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '27',
    title: 'Технологии (Мобильная)',
    description: 'Мобильная версия: Технологии',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-tech.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '28',
    title: 'Архитектура (Мобильная)',
    description: 'Мобильная версия: Архитектура',
    deviceCategory: DEVICE_CATEGORIES.MOBILE,
    functionalCategory: FUNCTIONAL_CATEGORIES.SHOWCASE,
    image: '/images/gallery/mobile/showcase-architecture.png',
    tags: ['Мобильный', 'Showcase'],
  },
];

// Категории устройств
const deviceCategories = [
  { key: DEVICE_CATEGORIES.ALL, label: 'Все', icon: <GalleryIcon />, color: '#2563eb' },
  { key: DEVICE_CATEGORIES.DESKTOP, label: 'Десктоп', icon: <DesktopIcon />, color: '#059669' },
  { key: DEVICE_CATEGORIES.MOBILE, label: 'Мобильный', icon: <MobileIcon />, color: '#7c3aed' },
];

// Функциональные категории
const functionalCategories = [
  { key: FUNCTIONAL_CATEGORIES.ALL, label: 'Все', icon: <GalleryIcon />, color: '#6b7280' },
  { key: FUNCTIONAL_CATEGORIES.CORE, label: 'Основные', icon: <EmailIcon />, color: '#16a34a' },
  {
    key: FUNCTIONAL_CATEGORIES.AUTH,
    label: 'Авторизация',
    icon: <SecurityIcon />,
    color: '#dc2626',
  },
  {
    key: FUNCTIONAL_CATEGORIES.ADMIN,
    label: 'Админ панель',
    icon: <DashboardIcon />,
    color: '#ea580c',
  },
  {
    key: FUNCTIONAL_CATEGORIES.SHOWCASE,
    label: 'Демонстрация',
    icon: <NotificationIcon />,
    color: '#7c3aed',
  },
];

export default function GalleryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState<DeviceCategory>(
    DEVICE_CATEGORIES.ALL
  );
  const [selectedFunctionalCategory, setSelectedFunctionalCategory] = useState<FunctionalCategory>(
    FUNCTIONAL_CATEGORIES.ALL
  );
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Фильтрация по двум критериям
  const filteredItems = galleryItems.filter((item) => {
    const deviceMatch =
      selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
      item.deviceCategory === selectedDeviceCategory;
    const functionalMatch =
      selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
      item.functionalCategory === selectedFunctionalCategory;
    return deviceMatch && functionalMatch;
  });

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  // Подсчет элементов для каждой категории
  const getDeviceCategoryCount = (categoryKey: DeviceCategory) => {
    if (categoryKey === DEVICE_CATEGORIES.ALL) {
      return galleryItems.filter((item) => {
        const functionalMatch =
          selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
          item.functionalCategory === selectedFunctionalCategory;
        return functionalMatch;
      }).length;
    }
    return galleryItems.filter((item) => {
      const deviceMatch = item.deviceCategory === categoryKey;
      const functionalMatch =
        selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
        item.functionalCategory === selectedFunctionalCategory;
      return deviceMatch && functionalMatch;
    }).length;
  };

  const getFunctionalCategoryCount = (categoryKey: FunctionalCategory) => {
    if (categoryKey === FUNCTIONAL_CATEGORIES.ALL) {
      return galleryItems.filter((item) => {
        const deviceMatch =
          selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
          item.deviceCategory === selectedDeviceCategory;
        return deviceMatch;
      }).length;
    }
    return galleryItems.filter((item) => {
      const deviceMatch =
        selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
        item.deviceCategory === selectedDeviceCategory;
      const functionalMatch = item.functionalCategory === categoryKey;
      return deviceMatch && functionalMatch;
    }).length;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 6 } }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '3.5rem' },
          }}
        >
          Галерея
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '0.9rem', md: '1.25rem' },
          }}
        >
          Скриншоты интерфейса и демонстрация возможностей системы
        </Typography>
      </Box>

      {/* Filters Section */}
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          gap: { md: 3 },
          mb: { xs: 4, md: 6 },
        }}
      >
        {/* Device Category Filter */}
        <Box sx={{ flex: { md: 1 } }}>
          <Paper sx={{ p: { xs: 1.5, md: 3 }, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h5"
              sx={{
                mb: { xs: 1.5, md: 3 },
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Устройства
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 0.5, md: 2 },
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {deviceCategories.map((category) => (
                <Box key={category.key} sx={{ display: { xs: 'block', md: 'none' } }}>
                  {/* Mobile Version - Compact Buttons */}
                  <Button
                    component={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDeviceCategory(category.key)}
                    variant={selectedDeviceCategory === category.key ? 'contained' : 'outlined'}
                    size="small"
                    startIcon={category.icon}
                    sx={{
                      minWidth: 70,
                      px: 1,
                      py: 0.5,
                      fontSize: '0.65rem',
                      backgroundColor:
                        selectedDeviceCategory === category.key ? category.color : 'transparent',
                      borderColor: category.color,
                      color: selectedDeviceCategory === category.key ? 'white' : category.color,
                      '&:hover': {
                        backgroundColor:
                          selectedDeviceCategory === category.key
                            ? category.color
                            : `${category.color}10`,
                        borderColor: category.color,
                      },
                      '& .MuiButton-startIcon': {
                        marginRight: '4px',
                        '& svg': {
                          fontSize: '0.9rem',
                        },
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>
                        {category.label}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.55rem', opacity: 0.8 }}>
                        {getDeviceCategoryCount(category.key)}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              ))}
              {deviceCategories.map((category) => (
                <Box key={`desktop-${category.key}`} sx={{ display: { xs: 'none', md: 'block' } }}>
                  {/* Desktop Version - Original Cards */}
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDeviceCategory(category.key)}
                    sx={{
                      cursor: 'pointer',
                      minWidth: 100,
                      background:
                        selectedDeviceCategory === category.key
                          ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
                          : 'background.paper',
                      border:
                        selectedDeviceCategory === category.key
                          ? `2px solid ${category.color}`
                          : '1px solid rgba(0, 0, 0, 0.12)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: category.color,
                          mx: 'auto',
                          mb: 0.5,
                          width: 32,
                          height: 32,
                        }}
                      >
                        {category.icon}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {category.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.7rem' }}
                      >
                        {getDeviceCategoryCount(category.key)} элементов
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Functional Category Filter */}
        <Box sx={{ flex: { md: 1 } }}>
          <Paper sx={{ p: { xs: 1.5, md: 3 } }}>
            <Typography
              variant="h5"
              sx={{
                mb: { xs: 1.5, md: 3 },
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Категории
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 0.5, md: 2 },
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {functionalCategories.map((category) => (
                <Box key={category.key} sx={{ display: { xs: 'block', md: 'none' } }}>
                  {/* Mobile Version - Compact Buttons */}
                  <Button
                    component={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFunctionalCategory(category.key)}
                    variant={selectedFunctionalCategory === category.key ? 'contained' : 'outlined'}
                    size="small"
                    startIcon={category.icon}
                    sx={{
                      minWidth: 70,
                      px: 1,
                      py: 0.5,
                      fontSize: '0.65rem',
                      backgroundColor:
                        selectedFunctionalCategory === category.key
                          ? category.color
                          : 'transparent',
                      borderColor: category.color,
                      color: selectedFunctionalCategory === category.key ? 'white' : category.color,
                      '&:hover': {
                        backgroundColor:
                          selectedFunctionalCategory === category.key
                            ? category.color
                            : `${category.color}10`,
                        borderColor: category.color,
                      },
                      '& .MuiButton-startIcon': {
                        marginRight: '4px',
                        '& svg': {
                          fontSize: '0.9rem',
                        },
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>
                        {category.label}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.55rem', opacity: 0.8 }}>
                        {getFunctionalCategoryCount(category.key)}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              ))}
              {functionalCategories.map((category) => (
                <Box key={`desktop-${category.key}`} sx={{ display: { xs: 'none', md: 'block' } }}>
                  {/* Desktop Version - Original Cards */}
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFunctionalCategory(category.key)}
                    sx={{
                      cursor: 'pointer',
                      minWidth: 100,
                      background:
                        selectedFunctionalCategory === category.key
                          ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
                          : 'background.paper',
                      border:
                        selectedFunctionalCategory === category.key
                          ? `2px solid ${category.color}`
                          : '1px solid rgba(0, 0, 0, 0.12)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: category.color,
                          mx: 'auto',
                          mb: 0.5,
                          width: 32,
                          height: 32,
                        }}
                      >
                        {category.icon}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {category.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.7rem' }}
                      >
                        {getFunctionalCategoryCount(category.key)} элементов
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Gallery Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Результаты фильтрации
          <Chip
            label={filteredItems.length}
            size="small"
            sx={{
              ml: { xs: 1, md: 2 },
              fontSize: { xs: '0.7rem', md: '0.8rem' },
            }}
          />
        </Typography>

        <ImageList variant="masonry" cols={isMobile ? 1 : isTablet ? 2 : 3} gap={isMobile ? 8 : 16}>
          {filteredItems.map((item, index) => (
            <ImageListItem
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
                onClick={() => handleImageClick(item)}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <IconButton sx={{ color: 'white' }}>
                      <ZoomIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {item.tags.map((tag, tagIndex) => (
                      <Chip key={tagIndex} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Image Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxHeight: '90vh',
          },
        }}
      >
        {selectedImage && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedImage.title}
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                {selectedImage.description}
              </Typography>
              <Button onClick={handleCloseDialog} variant="contained">
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
