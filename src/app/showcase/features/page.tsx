'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Paper,
  Switch,
  TextField,
  Alert,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Email as EmailIcon,
  Room as RoomIcon,
  Notifications as NotificationIcon,
  Dashboard as DashboardIcon,
  PlayArrow as PlayIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  Check as CheckIcon,
  Telegram as TelegramIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DemoCard = ({
  title,
  description,
  icon,
  color,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
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
    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
        <Avatar
          sx={{
            bgcolor: color,
            mr: 2,
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      {children}
    </CardContent>
  </Card>
);

export default function FeaturesPage() {
  const [letterStatus, setLetterStatus] = useState('pending');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('101');
  const [recipientName, setRecipientName] = useState('Иван Петров');

  // Статические значения для избежания ошибки гидратации
  const [demoStats] = useState({
    letterId: 847,
    roomLetters: { '101': 3, '102': 2, '103': 4, '104': 1 } as Record<string, number>,
    totalLetters: 87,
    deliveredToday: 15,
    pending: 8,
  });

  const handleDeliverLetter = () => {
    setLetterStatus('delivered');
    setTimeout(() => setLetterStatus('pending'), 3000);
  };

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
          Функциональность
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
          Интерактивные демо основных возможностей системы
        </Typography>
      </Box>

      {/* Interactive Demos */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, md: 4 },
          justifyContent: 'center',
          mb: { xs: 6, md: 8 },
          px: { xs: 0, sm: 1 },
        }}
      >
        {/* Letter Management Demo */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 16px)' },
            minWidth: { xs: 'auto', md: 350 },
            maxWidth: { xs: '100%', lg: 'none' },
          }}
        >
          <DemoCard
            title="Управление письмами"
            description="Добавление и отслеживание писем"
            icon={<EmailIcon />}
            color="#2563eb"
          >
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Комната"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Получатель"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
            </Box>

            <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Письмо #{demoStats.letterId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Комната {selectedRoom} • {recipientName}
                  </Typography>
                </Box>
                <Chip
                  label={letterStatus === 'pending' ? 'Ожидает' : 'Выдано'}
                  color={letterStatus === 'pending' ? 'warning' : 'success'}
                  size="small"
                />
              </Box>
            </Paper>

            <Button
              variant="contained"
              fullWidth
              onClick={handleDeliverLetter}
              disabled={letterStatus === 'delivered'}
              startIcon={letterStatus === 'delivered' ? <CheckIcon /> : <SendIcon />}
            >
              {letterStatus === 'delivered' ? 'Выдано' : 'Выдать письмо'}
            </Button>
          </DemoCard>
        </Box>

        {/* Notifications Demo */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 16px)' },
            minWidth: { xs: 'auto', md: 350 },
            maxWidth: { xs: '100%', lg: 'none' },
          }}
        >
          <DemoCard
            title="Система уведомлений"
            description="Telegram и Email уведомления"
            icon={<NotificationIcon />}
            color="#059669"
          >
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="body2">Уведомления включены</Typography>
                <Switch
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
              </Box>
            </Box>

            {notificationsEnabled && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Уведомления активны
                </Alert>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip icon={<TelegramIcon />} label="Telegram" color="primary" size="small" />
                  <Chip icon={<EmailIcon />} label="Email" color="secondary" size="small" />
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Уведомления отправляются мгновенно при получении письма
                </Typography>
              </motion.div>
            )}

            {!notificationsEnabled && <Alert severity="warning">Уведомления отключены</Alert>}
          </DemoCard>
        </Box>

        {/* Room Management Demo */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 16px)' },
            minWidth: { xs: 'auto', md: 350 },
            maxWidth: { xs: '100%', lg: 'none' },
          }}
        >
          <DemoCard
            title="Управление комнатами"
            description="Организация по комнатам"
            icon={<RoomIcon />}
            color="#7c3aed"
          >
            <Box sx={{ mb: 3 }}>
              {['101', '102', '103', '104'].map((room) => (
                <Paper
                  key={room}
                  sx={{
                    p: 2,
                    mb: 1,
                    cursor: 'pointer',
                    bgcolor: selectedRoom === room ? 'primary.light' : 'grey.50',
                    color: selectedRoom === room ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: selectedRoom === room ? 'primary.main' : 'grey.100',
                    },
                  }}
                  onClick={() => setSelectedRoom(room)}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Комната {room}
                    </Typography>
                    <Badge badgeContent={demoStats.roomLetters[room] || 0} color="error">
                      <EmailIcon />
                    </Badge>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Typography variant="caption" color="text.secondary">
              Выберите комнату для просмотра писем
            </Typography>
          </DemoCard>
        </Box>

        {/* Admin Panel Demo */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 16px)' },
            minWidth: { xs: 'auto', md: 350 },
            maxWidth: { xs: '100%', lg: 'none' },
          }}
        >
          <DemoCard
            title="Админ панель"
            description="Управление и аналитика"
            icon={<AdminIcon />}
            color="#dc2626"
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Всего писем</Typography>
                <Typography variant="h6" color="primary">
                  {demoStats.totalLetters}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Выдано сегодня</Typography>
                <Typography variant="h6" color="success.main">
                  {demoStats.deliveredToday}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Ожидают выдачи</Typography>
                <Typography variant="h6" color="warning.main">
                  {demoStats.pending}
                </Typography>
              </Box>
            </Box>

            <Button variant="outlined" fullWidth startIcon={<DashboardIcon />}>
              Открыть панель
            </Button>
          </DemoCard>
        </Box>
      </Box>

      {/* Feature Details */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 3, md: 4 },
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '3rem' },
            px: { xs: 2, sm: 0 },
          }}
        >
          Детальное описание функций
        </Typography>

        {[
          {
            title: 'Управление письмами',
            icon: <EmailIcon />,
            color: '#2563eb',
            features: [
              'Добавление новых писем с указанием получателя и комнаты',
              'Отслеживание статуса доставки в реальном времени',
              'Поиск и фильтрация по различным критериям',
              'История всех операций с письмами',
            ],
          },
          {
            title: 'Система уведомлений',
            icon: <NotificationIcon />,
            color: '#059669',
            features: [
              'Мгновенные уведомления в Telegram при получении письма',
              'Дублирование уведомлений на email',
              'Настройка индивидуальных предпочтений',
              'Статистика доставки уведомлений',
            ],
          },
          {
            title: 'Организация по комнатам',
            icon: <RoomIcon />,
            color: '#7c3aed',
            features: [
              'Автоматическая группировка писем по комнатам',
              'Быстрый переход между комнатами',
              'Счетчики непрочитанных писем',
              'Управление списком комнат и жильцов',
            ],
          },
          {
            title: 'Административная панель',
            icon: <AdminIcon />,
            color: '#dc2626',
            features: [
              'Полная статистика работы системы',
              'Управление пользователями и правами доступа',
              'Мониторинг производительности',
              'Экспорт данных и отчетов',
            ],
          },
        ].map((feature, _index) => (
          <Accordion key={feature.title} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Avatar
                  sx={{
                    bgcolor: feature.color,
                    mr: 2,
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                  }}
                >
                  {feature.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ pl: { xs: 2, md: 7 } }}>
                {feature.features.map((item, itemIndex) => (
                  <Box key={itemIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: feature.color,
                        mr: 2,
                        mt: 0.7,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Call to Action */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2563eb10 0%, #7c3aed10 100%)',
          mx: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '2.125rem' },
          }}
        >
          Готовы попробовать?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            fontSize: { xs: '0.95rem', md: '1rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          Протестируйте все функции в живом демо режиме
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayIcon />}
          sx={{
            background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
            px: { xs: 3, md: 4 },
            py: { xs: 1.2, md: 1.5 },
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          Запустить демо
        </Button>
      </Paper>
    </Container>
  );
}
