import React from 'react';
import type { Letter } from './types';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { CheckCircle2, AlertCircle, Mail, Send, XCircle, Clock } from 'lucide-react';

const CHANNEL_LABELS: Record<string, { label: string; icon: React.ReactElement }> = {
  email: { label: 'Email', icon: <Mail className="w-4 h-4" /> },
  telegram: { label: 'Telegram', icon: <Send className="w-4 h-4" /> },
  // Добавляй новые каналы здесь
};

export const LetterStatusBadges: React.FC<{ letter: Letter }> = ({ letter }) => {
  const statuses = letter.notification_statuses || {};

  return (
    <>
      <Chip
        icon={
          <>
            {letter.status === 'delivered' ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
          </>
        }
        label={letter.status === 'delivered' ? 'Выдано' : 'Ожидает выдачи'}
        size="small"
        sx={{
          bgcolor: letter.status === 'delivered' ? 'rgba(34,197,94,0.08)' : 'rgba(253,224,71,0.12)',
          color: letter.status === 'delivered' ? 'rgb(22,163,74)' : 'rgb(202,138,4)',
          fontWeight: 500,
          fontSize: 13,
          mr: 0.5,
        }}
      />
      
      {/* Всегда показываем статусы для email и telegram */}
      {Object.entries(CHANNEL_LABELS).map(([channel, { label, icon }]) => {
        const status = statuses[channel];
        const chipIcon = React.isValidElement(icon) ? icon : undefined;
        
        if (status === 'sent') {
          return (
            <Tooltip key={channel} title={`${label}: уведомление отправлено`} arrow>
              <Chip
                icon={chipIcon}
                label={label}
                size="small"
                sx={{
                  bgcolor: 'rgba(34,197,94,0.08)',
                  color: 'rgb(22,163,74)',
                  fontWeight: 500,
                  fontSize: 13,
                  mr: 0.5,
                }}
              />
            </Tooltip>
          );
        } else if (status === 'failed') {
          return (
            <Tooltip key={channel} title={`${label}: ошибка отправки`} arrow>
              <Chip
                icon={<XCircle className="w-4 h-4 text-red-500" />}
                label={label}
                size="small"
                sx={{
                  bgcolor: 'rgba(239,68,68,0.08)',
                  color: 'rgb(220,38,38)',
                  fontWeight: 500,
                  fontSize: 13,
                  mr: 0.5,
                }}
              />
            </Tooltip>
          );
        } else {
          // Статус не определен или null - показываем как "не отправлено"
          return (
            <Tooltip key={channel} title={`${label}: уведомление не отправлено`} arrow>
              <Chip
                icon={<Clock className="w-4 h-4 text-gray-400" />}
                label={label}
                size="small"
                sx={{
                  bgcolor: 'rgba(203,213,225,0.18)',
                  color: 'rgb(71,85,105)',
                  fontWeight: 500,
                  fontSize: 13,
                  mr: 0.5,
                }}
              />
            </Tooltip>
          );
        }
      })}
    </>
  );
};
