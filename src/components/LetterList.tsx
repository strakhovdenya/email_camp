import React from 'react';
import { LetterCard } from './LetterCard';

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

interface LetterListProps {
  letters: Letter[];
}

export const LetterList: React.FC<LetterListProps> = ({ letters }): React.ReactElement => {
  if (letters.length === 0) {
    return <div className="text-gray-400 text-center py-6">Нет писем для этой комнаты</div>;
  }

  // Сортировка: сначала невыданные, потом выданные, внутри группы — новые сверху
  const sortedLetters = [...letters].sort((a, b) => {
    if (a.status === b.status) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-4">
      {sortedLetters.map((letter) => (
        <LetterCard key={letter.id} letter={letter} />
      ))}
    </div>
  );
};
