'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LetterList } from '@/components/LetterList';

interface DeliverPageProps {
  params: { roomNumber: string };
}

interface Letter {
  id: number;
  room_id: number;
  created_at: string;
  delivered_at: string | null;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
  note?: string;
  photo_url?: string;
}

export default function DeliverPage({ params }: DeliverPageProps): React.ReactElement {
  const roomNumber = params.roomNumber;
  const queryClient = useQueryClient();
  const router = useRouter();

  // Получаем письма для комнаты
  const { data: letters = [] } = useQuery<Letter[]>({
    queryKey: ['letters', roomNumber],
    queryFn: async () => {
      const { data } = await supabase
        .from('letters_with_rooms')
        .select('*')
        .eq('room_number', roomNumber);
      return data || [];
    },
  });

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
    },
  });

  const count = letters.length;

  return (
    <main className="max-w-xl mx-auto px-2 py-6 sm:px-4">
      <button
        className="mb-4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
        onClick={() => router.push('/')}
      >
        ← Назад к выбору комнаты
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-blue-700 text-center">
        Выдача писем — комната {roomNumber}
      </h1>
      <div className="mb-6 text-lg text-center text-gray-700">
        Всего писем: <b>{count}</b>
      </div>
      {mutation.isError && (
        <div className="mb-4 text-center text-red-500">
          Ошибка при выдаче письма. Попробуйте еще раз.
        </div>
      )}
      <LetterList letters={letters} />
    </main>
  );
}
