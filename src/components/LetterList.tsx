import React, { useState } from 'react';
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
  onDeliver?: (id: number) => void;
  deliverLoading?: boolean;
}

export const LetterList: React.FC<LetterListProps> = ({
  letters,
  onDeliver,
  deliverLoading,
}): React.ReactElement => {
  const [showPending, setShowPending] = useState(true);
  const [showDelivered, setShowDelivered] = useState(false);

  if (letters.length === 0) {
    return <div className="text-gray-400 text-center py-6">Нет писем для этой комнаты</div>;
  }

  const pending = letters
    .filter((l) => l.status === 'pending')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const delivered = letters
    .filter((l) => l.status === 'delivered')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="flex flex-col gap-8">
      <div>
        <button
          type="button"
          className="w-full flex items-center justify-between text-lg font-semibold mb-3 text-gray-800 focus:outline-none"
          onClick={() => setShowPending((v) => !v)}
        >
          Ожидают доставки
          <span className={`transition-transform ${showPending ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showPending &&
          (pending.length === 0 ? (
            <div className="text-center text-gray-400">Нет писем, ожидающих доставки</div>
          ) : (
            <div className="flex flex-col gap-4">
              {pending.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  onDeliver={onDeliver ? () => onDeliver(letter.id) : undefined}
                  deliverLoading={deliverLoading}
                />
              ))}
            </div>
          ))}
      </div>
      <div>
        <button
          type="button"
          className="w-full flex items-center justify-between text-lg font-semibold mb-3 text-gray-800 focus:outline-none"
          onClick={() => setShowDelivered((v) => !v)}
        >
          Полученные письма
          <span className={`transition-transform ${showDelivered ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showDelivered &&
          (delivered.length === 0 ? (
            <div className="text-center text-gray-300">Нет полученных писем</div>
          ) : (
            <div className="flex flex-col gap-4">
              {delivered.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
