import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const EmailWarning: React.FC = () => (
  <span
    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600"
    title="Email-уведомление не отправлено"
  >
    <ExclamationCircleIcon className="w-4 h-4" />
  </span>
);
