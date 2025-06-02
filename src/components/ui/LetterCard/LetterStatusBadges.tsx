import React from 'react';
import type { Letter } from './types';

const CHANNEL_LABELS: Record<string, string> = {
  email: 'Email',
  telegram: 'Telegram',
  // Добавляй новые каналы здесь
};

export const LetterStatusBadges: React.FC<{ letter: Letter }> = ({ letter }) => {
  const statuses = letter.notification_statuses;
  const hasStatuses = !!statuses && Object.keys(statuses).length > 0;

  return (
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
      {/* Новая логика: по notification_statuses */}
      {hasStatuses
        ? Object.entries(CHANNEL_LABELS).map(([channel, label]) => {
            const status = statuses?.[channel];
            if (status === 'sent') {
              return (
                <span
                  key={channel}
                  className="text-xs font-medium rounded px-2 py-1 inline-block bg-green-100 text-green-700"
                >
                  {label} notified
                </span>
              );
            } else if (status === 'failed') {
              return (
                <span
                  key={channel}
                  className="text-xs font-medium rounded px-2 py-1 inline-block bg-red-100 text-red-700"
                >
                  {label} failed
                </span>
              );
            } else {
              return (
                <span
                  key={channel}
                  className="text-xs font-medium rounded px-2 py-1 inline-block bg-gray-100 text-gray-600"
                >
                  No {label} notification
                </span>
              );
            }
          })
        : // Старая логика для писем без notification_statuses
          !letter.recipient_notified && (
            <span className="text-xs font-medium rounded px-2 py-1 inline-block bg-red-100 text-red-700">
              No email notification
            </span>
          )}
      {letter.note && (
        <span className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1">{letter.note}</span>
      )}
    </>
  );
};
