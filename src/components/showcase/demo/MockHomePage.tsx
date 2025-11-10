'use client';

import React from 'react';
import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Plus, Inbox } from 'lucide-react';
import { useRoomsWithLettersDataSource } from '@/hooks/useRoomsDataSource';
import { LinkButton } from '@/components/ui/LinkButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';
import { mockHomePageStyles } from './MockHomePage.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface MockHomePageProps {
  onAddLetterClick: (roomNumber: string) => void;
  onDeliverClick: (roomNumber: string) => void;
}

export const MockHomePage = ({ onAddLetterClick, onDeliverClick }: MockHomePageProps) => {
  const { data: rooms = [], isLoading } = useRoomsWithLettersDataSource();
  const { t } = useLocale();

  return (
    <main className={mockHomePageStyles.container}>
      <h1 className={mockHomePageStyles.title}>{t('demo.pages.home.title')}</h1>
      <h2 className={mockHomePageStyles.subtitle}>{t('demo.pages.home.subtitle')}</h2>

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
              {t('demo.pages.home.emptyState')}
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
                title={t('demo.pages.buttons.addLetter')}
              >
                <span className="hidden sm:inline">{t('demo.pages.buttons.add')}</span>
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
                title={t('demo.pages.buttons.deliverLetters')}
              >
                <span className="hidden sm:inline">{t('demo.pages.buttons.deliver')}</span>
              </LinkButton>
            </RoomCard>
          ))}
        </motion.div>
      )}
    </main>
  );
};
