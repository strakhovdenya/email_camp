import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

interface StatusIconProps {
  status: 'pending' | 'delivered';
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) =>
  status === 'delivered' ? (
    <Tooltip title="Письмо выдано" arrow>
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-600 shadow">
        <CheckCircle2 className="w-6 h-6" />
      </span>
    </Tooltip>
  ) : (
    <Tooltip title="Ожидает выдачи" arrow>
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-100 text-yellow-600 shadow">
        <Clock className="w-6 h-6" />
      </span>
    </Tooltip>
  );
