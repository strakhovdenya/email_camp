'use client';

import React from 'react';
import { useRoomsWithLetters } from '@/hooks/useRoomsWithLetters';
import { Plus, Inbox } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';

export default function Home(): React.ReactElement {
  const { data: rooms = [], isLoading } = useRoomsWithLetters();

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
