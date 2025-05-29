import React from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StatusIconProps {
  status: 'pending' | 'delivered';
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) =>
  status === 'delivered' ? (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
      <CheckCircleIcon className="w-5 h-5" />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600">
      <ClockIcon className="w-5 h-5" />
    </span>
  );
