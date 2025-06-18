'use client';

import React from 'react';
import { DataSourceProvider } from '@/providers/DataSourceProvider';
import { Card, CardContent, Tabs, Tab, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

// Импортируем реальные компоненты приложения
import { useRoomsWithLettersDataSource } from '@/hooks/useRoomsDataSource';
import { useLettersByRoomDataSource } from '@/hooks/useLettersDataSource';
import { useUsersByRoomDataSource } from '@/hooks/useUsersDataSource';
import { Plus, Inbox } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';
import { AddLetterForm } from '@/components/AddLetterForm';
import { LetterList } from '@/components/LetterList';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';

// Создаем дефолтную тему MUI (как в основном приложении)
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Компонент главной страницы с mock данными
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
        Email Camp (Demo)
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

// Компонент для добавления письма
function MockAddLetterPage({ roomNumber }: { roomNumber: string }) {
  const { data: users = [] } = useUsersByRoomDataSource(roomNumber);

  return (
    <main className="max-w-2xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 flex items-center gap-2">
          📝 Добавить письмо в комнату {roomNumber}
        </h1>
      </div>

      {/* Информация о пользователях */}
      <Card elevation={3} className="rounded-2xl mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 text-center">Пользователи в комнате</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">Нет пользователей в комнате</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {users.map((user: { id: string; first_name: string; last_name: string }) => (
                <Chip
                  key={user.id}
                  label={`${user.first_name} ${user.last_name}`}
                  variant="outlined"
                  size="small"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Форма добавления письма */}
      <Card elevation={3} className="rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 text-center">Форма добавления письма</h2>
          <AddLetterForm onRoomNumberChange={() => {}} initialRoomNumber={roomNumber} />
        </CardContent>
      </Card>
    </main>
  );
}

// Компонент для выдачи писем
function MockDeliverPage({ roomNumber }: { roomNumber: string }) {
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const { data: users = [] } = useUsersByRoomDataSource(roomNumber);
  const pendingLetters = letters.filter(
    (letter: { status: string }) => letter.status === 'pending'
  );

  return (
    <main className="max-w-2xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2">
          📦 Выдать письма из комнаты {roomNumber}
        </h1>
        <Chip
          label={`К выдаче: ${pendingLetters.length}`}
          color="warning"
          size="small"
          sx={{ fontWeight: 700 }}
        />
      </div>

      {/* Информация о пользователях */}
      <Card elevation={3} className="rounded-2xl mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 text-center">Пользователи в комнате</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">Нет пользователей в комнате</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {users.map((user: { id: string; first_name: string; last_name: string }) => (
                <Chip
                  key={user.id}
                  label={`${user.first_name} ${user.last_name}`}
                  variant="outlined"
                  size="small"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Список писем для выдачи */}
      <Card elevation={3} className="rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 text-center">Письма к выдаче</h2>
          {pendingLetters.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Нет писем для выдачи в этой комнате</p>
          ) : (
            <LetterList letters={pendingLetters} deliverLoadingId={null} />
          )}
        </CardContent>
      </Card>
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
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Главная страница" />
          <Tab label={activeTab === 1 ? `Добавить (${selectedRoom})` : 'Добавить письмо'} />
          <Tab label={activeTab === 2 ? `Выдать (${selectedRoom})` : 'Выдать письма'} />
        </Tabs>
      </div>

      {/* Оборачиваем в DataSourceProvider с mock данными и дефолтной темой */}
      <ThemeProvider theme={defaultTheme}>
        <DataSourceProvider type="mock">
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
