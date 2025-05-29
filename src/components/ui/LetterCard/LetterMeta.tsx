import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import type { Letter } from '@/components/ui/LetterCard/types';

export const LetterMeta: React.FC<{ letter: Letter }> = ({ letter }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
    <span className="font-semibold text-gray-900 text-base">Letter #{letter.id}</span>
    {(letter.last_name || letter.first_name) && (
      <span className="text-xs text-gray-700 flex items-center gap-1">
        <UserIcon className="w-4 h-4 text-blue-400" />
        {letter.last_name} {letter.first_name}
      </span>
    )}
  </div>
);
