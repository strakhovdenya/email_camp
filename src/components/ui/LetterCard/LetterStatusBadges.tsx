import React from 'react';
import type { Letter } from './types';

export const LetterStatusBadges: React.FC<{ letter: Letter }> = ({ letter }) => (
  <>
    <span
      className={`text-xs font-medium rounded px-2 py-1 inline-block ${
        letter.status === 'delivered'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {letter.status === 'delivered' ? 'Delivered' : 'Awaiting delivery'}
    </span>
    {!letter.recipient_notified && (
      <span className="text-xs font-medium rounded px-2 py-1 inline-block bg-red-100 text-red-700">
        No email notification
      </span>
    )}
    {letter.note && (
      <span className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1">{letter.note}</span>
    )}
  </>
);
