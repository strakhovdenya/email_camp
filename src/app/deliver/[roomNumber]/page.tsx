'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LetterList } from '@/components/LetterList';
import { useLettersByRoom } from '@/hooks/useLettersByRoom';
import { useUsersByRoom } from '@/hooks/useUsersByRoom';
import { useMarkAsDelivered } from '@/hooks/useLetterMutations';

interface DeliverPageProps {
  params: { roomNumber: string };
}

export default function DeliverPage({ params }: DeliverPageProps): React.ReactElement {
  const roomNumber = params.roomNumber;
  const router = useRouter();
  const { data: letters = [] } = useLettersByRoom(roomNumber);
  const { data: users = [] } = useUsersByRoom(roomNumber);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const count = letters.length;

  // Фильтруем письма по выбранному пользователю
  const filteredLetters = selectedUserId
    ? letters.filter((letter) => String(letter.users?.id) === selectedUserId)
    : letters;

  const mutation = useMarkAsDelivered(roomNumber);

  return (
    <main className="max-w-xl mx-auto px-2 py-6 sm:px-4">
      <button
        className="mb-4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
        onClick={() => router.push('/')}
      >
        ← Back to room selection
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-blue-700 text-center">
        Deliver letters — room {roomNumber}
      </h1>
      <div className="mb-6 text-lg text-center text-gray-700">
        Total letters: <b>{count}</b>
      </div>
      <div className="mb-4">
        <label htmlFor="userFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by user
        </label>
        <select
          id="userFilter"
          value={selectedUserId ?? ''}
          onChange={(e) => setSelectedUserId(e.target.value || null)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition shadow-sm"
        >
          <option value="">All users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.last_name} {user.first_name}
            </option>
          ))}
        </select>
      </div>
      <LetterList
        letters={filteredLetters}
        onDeliver={(id) => mutation.mutate(id)}
        deliverLoadingId={mutation.isPending ? mutation.variables : null}
      />
    </main>
  );
}
