'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LetterList } from '@/components/LetterList';
import toast from 'react-hot-toast';
import { useRoomLetters } from '@/hooks/useRoomLetters';
import { useUsers } from '@/hooks/useUsers';

interface DeliverPageProps {
  params: { roomNumber: string };
}

export default function DeliverPage({ params }: DeliverPageProps): React.ReactElement {
  const roomNumber = params.roomNumber;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: letters = [] } = useRoomLetters(roomNumber);
  const { data: users = [] } = useUsers(roomNumber);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const count = letters.length;

  // Фильтруем письма по выбранному пользователю
  const filteredLetters = selectedUserId
    ? letters.filter((letter) => letter.user_id === selectedUserId)
    : letters;

  // Мутация для выдачи письма
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await supabase
        .from('letters')
        .update({ status: 'delivered', delivered_at: new Date().toISOString() })
        .eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters', roomNumber] });
      toast.success('Letter delivered!');
    },
  });

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
          onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
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
      {mutation.isError && (
        <div className="mb-4 text-center text-red-500">
          Error delivering letter. Please try again.
        </div>
      )}
      <LetterList
        letters={filteredLetters}
        onDeliver={(id) => mutation.mutate(id)}
        deliverLoading={mutation.isPending}
      />
    </main>
  );
}
