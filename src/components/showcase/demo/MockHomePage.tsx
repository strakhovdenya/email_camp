import React from 'react';
import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Plus, Inbox } from 'lucide-react';
import { useRoomsWithLettersDataSource } from '@/hooks/useRoomsDataSource';
import { LinkButton } from '@/components/ui/LinkButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';
import { mockHomePageStyles } from './MockHomePage.styles';

interface MockHomePageProps {
  onAddLetterClick: (roomNumber: string) => void;
  onDeliverClick: (roomNumber: string) => void;
}

export const MockHomePage = ({ onAddLetterClick, onDeliverClick }: MockHomePageProps) => {
  const { data: rooms = [], isLoading } = useRoomsWithLettersDataSource();

  return (
    <main className={mockHomePageStyles.container}>
      <h1 className={mockHomePageStyles.title}>Email Camp</h1>
      <h2 className={mockHomePageStyles.subtitle}>Комнаты и письма, ожидающие выдачи</h2>

      {isLoading ? (
        <div className={mockHomePageStyles.skeletonGrid}>
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
            <CardContent className={mockHomePageStyles.emptyState}>
              Нет комнат с письмами.
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={mockHomePageStyles.roomsGrid}
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
};
