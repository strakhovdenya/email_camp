'use client';

import React from 'react';
import { useRoomsWithLetters } from '@/hooks/useRoomsWithLetters';

export default function Home(): React.ReactElement {
  const { rooms, isLoading } = useRoomsWithLetters();

  return (
    <main className="max-w-xl mx-auto px-2 py-6 sm:px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-700">
        Email Camp
      </h1>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center">
        List of rooms and letters
      </h2>
      {isLoading ? (
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : rooms.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No rooms or letters.</div>
      ) : (
        <ul className="flex flex-col gap-4">
          {rooms.map((room) => (
            <li
              key={room.room_number}
              className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-base sm:text-lg text-gray-800">
                  Room {room.room_number}
                </span>
              </div>
              <div>
                {room.letters_count > 0 ? (
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Letters: {room.letters_count}
                  </span>
                ) : (
                  <span className="inline-block bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                    No letters
                  </span>
                )}
              </div>
              <a
                href={`/room/${room.room_number}`}
                className="ml-4 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold text-sm shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
              >
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
