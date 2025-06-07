import React, { useMemo } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import type { Letter } from './types';
import { formatSafeDate } from '@/lib/utils';
import Chip from '@mui/material/Chip';

export const LetterDates: React.FC<{ letter: Letter }> = ({ letter }) => {
  const createdAt = useMemo(() => formatSafeDate(letter.created_at), [letter.created_at]);
  const deliveredAt = useMemo(() => formatSafeDate(letter.delivered_at), [letter.delivered_at]);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-4 h-4 text-gray-400" />
        <span>Создано:</span>
        <span className="font-medium text-gray-700">{createdAt}</span>
      </span>
      {letter.status === 'delivered' && deliveredAt && (
        <Chip
          icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
          label={`Выдано: ${deliveredAt}`}
          size="small"
          sx={{
            bgcolor: 'rgba(34,197,94,0.08)',
            color: 'rgb(22,163,74)',
            fontWeight: 500,
            fontSize: 13,
          }}
        />
      )}
    </div>
  );
};
