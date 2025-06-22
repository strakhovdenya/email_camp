import React from 'react';
import { Typography, Box, Card, Avatar } from '@mui/material';
import {
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export function BenefitsSummary() {
  const benefits = [
    {
      icon: <SpeedIcon />,
      title: 'Экономия времени',
      description: 'Устранение ежедневных очередей после 14:00',
      color: '#2563eb',
    },
    {
      icon: <CheckIcon />,
      title: 'Гарантия получения',
      description: 'Жители приходят только при наличии почты',
      color: '#059669',
    },
    {
      icon: <TimeIcon />,
      title: 'Быстрая обработка',
      description: 'Регистрация и выдача за секунды',
      color: '#7c3aed',
    },
    {
      icon: <TrendingIcon />,
      title: 'Полная прозрачность',
      description: 'Отслеживание каждого этапа процесса',
      color: '#dc2626',
    },
  ];

  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h3"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 700,
          fontSize: { xs: '1.8rem', md: '2.5rem' },
        }}
      >
        Результаты внедрения
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 3 },
            maxWidth: '1000px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {benefits.map((benefit, index) => (
            <Box
              sx={{
                flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                minWidth: { xs: '140px', md: '200px' },
              }}
              key={index}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    background: `linear-gradient(135deg, ${benefit.color}10 0%, ${benefit.color}05 100%)`,
                    border: `1px solid ${benefit.color}30`,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: benefit.color,
                      mx: 'auto',
                      mb: 2,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
