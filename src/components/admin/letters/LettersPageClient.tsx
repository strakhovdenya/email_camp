'use client';
import React, { useState } from 'react';
import { useLetters } from '@/hooks/useLetters';
import { useMarkAsDelivered } from '@/hooks/useLetterMutations';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useWindowSize } from '@/hooks/useWindowSize';
import { MobileLettersTable } from './MobileLettersTable';
import { DesktopLettersTable } from './DesktopLettersTable';
import { LettersFilters } from './LettersFilters';
import { LetterStatusFilter } from '@/constants/letterStatus';

export default function LettersPageClient() {
  const [filter, setFilter] = useState({
    id: '',
    room: '',
    recipient: '',
    status: 'all' as LetterStatusFilter,
  });
  const { data: letters = [], isLoading } = useLetters();
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;

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
      onSettled: () => setDeliverLoadingId(null),
    });
  };

  return (
    <div className="space-y-4">
      <LettersFilters filter={filter} onChange={setFilter} />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <>
          {isMobile ? (
            <MobileLettersTable
              letters={filteredLetters}
              onDeliver={handleDeliver}
              deliverLoadingId={deliverLoadingId}
            />
          ) : (
            <div className="container mx-auto py-8">
              <DesktopLettersTable
                letters={filteredLetters}
                onDeliver={handleDeliver}
                deliverLoadingId={deliverLoadingId}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
