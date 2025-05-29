'use client';

import React from 'react';
import { useRoomsWithLetters } from '@/hooks/useRoomsWithLetters';
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { RoomCard } from '@/components/ui/RoomCard';

export default function Home(): React.ReactElement {
  const { rooms, isLoading } = useRoomsWithLetters();

  return (
    <main className="max-w-2xl mx-auto px-2 py-8 sm:px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
        Email Camp
      </h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
        Rooms and undelivered letters
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No rooms found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.room_number} room={room}>
              <Button
                href={`/room/${room.room_number}`}
                leftIcon={<PlusIcon className="w-5 h-5" />}
                className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
                title="Add letter"
              >
                <span className="hidden sm:inline">Add letter</span>
              </Button>
              <Button
                href={`/deliver/${room.room_number}`}
                leftIcon={<InboxArrowDownIcon className="w-5 h-5" />}
                className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400"
                title="Deliver letters"
              >
                <span className="hidden sm:inline">Deliver</span>
              </Button>
            </RoomCard>
          ))}
        </div>
      )}
    </main>
  );
}
