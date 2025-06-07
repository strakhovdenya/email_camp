import React, { useState } from 'react';
import { LetterCard } from './ui/LetterCard';
import type { LetterWithRelations } from '@/types/supabase';
import type { Letter } from './ui/LetterCard/types';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@mui/material/Button';

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
    <div className="flex flex-col gap-6">
      <div>
        <Button
          fullWidth
          variant="text"
          sx={{
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: 18,
            mb: 1,
            color: '#1e293b',
          }}
          onClick={() => setShowPending((v) => !v)}
          endIcon={
            <span className={`transition-transform ${showPending ? 'rotate-90' : ''}`}>▶</span>
          }
        >
          Ожидают доставки: {pending.length}
        </Button>
        <AnimatePresence initial={false}>
          {showPending && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {pending.length === 0 ? (
                <div className="text-center text-gray-400">Нет писем, ожидающих доставки</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {pending.map((letter) => (
                    <LetterCard key={letter.id} letter={letter as Letter}>
                      {onDeliver && (
                        <Button
                          onClick={() => onDeliver(letter.id)}
                          disabled={deliverLoadingId !== null}
                          variant="contained"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            minWidth: 120,
                          }}
                        >
                          {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать'}
                        </Button>
                      )}
                    </LetterCard>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <Button
          fullWidth
          variant="text"
          sx={{
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: 18,
            mb: 1,
            color: '#1e293b',
          }}
          onClick={() => setShowDelivered((v) => !v)}
          endIcon={
            <span className={`transition-transform ${showDelivered ? 'rotate-90' : ''}`}>▶</span>
          }
        >
          Полученные письма: {delivered.length}
        </Button>
        <AnimatePresence initial={false}>
          {showDelivered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {delivered.length === 0 ? (
                <div className="text-center text-gray-300">Нет полученных писем</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {delivered.map((letter) => (
                    <LetterCard key={letter.id} letter={letter as Letter} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
