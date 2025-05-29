import React from 'react';
import { StatusIcon } from './StatusIcon';
import { EmailWarning } from './EmailWarning';
import { LetterMeta } from './LetterMeta';
import { LetterDates } from './LetterDates';
import { LetterStatusBadges } from './LetterStatusBadges';
import { LetterPhotoButton } from './LetterPhotoButton';
import type { Letter } from './types';

interface LetterCardProps {
  letter: Letter;
  children?: React.ReactNode;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, children }) => (
  <div
    className={`bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4 border border-gray-100 hover:shadow-xl transition-shadow ${
      letter.status === 'delivered' ? 'opacity-60' : ''
    }`}
  >
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
      <StatusIcon status={letter.status} />
      {!letter.recipient_notified && <EmailWarning />}
    </div>
    <div className="flex-grow">
      <LetterMeta letter={letter} />
      <LetterDates letter={letter} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <LetterStatusBadges letter={letter} />
        {letter.photo_url && <LetterPhotoButton url={letter.photo_url} />}
        {children}
      </div>
    </div>
  </div>
);
