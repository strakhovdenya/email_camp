import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  delivered: { label: 'Доставлено', color: 'bg-green-100 text-green-800' },
  pending: { label: 'В ожидании', color: 'bg-yellow-100 text-yellow-800' },
  notified: { label: 'Уведомлено', color: 'bg-blue-100 text-blue-800' },
  failed: { label: 'Ошибка', color: 'bg-red-100 text-red-800' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const info = statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${info.color} shadow-sm`}
    >
      {info.label}
    </span>
  );
};

export default StatusBadge;
