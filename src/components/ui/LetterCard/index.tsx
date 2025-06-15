import React from 'react';
import Card from '@mui/material/Card';
import { StatusIcon } from './StatusIcon';
import { LetterMeta } from './LetterMeta';
import { LetterDates } from './LetterDates';
import { LetterStatusBadges } from './LetterStatusBadges';
import { LetterPhotoButton } from './LetterPhotoButton';
import type { Letter } from './types';
import { motion } from 'framer-motion';

interface LetterCardProps {
  letter: Letter;
  children?: React.ReactNode;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 24 }}
    transition={{ duration: 0.25 }}
    className="w-full"
  >
    <Card
      elevation={3}
      className={`rounded-2xl border border-gray-100 transition-all duration-200 hover:shadow-2xl hover:scale-[1.01] px-2 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 ${
        letter.status === 'delivered' ? 'opacity-60' : ''
      }`}
      sx={{ background: '#fff' }}
    >
      <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
        <StatusIcon status={letter.status} />
      </div>
      <div className="flex-grow min-w-0">
        <LetterMeta letter={letter} />
        <LetterDates letter={letter} />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <LetterStatusBadges letter={letter} />
          {letter.photo_url && <LetterPhotoButton url={letter.photo_url} />}
          {children}
        </div>
      </div>
    </Card>
  </motion.div>
);
