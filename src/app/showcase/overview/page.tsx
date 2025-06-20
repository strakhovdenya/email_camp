'use client';

import React from 'react';
import Image from 'next/image';
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
          Обзор проекта
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
          <strong>Email Camp</strong> — это цифровое решение для автоматизации процесса получения и
          выдачи почты в лагерях. Система устраняет необходимость ежедневного ручного поиска писем и
          обеспечивает мгновенные уведомления жителям лагеря.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Проблема:</strong> Каждый день после 14:00 множество людей приходят на инфо-поинт
          с вопросом &ldquo;Есть ли для меня письма?&rdquo;. Сотрудники вынуждены вручную проверять
          папки каждой комнаты, тратя время даже когда писем нет.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Решение:</strong> При поступлении почты сотрудник регистрирует письма в системе
          через QR-коды на папках комнат. Жители получают автоматические уведомления и приходят за
          почтой только тогда, когда она гарантированно есть.
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
            gap: { xs: 2, md: 4 },
            justifyContent: 'center',
            px: { xs: 1, sm: 0 },
          }}
        >
          {[
            {
              icon: <ProblemIcon />,
              title: 'Проблема',
              description: 'Неэффективный процесс получения почты в лагере',
              color: '#dc2626',
              details: [
                'Ежедневные очереди на инфо-поинте после 14:00',
                'Ручная проверка папок каждой комнаты сотрудниками',
                'Потеря времени при отсутствии писем',
                'Неопределенность для жителей лагеря',
              ],
            },
            {
              icon: <SolutionIcon />,
              title: 'Решение',
              description: 'QR-система с автоматическими уведомлениями',
              color: '#059669',
              details: [
                'QR-коды на папках комнат для быстрой регистрации',
                'Автоматические уведомления в Telegram/Email',
                'Жители приходят только при наличии почты',
                'Экономия времени сотрудников и жителей',
              ],
            },
            {
              icon: <ResultIcon />,
              title: 'Результат',
              description: 'Оптимизированный процесс получения почты',
              color: '#2563eb',
              details: [
                'Устранение ежедневных очередей на инфо-поинте',
                'Гарантированное получение почты при посещении',
                'Минимальные затраты времени сотрудников',
                'Полная прозрачность и отслеживание процесса',
              ],
            },
          ].map((aspect, index) => (
            <Box
              key={aspect.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
                minWidth: { xs: 'auto', md: 300 },
                maxWidth: { xs: '100%', md: 400 },
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
          От поступления письма до получения жителем лагеря — весь процесс автоматизирован
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 },
            maxWidth: { xs: '100%', md: 900 },
            mx: 'auto',
            position: 'relative',
            overflow: 'visible',
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Vertical connecting line - hide on mobile */}
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
              display: { xs: 'none', md: 'block' },
            }}
          />

          {[
            {
              id: 1,
              icon: <QrCodeIcon />,
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
              illustration: <InboxIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 2,
              icon: <CameraIcon />,
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
              illustration: <QrCodeIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 3,
              icon: <NotificationsIcon />,
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
              illustration: <PhoneIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 4,
              icon: <WalkIcon />,
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
              illustration: <PersonIcon sx={{ fontSize: 120 }} />,
            },
            {
              id: 5,
              icon: <HandshakeIcon />,
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
              illustration: <HandshakeIcon sx={{ fontSize: 120 }} />,
            },
          ].map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
              }}
            >
              {/* Mobile/Desktop responsive layout */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    md: step.side === 'left' ? 'row-reverse' : 'row',
                  },
                  alignItems: { xs: 'center', md: 'center' },
                  justifyContent: {
                    xs: 'center',
                    md: step.side === 'left' ? 'flex-end' : 'flex-start',
                  },
                  width: '100%',
                  gap: { xs: 2, md: 4 },
                }}
              >
                {/* Illustration */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    order: { xs: 1, md: step.side === 'left' ? 2 : 1 },
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box
                      sx={{
                        width: { xs: 80, sm: 100, md: 150 },
                        height: { xs: 80, sm: 100, md: 150 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}30 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: step.color,
                        border: `2px solid ${step.color}40`,
                        boxShadow: `0 4px 16px ${step.color}20`,
                        '& .MuiSvgIcon-root': {
                          fontSize: { xs: 40, sm: 60, md: 120 },
                        },
                      }}
                    >
                      {step.illustration}
                    </Box>
                  </motion.div>
                </Box>

                {/* Card */}
                <Box
                  sx={{
                    flex: 1,
                    maxWidth: { xs: '100%', md: 400 },
                    order: { xs: 2, md: step.side === 'left' ? 1 : 2 },
                  }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${step.color}20` }}
                    sx={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${step.color}10 0%, ${step.color}05 100%)`,
                      border: `2px solid ${step.color}30`,
                      position: 'relative',
                      zIndex: 3,
                      overflow: 'visible',
                      mt: { xs: 1, md: 3 },
                      mb: { xs: 1, md: 3 },
                    }}
                  >
                    {/* Step number circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: -15, md: -20 },
                        left: { xs: -15, md: step.side === 'left' ? 'auto' : -20 },
                        right: { xs: 'auto', md: step.side === 'left' ? -20 : 'auto' },
                        width: { xs: 35, md: 50 },
                        height: { xs: 35, md: 50 },
                        borderRadius: '50%',
                        bgcolor: '#ffffff',
                        color: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 3px ${step.color}`,
                        zIndex: 999,
                        border: `3px solid ${step.color}`,
                      }}
                    >
                      {step.id}
                    </Box>

                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                        <Avatar
                          sx={{
                            bgcolor: step.color,
                            mr: 2,
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            boxShadow: `0 4px 12px ${step.color}30`,
                          }}
                        >
                          {step.icon}
                        </Avatar>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', md: '1.5rem' },
                          }}
                        >
                          {step.title}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      >
                        {step.description}
                      </Typography>

                      <Box>
                        {step.details.map((detail, detailIndex) => (
                          <Box
                            key={detailIndex}
                            sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: step.color,
                                mr: 2,
                                mt: 0.7,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                            >
                              {detail}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
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

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 4 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              px: { xs: 1, sm: 0 },
            }}
          >
            {/* Telegram notification */}
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                maxWidth: { xs: '100%', sm: 350 },
                background: '#0088cc10',
                border: '1px solid #0088cc30',
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '0 0 350px' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                <Avatar
                  sx={{
                    bgcolor: '#0088cc',
                    mr: 2,
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                  }}
                >
                  <TelegramIcon />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}
                >
                  Telegram уведомление
                </Typography>
              </Box>
              <Paper
                sx={{
                  p: { xs: 1.5, md: 2 },
                  bgcolor: '#f5f5f5',
                  fontFamily: 'monospace',
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                }}
              >
                <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                  📬 <strong>Новое письмо в лагере!</strong>
                  <br />
                  Для: Иван Петров
                  <br />
                  Комната: 101
                  <br />
                  Время поступления: 14:30
                  <br />
                  <br />
                  Заберите письмо на инфо-поинте! 📮
                  <br />
                  Ваше письмо готово к получению.
                </Typography>
              </Paper>
            </Card>

            {/* Email notification */}
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                maxWidth: { xs: '100%', sm: 450 },
                background: '#dc262610',
                border: '1px solid #dc262630',
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '0 0 450px' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                <Avatar
                  sx={{
                    bgcolor: '#dc2626',
                    mr: 2,
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                  }}
                >
                  <EmailIcon />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}
                >
                  Email уведомление
                </Typography>
              </Box>

              {/* Real Email Screenshot */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e0e0e0',
                }}
              >
                <Image
                  src="/images/examples/email-notification.png"
                  alt="Пример Email уведомления жителю лагеря"
                  width={400}
                  height={300}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 2,
                  color: 'text.secondary',
                  fontStyle: 'italic',
                }}
              >
                Реальный пример Email уведомления для жителя лагеря
              </Typography>
            </Card>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
