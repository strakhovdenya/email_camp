'use client';

import React from 'react';
import { useRoomsWithLetters } from '@/hooks/useRoomsWithLetters';
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : rooms.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No rooms found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room) => (
            <div
              key={room.room_number}
              className="bg-white rounded-2xl shadow-md px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="font-bold text-lg text-gray-900 truncate">
                  Room {room.room_number}
                </span>
                <span className="inline-flex items-center gap-2 mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      room.pending_count > 0
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}
                  >
                    {room.pending_count > 0 ? `${room.pending_count} undelivered` : 'All delivered'}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/room/${room.room_number}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                  title="Add letter"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Add letter</span>
                </Link>
                <Link
                  href={`/deliver/${room.room_number}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition"
                  title="Deliver letters"
                >
                  <InboxArrowDownIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Deliver</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
