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

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'desktop' | 'mobile' | 'admin' | 'features';
  image: string;
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Главная страница',
    description: 'Современный дизайн главной страницы с градиентами и анимациями',
    category: 'desktop',
    image: '/images/gallery/desktop/homepage.png',
    tags: ['UI/UX', 'Главная', 'Дизайн']
  },
  {
    id: '2',
    title: 'Список писем',
    description: 'Интерфейс управления письмами с фильтрами и поиском',
    category: 'desktop',
    image: '/images/gallery/desktop/letters-list.png',
    tags: ['Письма', 'Управление', 'Фильтры']
  },
  {
    id: '3',
    title: 'Добавление письма',
    description: 'Форма добавления нового письма с валидацией',
    category: 'features',
    image: '/images/gallery/features/add-letter-form.png',
    tags: ['Форма', 'Добавление', 'Валидация']
  },
  {
    id: '4',
    title: 'Админ панель',
    description: 'Панель администратора с аналитикой и управлением',
    category: 'admin',
    image: '/images/gallery/admin/admin-dashboard.png',
    tags: ['Админ', 'Аналитика', 'Управление']
  },
  {
    id: '5',
    title: 'Мобильная версия',
    description: 'Адаптивный дизайн для мобильных устройств',
    category: 'mobile',
    image: '/images/gallery/mobile/mobile-homepage.png',
    tags: ['Мобильный', 'Адаптивность', 'Responsive']
  },
  {
    id: '6',
    title: 'Уведомления',
    description: 'Система уведомлений Telegram и Email',
    category: 'features',
    image: '/images/gallery/features/notifications.png',
    tags: ['Уведомления', 'Telegram', 'Email']
  },
  {
    id: '7',
    title: 'Статистика',
    description: 'Дашборд с графиками и метриками',
    category: 'admin',
    image: '/images/gallery/admin/admin-stats.png',
    tags: ['Статистика', 'Графики', 'Метрики']
  },
  {
    id: '8',
    title: 'Настройки безопасности',
    description: 'Интерфейс управления правами доступа',
    category: 'admin',
    image: '/images/gallery/admin/admin-security.png',
    tags: ['Безопасность', 'Права', 'Доступ']
  }
];

const categories = [
  { key: 'all', label: 'Все', icon: <GalleryIcon />, color: '#2563eb' },
  { key: 'desktop', label: 'Десктоп', icon: <DesktopIcon />, color: '#059669' },
  { key: 'mobile', label: 'Мобильный', icon: <MobileIcon />, color: '#7c3aed' },
  { key: 'admin', label: 'Админ панель', icon: <DashboardIcon />, color: '#dc2626' },
  { key: 'features', label: 'Функции', icon: <EmailIcon />, color: '#ea580c' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
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
            flexWrap: 'wrap'
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
                background: selectedCategory === category.key 
                  ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
                  : 'background.paper',
                border: selectedCategory === category.key 
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
                    height: 40
                  }}
                >
                  {category.icon}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {category.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.key === 'all' 
                    ? galleryItems.length 
                    : galleryItems.filter((item: GalleryItem) => item.category === category.key).length
                  } элементов
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Gallery Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {categories.find(c => c.key === selectedCategory)?.label || 'Все'} 
          <Chip 
            label={filteredItems.length} 
            size="small" 
            sx={{ ml: 2 }} 
          />
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
                    image={`https://picsum.photos/800/600?random=${item.id}`}
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
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
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
            justifyContent: 'center'
          }}
        >
          {[
            {
              icon: <DesktopIcon />,
              title: 'Адаптивный дизайн',
              description: 'Оптимизация для всех устройств',
              color: '#2563eb',
              features: ['Desktop First', 'Mobile Responsive', 'Tablet Support']
            },
            {
              icon: <GalleryIcon />,
              title: 'Material Design 3',
              description: 'Современные компоненты MUI',
              color: '#7c3aed',
              features: ['Glassmorphism', 'Градиенты', 'Анимации']
            },
            {
              icon: <NotificationIcon />,
              title: 'UX/UI Паттерны',
              description: 'Интуитивный пользовательский опыт',
              color: '#059669',
              features: ['Loading States', 'Error Handling', 'Feedback']
            },
            {
              icon: <SecurityIcon />,
              title: 'Доступность',
              description: 'Соответствие стандартам A11Y',
              color: '#dc2626',
              features: ['Keyboard Navigation', 'Screen Reader', 'High Contrast']
            }
          ].map((feature, index) => (
            <Box 
              key={feature.title}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                minWidth: 280
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
                  <Avatar sx={{ bgcolor: feature.color, mb: 2 }}>
                    {feature.icon}
                  </Avatar>
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
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        {selectedImage && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  src={`https://picsum.photos/800/600?random=${selectedImage.id}`}
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
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
} 