'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DeliverPageProps {
  params: { roomNumber: string };
}

interface Letter {
  id: number;
  status: string;
  delivered_at?: string;
  // add other fields as needed
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

  const pending = letters.filter((l) => l.status === 'pending');
  const delivered = letters.filter((l) => l.status === 'delivered');
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
      <section className="mb-8 bg-white rounded-xl shadow-md px-4 py-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Неполученные письма
        </h2>
        {pending.length === 0 ? (
          <div className="text-center text-gray-400">Нет неполученных писем</div>
        ) : (
          <ul>
            {pending.map((letter) => (
              <li
                key={letter.id}
                className="mb-2 p-2 border rounded bg-white flex justify-between items-center"
              >
                <span>Письмо #{letter.id}</span>
                <button
                  className="btn"
                  onClick={() => {
                    console.log('Выдача письма', letter.id);
                    mutation.mutate(letter.id);
                  }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Выдача...' : 'Выдать'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="bg-white rounded-xl shadow-md px-4 py-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Полученные письма</h2>
        {delivered.length === 0 ? (
          <div className="text-center text-gray-300">Нет полученных писем</div>
        ) : (
          <ul>
            {delivered.map((letter) => (
              <li key={letter.id} className="mb-2 p-2 border rounded bg-gray-100 text-gray-400">
                <span>Письмо #{letter.id}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
