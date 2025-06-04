import React from 'react';
import { User } from '@/types/supabase';

const channelIcons: Record<string, string> = {
  email: '✉️',
  sms: '📱',
  push: '📢',
};

const channelColors: Record<string, string> = {
  email: 'bg-blue-100 text-blue-700',
  sms: 'bg-green-100 text-green-700',
  push: 'bg-yellow-100 text-yellow-700',
};

interface MobileUserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const MobileUserCard: React.FC<MobileUserCardProps> = ({ user, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow p-4 mb-3 flex flex-col">
    <div className="font-bold text-base mb-1">
      {user.last_name} {user.first_name}
    </div>
    <div className="text-xs text-gray-500 mb-1">{user.email}</div>
    {user.channels_for_notification && user.channels_for_notification.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-2">
        {user.channels_for_notification.map((ch) => (
          <span
            key={ch}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${channelColors[ch] || 'bg-gray-100 text-gray-700'}`}
          >
            <span>{channelIcons[ch] || '🔔'}</span>
            {ch}
          </span>
        ))}
      </div>
    )}
    <div className="flex gap-2 mt-auto">
      <button
        className="flex-1 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
        onClick={() => onEdit(user)}
      >
        ✏️ Редактировать
      </button>
      <button
        className="flex-1 py-2 rounded bg-red-600 text-white text-sm font-semibold"
        onClick={() => onDelete(user)}
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
);

export default MobileUserCard;
