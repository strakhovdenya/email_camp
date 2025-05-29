import React, { useMemo } from 'react';
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import type { Letter } from './types';

export const LetterDates: React.FC<{ letter: Letter }> = ({ letter }) => {
  const createdAt = useMemo(
    () => new Date(letter.created_at).toLocaleString(),
    [letter.created_at]
  );
  const deliveredAt = useMemo(
    () => (letter.delivered_at ? new Date(letter.delivered_at).toLocaleString() : ''),
    [letter.delivered_at]
  );
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <ClockIcon className="w-4 h-4 text-gray-400" />
        <span>Created:</span>
        <span className="font-medium text-gray-700">{createdAt}</span>
      </span>
      {letter.status === 'delivered' && deliveredAt && (
        <span className="flex items-center gap-1 text-xs text-green-600">
          <CheckCircleIcon className="w-4 h-4 text-green-400" />
          <span>Delivered:</span>
          <span className="font-medium">{deliveredAt}</span>
        </span>
      )}
    </div>
  );
};
