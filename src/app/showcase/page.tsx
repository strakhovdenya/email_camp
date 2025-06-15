'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Fade,
  Grow,
  Slide,
} from '@mui/material';
import {
  Email as EmailIcon,
  Room as RoomIcon,
  Notifications as NotificationIcon,
  Dashboard as DashboardIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  PlayArrow as PlayIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Компонент для анимированных чисел
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

// Компонент для интерактивных карточек функций
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color, 
  delay = 0 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}) => (
  <Grow in={true} timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
    <Card
      component={motion.div}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
      }}
      whileTap={{ scale: 0.95 }}
      sx={{
        height: '100%',
        cursor: 'pointer',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            bgcolor: color,
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            boxShadow: `0 8px 24px ${color}40`,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </Grow>
);

export default function ShowcasePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <EmailIcon />,
      title: 'Управление письмами',
      description: 'Добавление, отслеживание и выдача писем с полной историей операций',
      color: '#2563eb',
    },
    {
      icon: <RoomIcon />,
      title: 'Система комнат',
      description: 'Организация писем по комнатам с удобной навигацией и поиском',
      color: '#7c3aed',
    },
    {
      icon: <NotificationIcon />,
      title: 'Уведомления',
      description: 'Мгновенные уведомления через Telegram и Email при получении писем',
      color: '#059669',
    },
    {
      icon: <DashboardIcon />,
      title: 'Админ панель',
      description: 'Полнофункциональная панель администратора с аналитикой и управлением',
      color: '#dc2626',
    },
    {
      icon: <SecurityIcon />,
      title: 'Безопасность',
      description: 'Row Level Security, аутентификация и авторизация пользователей',
      color: '#ea580c',
    },
    {
      icon: <SpeedIcon />,
      title: 'Производительность',
      description: 'Оптимизированные запросы, кэширование и real-time обновления',
      color: '#0891b2',
    },
  ];

  const stats = [
    { label: 'Строк кода', value: 15000, suffix: '+' },
    { label: 'Компонентов', value: 45, suffix: '' },
    { label: 'API роутов', value: 12, suffix: '' },
    { label: 'Тестов', value: 89, suffix: '%' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background */}
        <Box
          component={motion.div}
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #2563eb20 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #7c3aed20 0%, transparent 50%)',
              'radial-gradient(circle at 40% 50%, #059669 20 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />

        <Fade in={isVisible} timeout={1000}>
          <Box>
            <Typography
              variant="h1"
              component={motion.h1}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ mb: 3 }}
            >
              Email Camp
            </Typography>
            
            <Typography
              variant="h4"
              component={motion.p}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{ 
                mb: 4, 
                fontWeight: 400,
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              Современная система управления почтой для лагерей с real-time уведомлениями 
              и интуитивным интерфейсом
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                component={Link}
                href="/showcase/demo"
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Попробовать демо
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com"
                target="_blank"
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                GitHub
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {stats.map((stat, index) => (
            <Box 
              key={stat.label}
              sx={{ 
                flex: { xs: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' },
                minWidth: 200
              }}
            >
              <Slide
                in={isVisible}
                direction="up"
                timeout={1000}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Card>
              </Slide>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Ключевые возможности
        </Typography>
        
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Полнофункциональная система с современным стеком технологий
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {features.map((feature, index) => (
            <Box 
              key={feature.title}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 21px)' },
                minWidth: 300
              }}
            >
              <FeatureCard {...feature} delay={index * 100} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Tech Stack Preview */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          Современный стек технологий
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 6 }}>
          {['Next.js 14', 'TypeScript', 'Supabase', 'React Query', 'MUI', 'Framer Motion'].map((tech, index) => (
            <Chip
              key={tech}
              label={tech}
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              sx={{
                fontSize: '1rem',
                py: 2,
                px: 1,
                background: 'linear-gradient(45deg, #2563eb20, #7c3aed20)',
                border: '1px solid #2563eb30',
                fontWeight: 600,
              }}
            />
          ))}
        </Box>

        <Button
          variant="outlined"
          size="large"
          endIcon={<LaunchIcon />}
          component={Link}
          href="/showcase/tech-stack"
          sx={{ fontSize: '1.1rem' }}
        >
          Подробнее о технологиях
        </Button>
      </Box>
    </Container>
  );
} 