import React, { useState } from 'react';
import { LetterCard } from './ui/LetterCard';
import type { LetterWithRelations } from '@/types/supabase';
import type { Letter } from './ui/LetterCard/types';

interface LetterListProps {
  letters: LetterWithRelations[];
  onDeliver?: (id: string) => void;
  deliverLoadingId: string | null;
}

export const LetterList: React.FC<LetterListProps> = ({
  letters,
  onDeliver,
  deliverLoadingId,
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
          <span>Ожидают доставки: {pending.length}</span>
          <span className={`transition-transform ${showPending ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showPending &&
          (pending.length === 0 ? (
            <div className="text-center text-gray-400">Нет писем, ожидающих доставки</div>
          ) : (
            <div className="flex flex-col gap-4">
              {pending.map((letter) => (
                <LetterCard key={letter.id} letter={letter as Letter}>
                  {onDeliver && (
                    <button
                      onClick={() => onDeliver(letter.id)}
                      disabled={deliverLoadingId !== null}
                      className="px-3 py-1 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                    >
                      {deliverLoadingId === letter.id ? 'Delivering...' : 'Deliver'}
                    </button>
                  )}
                </LetterCard>
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
          <span>Полученные письма: {delivered.length}</span>
          <span className={`transition-transform ${showDelivered ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showDelivered &&
          (delivered.length === 0 ? (
            <div className="text-center text-gray-300">Нет полученных писем</div>
          ) : (
            <div className="flex flex-col gap-4">
              {delivered.map((letter) => (
                <LetterCard key={letter.id} letter={letter as Letter} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
