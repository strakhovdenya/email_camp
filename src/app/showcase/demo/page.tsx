'use client';

import React from 'react';
import { DataSourceProvider } from '@/providers/DataSourceProvider';
import { Card, CardContent, Tabs, Tab, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

// Импортируем реальные компоненты приложения
import { useRoomsWithLettersDataSource } from '@/hooks/useRoomsDataSource';
import {
  useLettersByRoomDataSource,
  useLetterMutationsDataSource,
} from '@/hooks/useLettersDataSource';
import { useUsersByRoomDataSource } from '@/hooks/useUsersDataSource';
import { Plus, Inbox } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';
import { AddLetterForm } from '@/components/AddLetterForm';
import { LetterList } from '@/components/LetterList';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { MockDataSource } from '@/datasources/mock/MockDataSource';

// Создаем дефолтную тему MUI (как в основном приложении)
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Создаем глобальный экземпляр MockDataSource для демо
const demoMockDataSource = new MockDataSource();

// Компонент главной страницы с mock данными (точная копия основного приложения)
function MockHomePage({
  onAddLetterClick,
  onDeliverClick,
}: {
  onAddLetterClick: (roomNumber: string) => void;
  onDeliverClick: (roomNumber: string) => void;
}) {
  const { data: rooms = [], isLoading } = useRoomsWithLettersDataSource();

  return (
    <main className="max-w-2xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-center text-blue-700 tracking-tight">
        Email Camp
      </h1>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700 text-center">
        Комнаты и письма, ожидающие выдачи
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card elevation={2} className="rounded-2xl">
            <CardContent className="py-8 text-center text-gray-500 text-lg">
              Нет комнат с письмами.
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6"
        >
          {rooms.map((room) => (
            <RoomCard key={room.room_number} room={room}>
              <LinkButton
                href={`/room/${room.room_number}`}
                leftIcon={<Plus className="w-5 h-5" />}
                color="primary"
                variant="contained"
                size="small"
                className="min-w-[44px]"
                onClick={(e) => {
                  e.preventDefault();
                  onAddLetterClick(room.room_number);
                }}
                title="Добавить письмо"
              >
                <span className="hidden sm:inline">Добавить</span>
              </LinkButton>
              <LinkButton
                href={`/deliver/${room.room_number}`}
                leftIcon={<Inbox className="w-5 h-5" />}
                color="success"
                variant="contained"
                size="small"
                className="min-w-[44px]"
                onClick={(e) => {
                  e.preventDefault();
                  onDeliverClick(room.room_number);
                }}
                title="Выдать письма"
              >
                <span className="hidden sm:inline">Выдать</span>
              </LinkButton>
            </RoomCard>
          ))}
        </motion.div>
      )}
    </main>
  );
}

// Компонент для добавления письма (точная копия основного приложения)
function MockAddLetterPage({ roomNumber }: { roomNumber: string }) {
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const count = letters.length;

  return (
    <main className="max-w-xl mx-auto px-0 sm:px-4 py-2 sm:py-6">
      {/* Room header */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center flex items-center gap-2">
          <span role="img" aria-label="room">
            🏠
          </span>{' '}
          Комната {roomNumber}
        </h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 700, fontSize: 14, ml: 1, height: 28 }}
        />
      </div>
      {/* Add letter section */}
      <motion.section
        className="mb-4 sm:mb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className="px-2 py-4 sm:px-4 sm:py-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 text-center">
              Добавить письмо
            </h2>
            <AddLetterForm onRoomNumberChange={() => {}} initialRoomNumber={roomNumber} />
          </CardContent>
        </Card>
      </motion.section>
      {/* List of letters section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className="px-2 py-4 sm:px-4 sm:py-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 text-center">
              Список писем
            </h2>
            <LetterList letters={letters} deliverLoadingId={null} />
          </CardContent>
        </Card>
      </motion.section>
    </main>
  );
}

// Компонент для выдачи писем (идентичен основному приложению)
function MockDeliverPage({ roomNumber }: { roomNumber: string }) {
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const { data: users = [] } = useUsersByRoomDataSource(roomNumber);
  const { markAsDelivered } = useLetterMutationsDataSource();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const count = letters.length;

  // Фильтруем письма по выбранному пользователю
  const filteredLetters = selectedUserId
    ? letters.filter((letter) => String(letter.user_id) === selectedUserId)
    : letters;

  return (
    <main className="max-w-xl mx-auto px-0 sm:px-4 py-2 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center flex items-center gap-2">
          Выдача писем — комната {roomNumber}
        </h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 700, fontSize: 14, ml: 1, height: 28 }}
        />
      </div>

      {/* User filter section */}
      <motion.section
        className="mb-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={2} className="rounded-2xl">
          <CardContent className="p-3 sm:p-4">
            <label
              htmlFor="userFilter"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <span className="w-4 h-4 text-blue-400">🔽</span> Фильтр по пользователю
            </label>
            <select
              id="userFilter"
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition shadow-sm"
            >
              <option value="">Все пользователи</option>
              {users.map((user: { id: string; first_name: string; last_name: string }) => (
                <option key={user.id} value={user.id}>
                  {user.last_name} {user.first_name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </motion.section>

      {/* Letters list */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <LetterList
          letters={filteredLetters}
          onDeliver={(id) => markAsDelivered.mutate(id)}
          deliverLoadingId={markAsDelivered.isPending ? markAsDelivered.variables : null}
        />
      </motion.section>
    </main>
  );
}

// Основной компонент demo страницы
export default function DemoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('101');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddLetterClick = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setActiveTab(1); // Переключаем на таб добавления
  };

  const handleDeliverClick = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setActiveTab(2); // Переключаем на таб выдачи
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-blue-700">
        Демо приложения
      </h1>

      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent>
          <p className="text-center text-blue-800">
            <strong>Это демо версия приложения с mock данными.</strong>
            <br />
            Здесь используются реальные компоненты приложения, но данные берутся из локального mock
            источника.
          </p>
        </CardContent>
      </Card>

      <div className="border-b border-gray-200 mb-6">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minWidth: 'auto',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              padding: { xs: '8px 4px', sm: '12px 16px' },
            },
          }}
        >
          <Tab
            label={
              <span>
                <span className="hidden sm:inline">Главная страница</span>
                <span className="sm:hidden">Главная</span>
              </span>
            }
          />
          <Tab
            label={
              <span>
                <span className="hidden sm:inline">
                  {activeTab === 1 ? `Добавить (${selectedRoom})` : 'Добавить письмо'}
                </span>
                <span className="sm:hidden">
                  {activeTab === 1 ? `➕ ${selectedRoom}` : 'Добавить'}
                </span>
              </span>
            }
          />
          <Tab
            label={
              <span>
                <span className="hidden sm:inline">
                  {activeTab === 2 ? `Выдать (${selectedRoom})` : 'Выдать письма'}
                </span>
                <span className="sm:hidden">
                  {activeTab === 2 ? `📦 ${selectedRoom}` : 'Выдать'}
                </span>
              </span>
            }
          />
        </Tabs>
      </div>

      {/* Оборачиваем в DataSourceProvider с mock данными и дефолтной темой */}
      <ThemeProvider theme={defaultTheme}>
        <DataSourceProvider type="mock" instance={demoMockDataSource}>
          {activeTab === 0 && (
            <MockHomePage
              onAddLetterClick={handleAddLetterClick}
              onDeliverClick={handleDeliverClick}
            />
          )}
          {activeTab === 1 && <MockAddLetterPage roomNumber={selectedRoom} />}
          {activeTab === 2 && <MockDeliverPage roomNumber={selectedRoom} />}
        </DataSourceProvider>
      </ThemeProvider>

      <Card className="mt-8 bg-green-50 border-green-200">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2 text-green-800">Особенности демо:</h2>
          <div className="text-sm text-green-700 space-y-1">
            <div>• Используются реальные компоненты: RoomCard, AddLetterForm, LetterList</div>
            <div>• Данные берутся из MockDataSource (локальные демо-данные)</div>
            <div>• Все хуки работают через DataSource паттерн</div>
            <div>
              • Кнопка &quot;Добавить&quot; переводит на форму добавления письма для комнаты
            </div>
            <div>• Кнопка &quot;Выдать&quot; переводит на страницу выдачи писем для комнаты</div>
            <div>• Форма добавления письма полностью функциональна</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
