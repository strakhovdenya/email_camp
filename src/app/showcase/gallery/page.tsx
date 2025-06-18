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

// Константы категорий
const GALLERY_CATEGORIES = {
  ALL: 'all',
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  CORE: 'core',
  AUTH: 'auth',
  ADMIN: 'admin',
  SHOWCASE: 'showcase',
} as const;

// Тип категории
type GalleryCategory = (typeof GALLERY_CATEGORIES)[keyof typeof GALLERY_CATEGORIES];
type GalleryCategoryFilter = Exclude<GalleryCategory, 'all'>;

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categories: GalleryCategoryFilter[];
  image: string;
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Главная страница',
    description: 'Скриншот страницы: Главная страница',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/desktop/homepage.png',
    tags: ['UI/UX'],
  },
  {
    id: '2',
    title: 'Страница комнаты',
    description: 'Скриншот страницы: Страница комнаты',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/desktop/room-page.png',
    tags: ['Комнаты'],
  },
  {
    id: '3',
    title: 'Выдача писем',
    description: 'Скриншот страницы: Выдача писем',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/desktop/deliver-page.png',
    tags: ['Выдача'],
  },
  {
    id: '4',
    title: 'Авторизация',
    description: 'Скриншот страницы: Авторизация',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.AUTH],
    image: '/images/gallery/desktop/auth-page.png',
    tags: ['Авторизация'],
  },
  {
    id: '5',
    title: 'Регистрация',
    description: 'Скриншот страницы: Регистрация',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.AUTH],
    image: '/images/gallery/desktop/signup-page.png',
    tags: ['UI/UX'],
  },
  {
    id: '6',
    title: 'Админ панель',
    description: 'Скриншот страницы: Админ панель',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/desktop/admin-dashboard.png',
    tags: ['Админ'],
  },
  {
    id: '7',
    title: 'Управление письмами',
    description: 'Скриншот страницы: Управление письмами',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/desktop/admin-letters.png',
    tags: ['Админ', 'Письма'],
  },
  {
    id: '8',
    title: 'Управление пользователями',
    description: 'Скриншот страницы: Управление пользователями',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/desktop/admin-users.png',
    tags: ['Админ', 'Пользователи'],
  },
  {
    id: '9',
    title: 'Управление комнатами',
    description: 'Скриншот страницы: Управление комнатами',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/desktop/admin-rooms.png',
    tags: ['Админ', 'Комнаты'],
  },
  {
    id: '10',
    title: 'Обзор проекта',
    description: 'Скриншот страницы: Обзор проекта',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-overview.png',
    tags: ['Showcase'],
  },
  {
    id: '11',
    title: 'Демо приложения',
    description: 'Скриншот страницы: Демо приложения',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-demo.png',
    tags: ['Showcase'],
  },
  {
    id: '12',
    title: 'Возможности',
    description: 'Скриншот страницы: Возможности',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-features.png',
    tags: ['Showcase'],
  },
  {
    id: '13',
    title: 'Галерея',
    description: 'Скриншот страницы: Галерея',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-gallery.png',
    tags: ['Showcase'],
  },
  {
    id: '14',
    title: 'Технологии',
    description: 'Скриншот страницы: Технологии',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-tech.png',
    tags: ['Showcase'],
  },
  {
    id: '15',
    title: 'Архитектура',
    description: 'Скриншот страницы: Архитектура',
    categories: [GALLERY_CATEGORIES.DESKTOP, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/desktop/showcase-architecture.png',
    tags: ['Showcase'],
  },
  // Мобильные версии
  {
    id: '16',
    title: 'Главная страница (Мобильная)',
    description: 'Мобильная версия: Главная страница',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/mobile/homepage.png',
    tags: ['Мобильный', 'UI/UX'],
  },
  {
    id: '17',
    title: 'Страница комнаты (Мобильная)',
    description: 'Мобильная версия: Страница комнаты',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/mobile/room-page.png',
    tags: ['Мобильный', 'Комнаты'],
  },
  {
    id: '18',
    title: 'Выдача писем (Мобильная)',
    description: 'Мобильная версия: Выдача писем',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.CORE],
    image: '/images/gallery/mobile/deliver-page.png',
    tags: ['Мобильный', 'Выдача'],
  },
  {
    id: '19',
    title: 'Авторизация (Мобильная)',
    description: 'Мобильная версия: Авторизация',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.AUTH],
    image: '/images/gallery/mobile/auth-page.png',
    tags: ['Мобильный', 'Авторизация'],
  },
  {
    id: '20',
    title: 'Регистрация (Мобильная)',
    description: 'Мобильная версия: Регистрация',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.AUTH],
    image: '/images/gallery/mobile/signup-page.png',
    tags: ['Мобильный', 'UI/UX'],
  },
  {
    id: '21',
    title: 'Админ панель (Мобильная)',
    description: 'Мобильная версия: Админ панель',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/mobile/admin-dashboard.png',
    tags: ['Мобильный', 'Админ'],
  },
  {
    id: '22',
    title: 'Управление письмами (Мобильная)',
    description: 'Мобильная версия: Управление письмами',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/mobile/admin-letters.png',
    tags: ['Мобильный', 'Админ', 'Письма'],
  },
  {
    id: '23',
    title: 'Управление пользователями (Мобильная)',
    description: 'Мобильная версия: Управление пользователями',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/mobile/admin-users.png',
    tags: ['Мобильный', 'Админ', 'Пользователи'],
  },
  {
    id: '24',
    title: 'Управление комнатами (Мобильная)',
    description: 'Мобильная версия: Управление комнатами',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.ADMIN],
    image: '/images/gallery/mobile/admin-rooms.png',
    tags: ['Мобильный', 'Админ', 'Комнаты'],
  },
  {
    id: '25',
    title: 'Обзор проекта (Мобильная)',
    description: 'Мобильная версия: Обзор проекта',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-overview.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '26',
    title: 'Демо приложения (Мобильная)',
    description: 'Мобильная версия: Демо приложения',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-demo.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '27',
    title: 'Возможности (Мобильная)',
    description: 'Мобильная версия: Возможности',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-features.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '28',
    title: 'Галерея (Мобильная)',
    description: 'Мобильная версия: Галерея',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-gallery.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '29',
    title: 'Технологии (Мобильная)',
    description: 'Мобильная версия: Технологии',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-tech.png',
    tags: ['Мобильный', 'Showcase'],
  },
  {
    id: '30',
    title: 'Архитектура (Мобильная)',
    description: 'Мобильная версия: Архитектура',
    categories: [GALLERY_CATEGORIES.MOBILE, GALLERY_CATEGORIES.SHOWCASE],
    image: '/images/gallery/mobile/showcase-architecture.png',
    tags: ['Мобильный', 'Showcase'],
  },
];

const categories = [
  { key: GALLERY_CATEGORIES.ALL, label: 'Все', icon: <GalleryIcon />, color: '#2563eb' },
  { key: GALLERY_CATEGORIES.DESKTOP, label: 'Десктоп', icon: <DesktopIcon />, color: '#059669' },
  { key: GALLERY_CATEGORIES.MOBILE, label: 'Мобильный', icon: <MobileIcon />, color: '#7c3aed' },
  { key: GALLERY_CATEGORIES.CORE, label: 'Основные', icon: <EmailIcon />, color: '#16a34a' },
  { key: GALLERY_CATEGORIES.AUTH, label: 'Авторизация', icon: <SecurityIcon />, color: '#dc2626' },
  {
    key: GALLERY_CATEGORIES.ADMIN,
    label: 'Админ панель',
    icon: <DashboardIcon />,
    color: '#ea580c',
  },
  {
    key: GALLERY_CATEGORIES.SHOWCASE,
    label: 'Демонстрация',
    icon: <NotificationIcon />,
    color: '#7c3aed',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(GALLERY_CATEGORIES.ALL);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === GALLERY_CATEGORIES.ALL
      ? galleryItems
      : galleryItems.filter((item) =>
          item.categories.includes(selectedCategory as GalleryCategoryFilter)
        );

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 2, fontWeight: 800 }}
        >
          Галерея
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Скриншоты интерфейса и демонстрация возможностей системы
        </Typography>
      </Box>

      {/* Category Filter */}
      <Paper sx={{ p: 3, mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          Категории
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.key}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.key)}
              sx={{
                cursor: 'pointer',
                minWidth: 140,
                background:
                  selectedCategory === category.key
                    ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
                    : 'background.paper',
                border:
                  selectedCategory === category.key
                    ? `2px solid ${category.color}`
                    : '1px solid rgba(0, 0, 0, 0.12)',
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: category.color,
                    mx: 'auto',
                    mb: 1,
                    width: 40,
                    height: 40,
                  }}
                >
                  {category.icon}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {category.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.key === GALLERY_CATEGORIES.ALL
                    ? galleryItems.length
                    : galleryItems.filter((item: GalleryItem) =>
                        item.categories.includes(category.key as GalleryCategoryFilter)
                      ).length}{' '}
                  элементов
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Gallery Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {categories.find((c) => c.key === selectedCategory)?.label || 'Все'}
          <Chip label={filteredItems.length} size="small" sx={{ ml: 2 }} />
        </Typography>

        <ImageList variant="masonry" cols={3} gap={16}>
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

      {/* Features Showcase */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Особенности интерфейса
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {[
            {
              icon: <DesktopIcon />,
              title: 'Адаптивный дизайн',
              description: 'Оптимизация для всех устройств',
              color: '#2563eb',
              features: ['Desktop First', 'Mobile Responsive', 'Tablet Support'],
            },
            {
              icon: <GalleryIcon />,
              title: 'Material Design 3',
              description: 'Современные компоненты MUI',
              color: '#7c3aed',
              features: ['Glassmorphism', 'Градиенты', 'Анимации'],
            },
            {
              icon: <NotificationIcon />,
              title: 'UX/UI Паттерны',
              description: 'Интуитивный пользовательский опыт',
              color: '#059669',
              features: ['Loading States', 'Error Handling', 'Feedback'],
            },
            {
              icon: <SecurityIcon />,
              title: 'Доступность',
              description: 'Соответствие стандартам A11Y',
              color: '#dc2626',
              features: ['Keyboard Navigation', 'Screen Reader', 'High Contrast'],
            },
          ].map((feature, index) => (
            <Box
              key={feature.title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                minWidth: 280,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    background: `linear-gradient(135deg, ${feature.color}10 0%, ${feature.color}05 100%)`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <Avatar sx={{ bgcolor: feature.color, mb: 2 }}>{feature.icon}</Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  {feature.features.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        {selectedImage && (
          <>
            <DialogTitle
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedImage.title}
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  }}
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedImage.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedImage.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
