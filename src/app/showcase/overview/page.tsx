'use client';

import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Paper } from '@mui/material';
import {
  ErrorOutline as ProblemIcon,
  Lightbulb as SolutionIcon,
  CheckCircle as ResultIcon,
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
    </Container>
  );
}
