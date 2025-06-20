'use client';

import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Paper, Chip } from '@mui/material';
import {
  QrCode as QrCodeIcon,
  Notifications as NotificationIcon,
  Timeline as TrackingIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  Email as EmailIcon,
  Dashboard as DashboardIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeatureCard = ({
  title,
  description,
  icon,
  color,
  benefits,
  stats,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  stats?: { label: string; value: string; color?: string }[];
}) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.02 }}
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `2px solid ${color}30`,
      position: 'relative',
      overflow: 'visible',
    }}
  >
    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
      {/* Icon Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{
            bgcolor: color,
            mr: 2,
            width: 56,
            height: 56,
            boxShadow: `0 4px 12px ${color}40`,
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Benefits */}
      <Box sx={{ mb: stats ? 3 : 0 }}>
        {benefits.map((benefit, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
            <CheckIcon sx={{ color: color, mr: 1.5, mt: 0.1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
              {benefit}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Stats */}
      {stats && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {stats.map((stat, index) => (
            <Chip
              key={index}
              label={`${stat.value} ${stat.label}`}
              sx={{
                bgcolor: stat.color || `${color}20`,
                color: stat.color ? 'white' : color,
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            />
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
);

export default function FeaturesPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
          }}
        >
          Ключевые возможности
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            px: { xs: 2, sm: 0 },
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Четыре основных преимущества, которые делают Email Camp эффективным решением
        </Typography>
      </Box>

      {/* Main Features */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 4 },
            maxWidth: '1200px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
              minWidth: { xs: 'auto', md: '300px' },
            }}
          >
            <FeatureCard
              title="QR-коды для скорости"
              description="Мгновенная регистрация и выдача писем"
              icon={<QrCodeIcon />}
              color="#2563eb"
              benefits={[
                'Два QR-кода на каждой папке комнаты',
                'Сканирование вместо ручного ввода данных',
                'Регистрация письма за 10-15 секунд',
                'Исключение ошибок при вводе информации',
              ]}
              stats={[
                { label: 'секунд', value: '10-15', color: '#2563eb' },
                { label: 'на регистрацию', value: '⚡' },
              ]}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
              minWidth: { xs: 'auto', md: '300px' },
            }}
          >
            <FeatureCard
              title="Автоматические уведомления"
              description="Мгновенная доставка информации жителям"
              icon={<NotificationIcon />}
              color="#059669"
              benefits={[
                'Telegram бот для мгновенных уведомлений',
                'Email дублирование для надежности',
                'Автоматическая отправка при регистрации',
                'Персонализированные сообщения',
              ]}
              stats={[
                { label: 'каналов', value: '2', color: '#059669' },
                { label: 'уведомлений', value: '📱' },
              ]}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
              minWidth: { xs: 'auto', md: '300px' },
            }}
          >
            <FeatureCard
              title="Отслеживание в реальном времени"
              description="Полная прозрачность процесса доставки"
              icon={<TrackingIcon />}
              color="#7c3aed"
              benefits={[
                'Статусы: получено, уведомлено, выдано',
                'История всех операций с письмами',
                'Время поступления и выдачи',
                'Поиск и фильтрация по любым критериям',
              ]}
              stats={[
                { label: 'статуса', value: '3', color: '#7c3aed' },
                { label: 'отслеживания', value: '👁️' },
              ]}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
              minWidth: { xs: 'auto', md: '300px' },
            }}
          >
            <FeatureCard
              title="Аналитика и отчеты"
              description="Данные для оптимизации работы"
              icon={<AnalyticsIcon />}
              color="#dc2626"
              benefits={[
                'Статистика по комнатам и периодам',
                'Время обработки и выдачи писем',
                'Эффективность работы сотрудников',
                'Экспорт данных (планируется к реализации)',
              ]}
              stats={[
                { label: 'метрик', value: '10+', color: '#dc2626' },
                { label: 'аналитики', value: '📊' },
              ]}
            />
          </Box>
        </Box>
      </Box>

      {/* Authentication & Authorization System */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 6, md: 8 } }}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            maxWidth: '1200px',
            width: '100%',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '1px solid #cbd5e1',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, md: 5 },
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Система авторизации и безопасность
          </Typography>

          {/* Auth Methods */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 3, md: 4 },
                maxWidth: '1000px',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                  minWidth: { xs: 'auto', md: '300px' },
                }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, #3b82f615 0%, #2563eb10 100%)',
                    border: '2px solid #3b82f630',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#3b82f6', mr: 2, width: 48, height: 48 }}>
                      <EmailIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Email регистрация
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Классический способ с подтверждением
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#3b82f6',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Заполнение формы: имя, фамилия, email, пароль, роль
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#3b82f6',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Отправка письма с подтверждением на email
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#3b82f6',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Автоматический вход после подтверждения
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#3b82f6',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Создание записи в базе данных пользователей
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>

              <Box
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                  minWidth: { xs: 'auto', md: '300px' },
                }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, #05966915 0%, #05966910 100%)',
                    border: '2px solid #05966930',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#059669', mr: 2, width: 48, height: 48 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Google OAuth
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Быстрый вход через Google аккаунт
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#059669',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Редирект на страницу авторизации Google
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#059669',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">Получение данных профиля (имя, email)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#059669',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        Завершение профиля (роль, дополнительные данные)
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: '#059669',
                          borderRadius: '50%',
                          mr: 1.5,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">Автоматический вход в систему</Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>

          {/* Security Features */}
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Особенности безопасности
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
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
              {[
                {
                  icon: <AdminIcon />,
                  title: 'Первый = Администратор',
                  description:
                    'Первый зарегистрированный пользователь автоматически получает права администратора',
                  color: '#dc2626',
                },
                {
                  icon: <CheckIcon />,
                  title: 'Контролируемая регистрация',
                  description: 'После создания админа самостоятельная регистрация блокируется',
                  color: '#7c3aed',
                },
                {
                  icon: <DashboardIcon />,
                  title: 'Роли и права',
                  description:
                    'Три роли: Администратор, Сотрудник, Житель с разными уровнями доступа',
                  color: '#2563eb',
                },
                {
                  icon: <CheckIcon />,
                  title: 'Middleware защита',
                  description:
                    'Автоматическая проверка авторизации на каждом запросе к защищенным страницам',
                  color: '#059669',
                },
              ].map((feature, index) => (
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                    minWidth: { xs: 'auto', md: '300px' },
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
                        height: '100%',
                        background: `linear-gradient(135deg, ${feature.color}10 0%, ${feature.color}05 100%)`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: feature.color,
                            mr: 2,
                            width: 40,
                            height: 40,
                            mt: 0.5,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Technical Implementation */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
              Техническая реализация
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
              {[
                { label: 'Supabase Auth', color: '#059669' },
                { label: 'Next.js Middleware', color: '#2563eb' },
                { label: 'OAuth 2.0', color: '#7c3aed' },
                { label: 'JWT Tokens', color: '#dc2626' },
                { label: 'Email Verification', color: '#ea580c' },
              ].map((tech, index) => (
                <Chip
                  key={index}
                  label={tech.label}
                  sx={{
                    bgcolor: `${tech.color}20`,
                    color: tech.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 1,
                    py: 0.5,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Benefits Summary */}
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
            {[
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
            ].map((benefit, index) => (
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
    </Container>
  );
}
