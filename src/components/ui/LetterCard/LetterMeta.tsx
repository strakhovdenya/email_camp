import React from 'react';
import { User } from 'lucide-react';
import Typography from '@mui/material/Typography';
import type { Letter } from '@/components/ui/LetterCard/types';

export const LetterMeta: React.FC<{ letter: Letter }> = ({ letter }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 min-w-0">
    <Typography
      variant="subtitle1"
      className="font-semibold text-gray-900 truncate"
      sx={{ fontSize: { xs: 15, sm: 18 } }}
    >
      {letter.note || <span className="text-gray-400">—</span>}
    </Typography>
    {(letter.last_name || letter.first_name) && (
      <span className="text-xs text-gray-700 flex items-center gap-1 truncate">
        <User className="w-4 h-4 text-blue-400" />
        {letter.last_name} {letter.first_name}
      </span>
    )}
  </div>
);
