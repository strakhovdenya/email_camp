'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Notifications as NotificationIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoLetter {
  id: string;
  recipient: string;
  room: string;
  status: 'pending' | 'delivered';
  createdAt: Date;
  notifications: {
    email: 'sent' | 'failed' | 'not_sent';
    telegram: 'sent' | 'failed' | 'not_sent';
  };
}

const mockUsers = [
  { name: 'Иван Петров', room: '101' },
  { name: 'Мария Сидорова', room: '102' },
  { name: 'Алексей Козлов', room: '103' },
  { name: 'Елена Морозова', room: '104' },
  { name: 'Дмитрий Волков', room: '101' },
  { name: 'Анна Лебедева', room: '102' },
];

export default function DemoPage() {
  const [letters, setLetters] = useState<DemoLetter[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Инициализация демо данных
  useEffect(() => {
    const initialLetters: DemoLetter[] = [
      {
        id: '1',
        recipient: 'Иван Петров',
        room: '101',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        notifications: { email: 'sent', telegram: 'sent' }
      },
      {
        id: '2',
        recipient: 'Мария Сидорова',
        room: '102',
        status: 'delivered',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        notifications: { email: 'sent', telegram: 'failed' }
      },
      {
        id: '3',
        recipient: 'Алексей Козлов',
        room: '103',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        notifications: { email: 'sent', telegram: 'sent' }
      }
    ];
    setLetters(initialLetters);
  }, []);

  const handleAddLetter = async () => {
    if (!selectedRecipient) {
      setNotification({ type: 'error', message: 'Выберите получателя' });
      return;
    }

    setIsLoading(true);
    
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.name === selectedRecipient);
    const newLetter: DemoLetter = {
      id: Date.now().toString(),
      recipient: selectedRecipient,
      room: user?.room || selectedRoom,
      status: 'pending',
      createdAt: new Date(),
      notifications: {
        email: Math.random() > 0.1 ? 'sent' : 'failed',
        telegram: Math.random() > 0.1 ? 'sent' : 'failed'
      }
    };

    setLetters(prev => [newLetter, ...prev]);
    setSelectedRecipient('');
    setSelectedRoom('');
    setIsLoading(false);
    setNotification({ type: 'success', message: `Письмо для ${selectedRecipient} добавлено` });
  };

  const handleDeliverLetter = async (letterId: string) => {
    setIsLoading(true);
    
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 800));

    setLetters(prev => prev.map(letter => 
      letter.id === letterId 
        ? { ...letter, status: 'delivered' as const }
        : letter
    ));

    const letter = letters.find(l => l.id === letterId);
    setIsLoading(false);
    setNotification({ type: 'success', message: `Письмо для ${letter?.recipient} выдано` });
  };

  const handleDeleteLetter = async (letterId: string) => {
    setIsLoading(true);
    
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 500));

    setLetters(prev => prev.filter(letter => letter.id !== letterId));
    setIsLoading(false);
    setNotification({ type: 'success', message: 'Письмо удалено' });
  };

  const getNotificationColor = (status: string): 'success' | 'error' | 'default' => {
    switch (status) {
      case 'sent': return 'success';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getNotificationText = (status: string) => {
    switch (status) {
      case 'sent': return 'Отправлено';
      case 'failed': return 'Ошибка';
      default: return 'Не отправлено';
    }
  };

  // Автоматическое скрытие уведомлений
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const pendingCount = letters.filter(l => l.status === 'pending').length;
  const deliveredCount = letters.filter(l => l.status === 'delivered').length;

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
          Живое демо
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}
        >
          Интерактивная демонстрация системы управления почтой
        </Typography>
        <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
          Это демо режим. Все данные являются тестовыми и не сохраняются.
        </Alert>
      </Box>

      {/* Stats */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3,
          justifyContent: 'center',
          mb: 6,
          flexWrap: 'wrap'
        }}
      >
        <Card sx={{ minWidth: 200, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h4" color="warning.main" sx={{ fontWeight: 800 }}>
              {pendingCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ожидают выдачи
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: 800 }}>
              {deliveredCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Выдано
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>
              {letters.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Всего писем
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Add Letter Form */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Добавить новое письмо
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'end' }}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Получатель</InputLabel>
            <Select
              value={selectedRecipient}
              onChange={(e) => {
                setSelectedRecipient(e.target.value);
                const user = mockUsers.find(u => u.name === e.target.value);
                if (user) setSelectedRoom(user.room);
              }}
              label="Получатель"
            >
              {mockUsers.map((user) => (
                <MenuItem key={user.name} value={user.name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" />
                    {user.name}
                    <Chip label={`Комната ${user.room}`} size="small" />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Комната"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            sx={{ minWidth: 120 }}
            disabled={!!selectedRecipient}
          />

          <Button
            variant="contained"
            onClick={handleAddLetter}
            disabled={isLoading || !selectedRecipient}
            startIcon={isLoading ? <RefreshIcon className="animate-spin" /> : <AddIcon />}
            sx={{ px: 3, py: 1.5 }}
          >
            {isLoading ? 'Добавление...' : 'Добавить письмо'}
          </Button>
        </Box>
      </Paper>

      {/* Loading Bar */}
      {isLoading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ marginBottom: 16 }}
          >
            <Alert 
              severity={notification.type}
              onClose={() => setNotification(null)}
            >
              {notification.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letters List */}
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Список писем ({letters.length})
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnimatePresence>
            {letters.map((letter) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    background: letter.status === 'delivered' 
                      ? 'linear-gradient(135deg, #05966910 0%, #05966905 100%)'
                      : 'linear-gradient(135deg, #f59e0b10 0%, #f59e0b05 100%)',
                    border: letter.status === 'delivered' 
                      ? '1px solid #05966930'
                      : '1px solid #f59e0b30',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <EmailIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {letter.recipient}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Комната {letter.room} • {letter.createdAt.toLocaleString('ru-RU')}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip
                            label={letter.status === 'pending' ? 'Ожидает выдачи' : 'Выдано'}
                            color={letter.status === 'pending' ? 'warning' : 'success'}
                            size="small"
                          />
                          <Chip
                            icon={<EmailIcon />}
                            label={getNotificationText(letter.notifications.email)}
                            color={getNotificationColor(letter.notifications.email)}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<NotificationIcon />}
                            label={getNotificationText(letter.notifications.telegram)}
                            color={getNotificationColor(letter.notifications.telegram)}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {letter.status === 'pending' && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleDeliverLetter(letter.id)}
                            disabled={isLoading}
                            startIcon={<CheckIcon />}
                            size="small"
                          >
                            Выдать
                          </Button>
                        )}
                        <Tooltip title="Удалить письмо">
                          <IconButton
                            onClick={() => handleDeleteLetter(letter.id)}
                            disabled={isLoading}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {letters.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <EmailIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Писем пока нет
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Добавьте первое письмо, используя форму выше
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Demo Info */}
      <Paper sx={{ p: 4, mt: 6, background: 'linear-gradient(135deg, #2563eb10 0%, #7c3aed10 100%)' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Возможности демо
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'center'
          }}
        >
          {[
            'Добавление новых писем',
            'Отметка о выдаче',
            'Отслеживание уведомлений',
            'Удаление писем',
            'Real-time обновления',
            'Анимации интерфейса'
          ].map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
} 