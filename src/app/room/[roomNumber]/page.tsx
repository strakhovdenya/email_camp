'use client';
import React from 'react';
import { AddLetterForm } from '@/components/AddLetterForm';
import { LetterList } from '@/components/LetterList';
import { useRouter } from 'next/navigation';
import { useLettersByRoom } from '@/hooks/useLettersByRoom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ArrowLeft } from 'lucide-react';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';

interface RoomPageProps {
  params: { roomNumber: string };
}

export default function RoomPage({ params }: RoomPageProps): React.ReactElement {
  const { roomNumber } = params;
  const router = useRouter();
  const { data: letters = [] } = useLettersByRoom(roomNumber);
  const count = letters.length;

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
      {/* Room header */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center flex items-center gap-2">
          <span role="img" aria-label="room">
            🏠
          </span>{' '}
          Комната {roomNumber}
        </h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 700, fontSize: 14, ml: 1, height: 28 }}
        />
      </div>
      {/* Add letter section */}
      <motion.section
        className="mb-4 sm:mb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className="px-2 py-4 sm:px-4 sm:py-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 text-center">
              Добавить письмо
            </h2>
            <AddLetterForm onRoomNumberChange={() => {}} initialRoomNumber={roomNumber} />
          </CardContent>
        </Card>
      </motion.section>
      {/* List of letters section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className="px-2 py-4 sm:px-4 sm:py-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 text-center">
              Список писем
            </h2>
            <LetterList letters={letters} deliverLoadingId={null} />
          </CardContent>
        </Card>
      </motion.section>
    </main>
  );
}
