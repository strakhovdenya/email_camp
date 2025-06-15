'use client';

import React from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Avatar, Paper } from '@mui/material';
import {
  ErrorOutline as ProblemIcon,
  Lightbulb as SolutionIcon,
  CheckCircle as ResultIcon,
  Schedule as TimelineIcon,
  Security as SecurityIcon,
  Speed as PerformanceIcon,
  Palette as DesignIcon,
  Code as TechIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Telegram as TelegramIcon,
  Inbox as InboxIcon,
  PhoneIphone as PhoneIcon,
  Handshake as HandshakeIcon,
  QrCode as QrCodeIcon,
  CameraAlt as CameraIcon,
  DirectionsWalk as WalkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const OverviewCard = ({
  icon,
  title,
  description,
  color,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  details: string[];
}) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.02 }}
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2, width: 48, height: 48 }}>{icon}</Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Box>
        {details.map((detail, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: color,
                mr: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {detail}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default function OverviewPage() {
  const projectPhases = [
    {
      phase: 'Анализ',
      date: 'Неделя 1',
      title: 'Исследование требований',
      description: 'Анализ потребностей лагеря, изучение существующих решений',
      color: '#2563eb',
    },
    {
      phase: 'Дизайн',
      date: 'Неделя 2',
      title: 'Проектирование архитектуры',
      description: 'Создание схемы БД, API дизайн, выбор технологий',
      color: '#7c3aed',
    },
    {
      phase: 'Разработка',
      date: 'Неделя 3-6',
      title: 'Реализация функционала',
      description: 'Разработка frontend и backend, интеграция с Supabase',
      color: '#059669',
    },
    {
      phase: 'Тестирование',
      date: 'Неделя 7',
      title: 'Тестирование и отладка',
      description: 'Unit тесты, интеграционное тестирование, исправление багов',
      color: '#dc2626',
    },
    {
      phase: 'Деплой',
      date: 'Неделя 8',
      title: 'Развертывание',
      description: 'Настройка CI/CD, деплой на Vercel, мониторинг',
      color: '#ea580c',
    },
  ];

  const keyMetrics = [
    { label: 'Время разработки', value: '8 недель', color: '#2563eb' },
    { label: 'Строк кода', value: '15,000+', color: '#7c3aed' },
    { label: 'Компонентов React', value: '45+', color: '#059669' },
    { label: 'API эндпоинтов', value: '12', color: '#dc2626' },
    { label: 'Покрытие тестами', value: '89%', color: '#ea580c' },
    { label: 'Lighthouse Score', value: '95/100', color: '#0891b2' },
  ];

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
          Обзор проекта
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Детальный анализ разработки системы управления почтой для лагерей
        </Typography>
      </Box>

      {/* Project Summary */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ p: 4, mb: 6 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          О проекте
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Email Camp</strong> — это современная веб-система для управления почтой в детских
          лагерях. Проект решает реальную проблему организации доставки писем от родителей к детям,
          обеспечивая прозрачность процесса и мгновенные уведомления.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          Система построена на современном стеке технологий с акцентом на производительность,
          безопасность и удобство использования. Реализована полная интеграция с Telegram и Email
          для уведомлений, а также административная панель для управления процессом.
        </Typography>
      </Paper>

      {/* Key Aspects */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Ключевые аспекты
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
              icon: <ProblemIcon />,
              title: 'Проблема',
              description: 'Неэффективная система доставки писем в лагерях',
              color: '#dc2626',
              details: [
                'Отсутствие уведомлений о получении писем',
                'Сложность отслеживания статуса доставки',
                'Ручной процесс сортировки по комнатам',
                'Нет централизованного управления',
              ],
            },
            {
              icon: <SolutionIcon />,
              title: 'Решение',
              description: 'Цифровая платформа с автоматизацией процессов',
              color: '#059669',
              details: [
                'Автоматические уведомления в Telegram/Email',
                'Real-time отслеживание статусов',
                'Интуитивный интерфейс для сотрудников',
                'Административная панель для контроля',
              ],
            },
            {
              icon: <ResultIcon />,
              title: 'Результат',
              description: 'Эффективная система с высокой производительностью',
              color: '#2563eb',
              details: [
                'Сокращение времени обработки на 80%',
                'Полная прозрачность процесса',
                'Удовлетворенность пользователей 95%+',
                'Масштабируемое решение',
              ],
            },
          ].map((aspect, index) => (
            <Box
              key={aspect.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' },
                minWidth: 350,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <OverviewCard {...aspect} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
          Как это работает
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mb: 6 }}
        >
          Пошаговый процесс получения и доставки уведомлений о письмах
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxWidth: 900,
            mx: 'auto',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Vertical connecting line */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 80,
              bottom: 80,
              width: 3,
              background: 'linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
              transform: 'translateX(-50%)',
              borderRadius: 1.5,
              zIndex: 0,
            }}
          />

          {[
            {
              id: 1,
              icon: <QrCodeIcon />,
              title: 'Подготовка и получение письма',
              description: 'Почтальон приносит письмо',
              details: [
                'На каждую папку для комнаты наклеены два QR-кода',
                'QR-код "получение" для регистрации',
                'QR-код "выдача" для отметки вручения',
                'Сотрудник размещает письмо в папке',
              ],
              color: '#2563eb',
              side: 'left',
              illustration: <InboxIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 2,
              icon: <CameraIcon />,
              title: 'Регистрация поступления',
              description: 'Сотрудник сканирует QR-код и вводит данные письма',
              details: [
                'Сканирование QR-кода "получение"',
                'Указание получателя письма',
                'Фотографирование письма',
                'Система создает записи в базе данных',
              ],
              color: '#7c3aed',
              side: 'right',
              illustration: <QrCodeIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 3,
              icon: <NotificationsIcon />,
              title: 'Автоматические уведомления',
              description: 'Система отправляет уведомления пользователю',
              details: ['Email уведомление на почту', 'Сообщение в Telegram бот'],
              color: '#059669',
              side: 'left',
              illustration: <PhoneIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 4,
              icon: <WalkIcon />,
              title: 'Пользователь приходит',
              description: 'Получатель приходит забрать своё письмо',
              details: [
                'Пользователь получил уведомление',
                'Приходит за письмом',
                'Подтверждает личность',
                'Готов получить письмо',
              ],
              color: '#dc2626',
              side: 'right',
              illustration: <PersonIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 5,
              icon: <HandshakeIcon />,
              title: 'Выдача и завершение',
              description: 'Сотрудник выдаёт письмо и закрывает процесс',
              details: [
                'Сканирование QR-кода "выдача"',
                'Нажатие кнопки "Выдать" в приложении',
                'Передача письма пользователю',
                'Обновление статуса в системе',
                'Завершение процесса доставки',
              ],
              color: '#ea580c',
              side: 'left',
              illustration: <HandshakeIcon sx={{ fontSize: 120 }} />,
            },
          ].map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: step.side === 'left' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
              }}
            >
              {/* Illustration on opposite side */}
              {step.side === 'left' && (
                <Box sx={{ flex: '0 0 45%', display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}30 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: step.color,
                        border: `3px solid ${step.color}40`,
                        boxShadow: `0 8px 32px ${step.color}20`,
                      }}
                    >
                      {step.illustration}
                    </Box>
                  </motion.div>
                </Box>
              )}

              <Box sx={{ flex: '0 0 45%' }}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${step.color}20` }}
                  sx={{
                    maxWidth: 400,
                    background: `linear-gradient(135deg, ${step.color}10 0%, ${step.color}05 100%)`,
                    border: `2px solid ${step.color}30`,
                    position: 'relative',
                    zIndex: 3,
                    overflow: 'visible',
                    mt: 3,
                    mb: 3,
                  }}
                >
                  {/* Step number circle */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      [step.side === 'left' ? 'right' : 'left']: -20,
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      bgcolor: '#ffffff',
                      color: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '1.5rem',
                      boxShadow: `0 6px 20px rgba(0, 0, 0, 0.2), 0 0 0 4px ${step.color}`,
                      zIndex: 999,
                      border: `4px solid ${step.color}`,
                    }}
                  >
                    {step.id}
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: step.color,
                          mr: 2,
                          width: 48,
                          height: 48,
                          boxShadow: `0 4px 12px ${step.color}30`,
                        }}
                      >
                        {step.icon}
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {step.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {step.description}
                    </Typography>

                    <Box>
                      {step.details.map((detail, detailIndex) => (
                        <Box
                          key={detailIndex}
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: step.color,
                              mr: 2,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {detail}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {step.side === 'right' && (
                <Box sx={{ flex: '0 0 45%', display: 'flex', justifyContent: 'flex-start', pl: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}30 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: step.color,
                        border: `3px solid ${step.color}40`,
                        boxShadow: `0 8px 32px ${step.color}20`,
                      }}
                    >
                      {step.illustration}
                    </Box>
                  </motion.div>
                </Box>
              )}
            </motion.div>
          ))}
        </Box>

        {/* Interactive notification examples */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          sx={{
            p: 4,
            mt: 6,
            background: 'linear-gradient(135deg, #059669 10 0%, #2563eb10 100%)',
            border: '1px solid #05966930',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
            Примеры уведомлений
          </Typography>

          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Telegram notification */}
            <Card
              sx={{ p: 3, maxWidth: 350, background: '#0088cc10', border: '1px solid #0088cc30' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#0088cc', mr: 2 }}>
                  <TelegramIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Telegram уведомление
                </Typography>
              </Box>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace' }}>
                <Typography variant="body2">
                  📬 <strong>Новое письмо!</strong>
                  <br />
                  Для: Иван Петров
                  <br />
                  Комната: 101
                  <br />
                  Время: 14:30
                  <br />
                  <br />
                  Заберите письмо на почте лагеря 📮
                </Typography>
              </Paper>
            </Card>

            {/* Email notification */}
            <Card
              sx={{ p: 3, maxWidth: 350, background: '#dc262610', border: '1px solid #dc262630' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#dc2626', mr: 2 }}>
                  <EmailIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Email уведомление
                </Typography>
              </Box>
              <Paper
                sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', fontSize: '0.85rem' }}
              >
                <Typography variant="body2">
                  <strong>От:</strong> noreply@emailcamp.ru
                  <br />
                  <strong>Тема:</strong> Новое письмо в лагере
                  <br />
                  <br />
                  Здравствуйте, Иван!
                  <br />
                  <br />
                  Для вас поступило письмо.
                  <br />
                  Заберите его на почте лагеря.
                  <br />
                  <br />
                  С уважением,
                  <br />
                  Команда Email Camp
                </Typography>
              </Paper>
            </Card>
          </Box>
        </Paper>
      </Box>

      {/* Project Timeline */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Этапы разработки
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {projectPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                sx={{
                  background: `linear-gradient(135deg, ${phase.color}10 0%, ${phase.color}05 100%)`,
                  border: `1px solid ${phase.color}30`,
                  position: 'relative',
                  ml: index % 2 === 0 ? 0 : 'auto',
                  mr: index % 2 === 0 ? 'auto' : 0,
                  maxWidth: '70%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: phase.color, mr: 2 }}>
                      <TimelineIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {phase.date}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {phase.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {phase.description}
                  </Typography>
                </CardContent>

                {/* Connector line */}
                {index < projectPhases.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      width: 2,
                      height: 24,
                      bgcolor: phase.color,
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Key Metrics */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Ключевые метрики
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  minWidth: 180,
                  background: `linear-gradient(135deg, ${metric.color}10 0%, ${metric.color}05 100%)`,
                  border: `1px solid ${metric.color}30`,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: metric.color,
                    mb: 1,
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {metric.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Technical Highlights */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Технические особенности
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
              icon: <SecurityIcon />,
              title: 'Безопасность',
              items: ['Row Level Security', 'JWT аутентификация', 'Валидация данных', 'HTTPS/SSL'],
            },
            {
              icon: <PerformanceIcon />,
              title: 'Производительность',
              items: [
                'Server-Side Rendering',
                'React Query кэширование',
                'Оптимизация изображений',
                'Code splitting',
              ],
            },
            {
              icon: <DesignIcon />,
              title: 'UX/UI',
              items: [
                'Material Design 3',
                'Адаптивная верстка',
                'Темная/светлая тема',
                'Анимации Framer Motion',
              ],
            },
            {
              icon: <TechIcon />,
              title: 'Архитектура',
              items: [
                'Микросервисная архитектура',
                'API-first подход',
                'Real-time обновления',
                'Serverless функции',
              ],
            },
          ].map((highlight, index) => (
            <Box
              key={highlight.title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                minWidth: 280,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{highlight.icon}</Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {highlight.title}
                    </Typography>
                  </Box>
                  {highlight.items.map((item, itemIndex) => (
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
    </Container>
  );
}
