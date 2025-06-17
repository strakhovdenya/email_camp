'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LetterList } from '@/components/LetterList';
import { useLettersByRoomDataSource } from '@/hooks/useLettersDataSource';
import { useUsersByRoomDataSource } from '@/hooks/useUsersDataSource';
import { useLetterMutationsDataSource } from '@/hooks/useLettersDataSource';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { ArrowLeft, Funnel } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Letter } from '@/datasources/interfaces/ILetterDataSource';
import type { User } from '@/datasources/interfaces/IUserDataSource';

interface DeliverPageProps {
  params: { roomNumber: string };
}

export default function DeliverPage({ params }: DeliverPageProps): React.ReactElement {
  const roomNumber = params.roomNumber;
  const router = useRouter();
  
  // Используем новую DataSource архитектуру
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const { data: users = [] } = useUsersByRoomDataSource(roomNumber);
  const { markAsDelivered } = useLetterMutationsDataSource();
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const count = letters.length;

  // Фильтруем письма по выбранному пользователю
  const filteredLetters = selectedUserId
    ? letters.filter((letter: Letter) => String(letter.users?.id) === selectedUserId)
    : letters;

  return (
    <main className="max-w-xl mx-auto px-0 sm:px-4 py-2 sm:py-6">
      {/* Back button sticky on mobile */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md pt-2 pb-1 px-2 sm:static sm:bg-transparent sm:backdrop-blur-0">
        <button
          className="flex items-center gap-2 text-blue-600 font-semibold rounded-full px-3 py-2 hover:bg-blue-50 active:bg-blue-100 transition w-fit shadow-sm sm:mb-4"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base sm:text-lg">Назад</span>
        </button>
      </div>
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center flex items-center gap-2">
          Выдача писем — комната {roomNumber}
        </h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 700, fontSize: 14, ml: 1, height: 28 }}
        />
      </div>
      {/* User filter section */}
      <motion.section
        className="mb-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={2} className="rounded-2xl">
          <CardContent className="p-3 sm:p-4">
            <label
              htmlFor="userFilter"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <Funnel className="w-4 h-4 text-blue-400" /> Фильтр по пользователю
            </label>
            <select
              id="userFilter"
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition shadow-sm"
            >
              <option value="">Все пользователи</option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.last_name} {user.first_name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </motion.section>
      {/* Letters list */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <LetterList
          letters={filteredLetters}
          onDeliver={(id) => markAsDelivered.mutate(id)}
          deliverLoadingId={markAsDelivered.isPending ? markAsDelivered.variables : null}
        />
      </motion.section>
    </main>
  );
}
