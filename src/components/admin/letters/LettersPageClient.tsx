'use client';
import React, { useState, useEffect } from 'react';
import { useLettersDataSource, useLetterMutationsDataSource } from '@/hooks/useLettersDataSource';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useWindowSize } from '@/hooks/useWindowSize';
import { MobileLettersTable } from './MobileLettersTable';
import { DesktopLettersTable } from './DesktopLettersTable';
import { LettersFilters } from './LettersFilters';
import { LetterStatusFilter } from '@/constants/letterStatus';
import { motion, AnimatePresence } from 'framer-motion';
import type { Letter } from '@/datasources/interfaces/ILetterDataSource';

export default function LettersPageClient() {
  const [filter, setFilter] = useState({
    room: '',
    recipient: '',
    status: 'all' as LetterStatusFilter,
  });
  
  // Используем DataSource архитектуру
  const { data: letters = [], isLoading } = useLettersDataSource();
  const { markAsDelivered } = useLetterMutationsDataSource();
  
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;

  // Флаг маунта для устранения гидратации
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLetters = letters.filter((letter: Letter) => {
    const roomMatch =
      filter.room === '' ||
      letter.rooms?.room_number?.toLowerCase().includes(filter.room.toLowerCase());
    const recipientMatch =
      filter.recipient === '' ||
      `${letter.users?.first_name ?? ''} ${letter.users?.last_name ?? ''}`
        .toLowerCase()
        .includes(filter.recipient.toLowerCase());
    const statusMatch = filter.status === 'all' || letter.status === filter.status;
    return roomMatch && recipientMatch && statusMatch;
  }).sort((a: Letter, b: Letter) => {
    // Сначала сортируем по статусу: pending письма идут первыми
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    
    // Затем сортируем по дате создания (новые сначала - ближе к текущему времени)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const [deliverLoadingId, setDeliverLoadingId] = useState<string | null>(null);

  const handleDeliver = async (id: string) => {
    setDeliverLoadingId(id);
    try {
      await markAsDelivered.mutateAsync(id);
    } catch (error) {
      console.error('Error delivering letter:', error);
    } finally {
      setDeliverLoadingId(null);
    }
  };

  if (!mounted) {
    // На сервере и до маунта рендерим skeleton/заглушку
    return (
      <div className="space-y-1">
        <LettersFilters filter={filter} onChange={setFilter} />
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-full max-w-2xl space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200/60 rounded-xl h-32 mb-2" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LettersFilters filter={filter} onChange={setFilter} />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-full max-w-2xl space-y-4">
            {[...Array(isMobile ? 3 : 1)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200/60 rounded-xl h-32 mb-2" />
            ))}
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            >
              <MobileLettersTable
                letters={filteredLetters}
                onDeliver={handleDeliver}
                deliverLoadingId={deliverLoadingId}
              />
            </motion.div>
          ) : (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
              className="container mx-auto py-4"
            >
              <DesktopLettersTable
                letters={filteredLetters}
                onDeliver={handleDeliver}
                deliverLoadingId={deliverLoadingId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

