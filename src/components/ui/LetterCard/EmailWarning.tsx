import React from 'react';
import { AlertCircle } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

export const EmailWarning: React.FC = () => (
  <Tooltip title="Email-уведомление не отправлено" arrow>
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 shadow">
      <AlertCircle className="w-5 h-5" />
    </span>
  </Tooltip>
);
