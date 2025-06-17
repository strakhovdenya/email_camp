'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Chip,
  Paper,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Smartphone as SmartphoneIcon,
  Computer as ComputerIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { DataSourceProvider } from '@/providers/DataSourceProvider';
import DataSourceExample from '@/components/DataSourceExample';

// Mock данные
interface MockLetter {
  id: string;
  user_id: string;
  status: 'pending' | 'delivered';
  created_at: string;
  delivered_at?: string;
  note?: string;
  room_number: string;
  users?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface MockUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  room_number: string;
}

const mockUsers: MockUser[] = [
      {
        id: '1',
    first_name: 'Иван',
    last_name: 'Петров',
    email: 'ivan@example.com',
    room_number: '101',
      },
      {
        id: '2',
    first_name: 'Мария',
    last_name: 'Сидорова',
    email: 'maria@example.com',
    room_number: '102',
      },
      {
        id: '3',
    first_name: 'Алексей',
    last_name: 'Козлов',
    email: 'alexey@example.com',
    room_number: '103',
  },
  {
    id: '4',
    first_name: 'Елена',
    last_name: 'Морозова',
    email: 'elena@example.com',
    room_number: '104',
  },
  {
    id: '5',
    first_name: 'Дмитрий',
    last_name: 'Волков',
    email: 'dmitry@example.com',
    room_number: '101',
  },
];

// TabPanel компонент
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: '4px', md: 3 } }}>{children}</Box>}
    </div>
  );
}

// Демо форма добавления письма с дизайном реального приложения
const DemoLetterForm: React.FC<{
  onRoomNumberChange: (room: string) => void;
  initialRoomNumber: string;
  onLetterAdded: (letter: MockLetter) => void;
}> = ({ onRoomNumberChange, initialRoomNumber, onLetterAdded }) => {
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber);
  const [note, setNote] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableUsers = mockUsers.filter((user) => user.room_number === roomNumber);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!roomNumber.trim() || !selectedUserId) return;

    setIsSubmitting(true);

    // Симуляция API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.id === selectedUserId);
    const newLetter: MockLetter = {
      id: Date.now().toString(),
      user_id: selectedUserId,
      status: 'pending',
      created_at: new Date().toISOString(),
      note: note.trim() || undefined,
      room_number: roomNumber,
      users: user,
    };

    onLetterAdded(newLetter);
    onRoomNumberChange(roomNumber);
    setNote('');
    setSelectedUserId(null);
    setIsSubmitting(false);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ mb: 2 }}>
        <Typography
              variant="body2"
          color="text.secondary"
              sx={{ mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
        >
              Номер комнаты
        </Typography>
            <Box
              component="input"
              type="text"
              value={roomNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomNumber(e.target.value)}
              required
        sx={{ 
                width: '100%',
                p: { xs: 1, md: 1.5 },
                border: '1px solid #d1d5db',
                borderRadius: 1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                '&:focus': {
                  outline: 'none',
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 1px #3b82f6',
                },
              }}
              placeholder="Введите номер комнаты"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            >
              Описание письма (по желанию)
            </Typography>
            <Box
              component="textarea"
              value={note}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
              rows={2}
              maxLength={100}
              sx={{
                width: '100%',
                p: { xs: 1, md: 1.5 },
                border: '1px solid #d1d5db',
                borderRadius: 1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                resize: 'vertical',
                fontFamily: 'inherit',
                '&:focus': {
                  outline: 'none',
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 1px #3b82f6',
                },
              }}
              placeholder="Например: для мамы, от бабушки..."
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            >
              Получатель
            </Typography>
            <Box
              component="select"
              value={selectedUserId ?? ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedUserId(e.target.value as string | null)
              }
              required
              disabled={!roomNumber || availableUsers.length === 0}
              sx={{
                width: '100%',
                p: { xs: 1, md: 1.5 },
                border: '1px solid #d1d5db',
                borderRadius: 1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                backgroundColor: !roomNumber || availableUsers.length === 0 ? '#f9fafb' : 'white',
                '&:focus': {
                  outline: 'none',
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 1px #3b82f6',
                },
              }}
            >
              <option value="" disabled>
                {!roomNumber
                  ? 'Сначала укажите комнату'
                  : availableUsers.length === 0
                    ? 'Нет жильцов в этой комнате'
                    : 'Выберите получателя'}
              </option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.last_name} {user.first_name} ({user.email})
                </option>
              ))}
            </Box>
          </Box>
        </CardContent>

        <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !roomNumber.trim() || !selectedUserId}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              fontSize: { xs: '0.875rem', md: '1rem' },
              background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              },
            }}
          >
            {isSubmitting ? 'Добавление...' : 'Добавить письмо'}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

// Демо список писем с дизайном реального приложения
const DemoLetterList: React.FC<{
  letters: MockLetter[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}> = ({ letters, onDeliver, deliverLoadingId }) => {
  const [showPending, setShowPending] = useState(true);
  const [showDelivered, setShowDelivered] = useState(false);

  if (letters.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <EmailIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          Нет писем для этой комнаты
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Добавьте первое письмо, используя форму слева
        </Typography>
      </Paper>
    );
  }

  const pending = letters.filter((l) => l.status === 'pending');
  const delivered = letters.filter((l) => l.status === 'delivered');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Ожидающие письма */}
      <Box>
        <Button
          fullWidth
          variant="text"
          sx={{
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: { xs: '1rem', md: '1.125rem' },
            mb: 1,
            color: '#1e293b',
          }}
          onClick={() => setShowPending((v) => !v)}
          endIcon={
            <Box
              component="span"
              sx={{
                transition: 'transform 0.2s',
                transform: showPending ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              ▶
            </Box>
          }
        >
          Ожидают доставки: {pending.length}
        </Button>
        <AnimatePresence initial={false}>
          {showPending && (
              <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {pending.map((letter) => (
                <Card
                    key={letter.id}
                    sx={{ border: '1px solid #f59e0b30', backgroundColor: '#f59e0b05' }}
                  >
                    <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                      <Box
                  sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                        }}
                      >
                      <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 600 }}
                          >
                            {letter.users?.last_name} {letter.users?.first_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            {letter.users?.email} • Комната {letter.room_number}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            {new Date(letter.created_at).toLocaleString('ru-RU')}
                            </Typography>
                          {letter.note && (
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                fontStyle: 'italic',
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                              }}
                            >
                              {letter.note}
                            </Typography>
                          )}
                        </Box>
                          <Button
                          onClick={() => onDeliver(letter.id)}
                          disabled={deliverLoadingId !== null}
                            variant="contained"
                            color="success"
                            size="small"
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            minWidth: { xs: 80, md: 120 },
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                          }}
                        >
                          {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать'}
                          </Button>
                    </Box>
                  </CardContent>
                </Card>
            ))}
        </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Выданные письма */}
      <Box>
        <Button
          fullWidth
          variant="text"
          sx={{ 
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: { xs: '1rem', md: '1.125rem' },
            mb: 1,
            color: '#1e293b',
          }}
          onClick={() => setShowDelivered((v) => !v)}
          endIcon={
            <Box
              component="span"
              sx={{
                transition: 'transform 0.2s',
                transform: showDelivered ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              ▶
            </Box>
          }
        >
          Полученные письма: {delivered.length}
        </Button>
        <AnimatePresence initial={false}>
          {showDelivered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {delivered.map((letter) => (
                  <Card
                    key={letter.id}
                    sx={{ border: '1px solid #05966930', backgroundColor: '#05966905' }}
                  >
                    <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 600 }}
                      >
                        {letter.users?.last_name} {letter.users?.first_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        {letter.users?.email} • Комната {letter.room_number}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        Выдано:{' '}
                        {letter.delivered_at
                          ? new Date(letter.delivered_at).toLocaleString('ru-RU')
                          : 'Неизвестно'}
                      </Typography>
                      {letter.note && (
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            fontStyle: 'italic',
                            fontSize: { xs: '0.8rem', md: '0.875rem' },
                          }}
                        >
                          {letter.note}
                        </Typography>
                      )}
            <Chip
                        label="Выдано"
                        color="success"
                        size="small"
                        sx={{ mt: 1, fontSize: { xs: '0.6rem', md: '0.75rem' } }}
                      />
                    </CardContent>
                  </Card>
          ))}
        </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

// Главный компонент демо
export default function DemoPage() {
  const [letters, setLetters] = useState<MockLetter[]>([]);
  const [currentRoom, setCurrentRoom] = useState('101');
  const [tabValue, setTabValue] = useState(0);
  const [deliverLoadingId, setDeliverLoadingId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState(false);

  // Инициализация демо данных
  useEffect(() => {
    const initialLetters: MockLetter[] = [
      {
        id: '1',
        user_id: '1',
        status: 'pending',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        note: 'От бабушки',
        room_number: '101',
        users: mockUsers[0],
      },
      {
        id: '2',
        user_id: '2',
        status: 'delivered',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        delivered_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        room_number: '102',
        users: mockUsers[1],
      },
      {
        id: '3',
        user_id: '3',
        status: 'pending',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        note: 'Важный документ',
        room_number: '103',
        users: mockUsers[2],
      },
    ];
    setLetters(initialLetters);
  }, []);

  const handleLetterAdded = (newLetter: MockLetter) => {
    setLetters((prev) => [newLetter, ...prev]);
  };

  const handleDeliver = async (letterId: string) => {
    setDeliverLoadingId(letterId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLetters((prev) =>
      prev.map((letter) =>
      letter.id === letterId 
          ? { ...letter, status: 'delivered' as const, delivered_at: new Date().toISOString() }
        : letter
      )
    );

    setDeliverLoadingId(null);
  };

  const filteredLetters = letters.filter((letter) => letter.room_number === currentRoom);

  const pendingCount = letters.filter((l) => l.status === 'pending').length;
  const deliveredCount = letters.filter((l) => l.status === 'delivered').length;

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 0.5, md: 4 },
        px: { xs: 0, sm: 1, md: 3 },
        width: '100%',
        maxWidth: { xs: '100vw', md: 'xl' },
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 6 }, px: { xs: '4px', md: 0 } }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: { xs: 0.5, md: 2 },
            fontWeight: 800,
            fontSize: { xs: '1.3rem', sm: '2.5rem', md: '3.5rem' },
          }}
        >
          Живое демо
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            mb: { xs: 1, md: 3 },
            fontSize: { xs: '0.75rem', md: '1.25rem' },
          }}
        >
          Интерактивная демонстрация с реальным интерфейсом
        </Typography>
        <Alert
          severity="info"
          sx={{
            maxWidth: { xs: '100%', md: 600 },
            mx: 'auto',
            fontSize: { xs: '0.7rem', md: '0.875rem' },
          }}
        >
          Демо использует упрощенные компоненты с дизайном реального приложения
        </Alert>
      </Box>

      {/* Stats */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: '4px', md: 3 },
          justifyContent: 'center',
          mb: { xs: 1, md: 6 },
          px: { xs: '4px', md: 0 },
        }}
      >
        <Card sx={{ textAlign: 'center' }}>
          <CardContent sx={{ p: { xs: '8px', md: 2 } }}>
            <Typography
              variant="h4"
              color="warning.main"
              sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '2.125rem' } }}
            >
              {pendingCount}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
            >
              Ожидают
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: 'center' }}>
          <CardContent sx={{ p: { xs: '8px', md: 2 } }}>
            <Typography
              variant="h4"
              color="success.main"
              sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '2.125rem' } }}
            >
              {deliveredCount}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
            >
              Выдано
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: 'center' }}>
          <CardContent sx={{ p: { xs: '8px', md: 2 } }}>
            <Typography
              variant="h4"
              color="primary.main"
              sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '2.125rem' } }}
            >
              {letters.length}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
            >
              Всего
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* View Options */}
      <Paper sx={{ mb: { xs: 1, md: 4 }, p: { xs: '4px', md: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
            Просмотр интерфейса
        </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={mobileView}
                onChange={(e) => setMobileView(e.target.checked)}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {mobileView ? (
                  <SmartphoneIcon fontSize="small" />
                ) : (
                  <ComputerIcon fontSize="small" />
                )}
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}>
                  {mobileView ? 'Мобильный' : 'Десктоп'}
                </Typography>
                  </Box>
            }
          />
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: { xs: 1, md: 4 }, overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: { xs: '0.7rem', md: '1rem' },
              minWidth: { xs: 60, md: 'auto' },
            },
          }}
        >
          <Tab icon={<EmailIcon />} label="Управление письмами" />
          <Tab icon={<PeopleIcon />} label="Информация жильцов" />
          <Tab icon={<DashboardIcon />} label="Админ панель" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 1, md: 3 },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1rem', md: '1.5rem' } }}
            >
              Добавить письмо
            </Typography>
            <DemoLetterForm
              onRoomNumberChange={setCurrentRoom}
              initialRoomNumber={currentRoom}
              onLetterAdded={handleLetterAdded}
            />
          </Box>

      <Box>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1rem', md: '1.5rem' } }}
            >
              Письма в комнате {currentRoom}
            </Typography>
            <Box sx={{ maxHeight: { xs: 400, md: 600 }, overflow: 'auto' }}>
              <DemoLetterList
                letters={filteredLetters}
                onDeliver={handleDeliver}
                deliverLoadingId={deliverLoadingId}
              />
            </Box>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Информация о жильцах
        </Typography>
        <Box
                  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 1, md: 2 },
          }}
            >
              {mockUsers.map((user) => (
            <Card key={user.id}>
              <CardContent sx={{ p: { xs: '8px', md: 2 } }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                >
                  {user.email}
                            </Typography>
                          <Chip
                  label={`Комната ${user.room_number}`}
                            size="small"
                  sx={{ mt: 1, fontSize: { xs: '0.6rem', md: '0.75rem' } }}
                />
                  </CardContent>
                </Card>
            ))}
                  </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Демо админ панели
            </Typography>
        <Alert severity="info" sx={{ mb: 2, fontSize: { xs: '0.7rem', md: '0.875rem' } }}>
          В реальном приложении здесь находится полноценная админ панель для управления
          пользователями и системой
        </Alert>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            'Управление пользователями',
            'Настройки уведомлений',
            'Статистика системы',
            'Журнал действий',
            'Резервное копирование',
          ].map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              variant="outlined"
              sx={{ fontSize: { xs: '0.6rem', md: '0.75rem' } }}
            />
          ))}
      </Box>
      </TabPanel>

      {/* Demo Features */}
      <Paper
        sx={{
          p: { xs: '8px', md: 4 },
          mt: { xs: 1, md: 6 },
          background: 'linear-gradient(135deg, #2563eb10 0%, #7c3aed10 100%)',
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Возможности демо
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: { xs: '4px', md: 2 },
            justifyContent: 'center',
          }}
        >
          {[
            'Интерактивные формы',
            'Анимации и переходы',
            'Адаптивный дизайн',
            'Реалистичный UI',
            'Mock данные',
            'Симуляция API',
          ].map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', md: '0.75rem' } }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
} 
