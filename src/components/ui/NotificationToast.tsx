import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface ChannelStatus {
  channel: 'email' | 'telegram';
  success: boolean;
}

interface NotificationToastProps {
  statuses: ChannelStatus[];
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ statuses }) => {
  const allSuccess = statuses.every((s) => s.success);
  const allFail = statuses.every((s) => !s.success);
  const someSuccess = statuses.some((s) => s.success) && !allSuccess;

  let color = 'bg-green-100 text-green-800';
  if (allFail) color = 'bg-red-100 text-red-700';
  else if (someSuccess) color = 'bg-yellow-100 text-yellow-800';

  return (
    <div className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow ${color}`}>
      {allSuccess ? (
        <CheckCircleIcon className="w-6 h-6 text-green-500" />
      ) : (
        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      )}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          {statuses.map((s) => (
            <span key={s.channel} className="flex items-center gap-1">
              {s.channel === 'email' ? (
                <EnvelopeIcon
                  className={`w-5 h-5 ${s.success ? 'text-green-600' : 'text-red-600'}`}
                />
              ) : (
                <PaperAirplaneIcon
                  className={`w-5 h-5 ${s.success ? 'text-green-600' : 'text-red-600'}`}
                />
              )}
              <span className="text-sm">
                {s.channel.charAt(0).toUpperCase() + s.channel.slice(1)}:{' '}
                {s.success ? 'sent' : 'failed'}
              </span>
            </span>
          ))}
        </div>
        <span className="text-xs">
          {allSuccess
            ? 'User notified by all channels.'
            : allFail
              ? 'Failed to notify user.'
              : 'User notified partially.'}
        </span>
      </div>
    </div>
  );
};
