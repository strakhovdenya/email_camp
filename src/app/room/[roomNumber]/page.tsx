'use client';
import React from 'react';
import { AddLetterForm } from '@/components/AddLetterForm';
import { LetterList } from '@/components/LetterList';
import { useRouter } from 'next/navigation';
import { useRoomLetters } from '@/hooks/useRoomLetters';

interface RoomPageProps {
  params: { roomNumber: string };
}

export default function RoomPage({ params }: RoomPageProps): React.ReactElement {
  const { roomNumber } = params;
  const router = useRouter();
  const { data: letters = [] } = useRoomLetters(roomNumber);
  const count = letters.length;

  return (
    <main className="max-w-xl mx-auto px-2 py-6 sm:px-4">
      <button
        className="mb-4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
        onClick={() => router.push('/')}
      >
        ← Back to room selection
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-blue-700 text-center">
        Room {roomNumber}
      </h1>
      <div className="mb-6 text-lg text-center text-gray-700">
        Letters in room: <b>{count}</b>
      </div>
      <section className="mb-8 bg-white rounded-xl shadow-md px-4 py-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Add letter</h2>
        <AddLetterForm onRoomNumberChange={() => {}} initialRoomNumber={roomNumber} />
      </section>
      <section className="bg-white rounded-xl shadow-md px-4 py-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">List of letters</h2>
        <LetterList letters={letters} />
      </section>
    </main>
  );
}
