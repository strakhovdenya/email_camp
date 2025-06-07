'use client';
import React, { useState, useEffect } from 'react';
import { useLetters } from '@/hooks/useLetters';
import { useMarkAsDelivered } from '@/hooks/useLetterMutations';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useWindowSize } from '@/hooks/useWindowSize';
import { MobileLettersTable } from './MobileLettersTable';
import { DesktopLettersTable } from './DesktopLettersTable';
import { LettersFilters } from './LettersFilters';
import { LetterStatusFilter } from '@/constants/letterStatus';
import { motion, AnimatePresence } from 'framer-motion';

export default function LettersPageClient() {
  const [filter, setFilter] = useState({
    id: '',
    room: '',
    recipient: '',
    status: 'all' as LetterStatusFilter,
  });
  const { data: letters = [], isLoading, refetch } = useLetters();
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;

  // Флаг маунта для устранения гидратации
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLetters = letters.filter((letter) => {
    const idMatch =
      filter.id === '' || String(letter.id).toLowerCase().includes(filter.id.toLowerCase());
    const roomMatch =
      filter.room === '' ||
      letter.rooms?.room_number?.toLowerCase().includes(filter.room.toLowerCase());
    const recipientMatch =
      filter.recipient === '' ||
      `${letter.users?.first_name ?? ''} ${letter.users?.last_name ?? ''}`
        .toLowerCase()
        .includes(filter.recipient.toLowerCase());
    const statusMatch = filter.status === 'all' || letter.status === filter.status;
    return idMatch && roomMatch && recipientMatch && statusMatch;
  });

  const { mutate: markAsDelivered } = useMarkAsDelivered();
  const [deliverLoadingId, setDeliverLoadingId] = useState<string | null>(null);

  const handleDeliver = (id: string) => {
    setDeliverLoadingId(id);
    markAsDelivered(id, {
      onSettled: () => {
        setDeliverLoadingId(null);
        refetch(); // Явный refetch после мутации
      },
    });
  };

  if (!mounted) {
    // На сервере и до маунта рендерим skeleton/заглушку
    return (
      <div className="space-y-4">
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
    <div className="space-y-4">
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
              className="container mx-auto py-8"
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
