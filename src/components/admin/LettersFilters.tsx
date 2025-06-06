import React from 'react';
import { LETTER_STATUS_FILTERS, LetterStatusFilter } from '@/constants/letterStatus';

interface LettersFiltersProps {
  filter: {
    id: string;
    room: string;
    recipient: string;
    status: LetterStatusFilter;
  };
  onChange: (filter: LettersFiltersProps['filter']) => void;
}

export const LettersFilters: React.FC<LettersFiltersProps> = ({ filter, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="ID письма"
        className="border rounded px-2 py-1 text-sm"
        value={filter.id}
        onChange={(e) => onChange({ ...filter, id: e.target.value })}
        style={{ minWidth: 100 }}
      />
      <input
        type="text"
        placeholder="Комната"
        className="border rounded px-2 py-1 text-sm"
        value={filter.room}
        onChange={(e) => onChange({ ...filter, room: e.target.value })}
        style={{ minWidth: 100 }}
      />
      <input
        type="text"
        placeholder="Получатель"
        className="border rounded px-2 py-1 text-sm"
        value={filter.recipient}
        onChange={(e) => onChange({ ...filter, recipient: e.target.value })}
        style={{ minWidth: 120 }}
      />
      <select
        className="border rounded px-2 py-1 text-sm"
        value={filter.status}
        onChange={(e) => onChange({ ...filter, status: e.target.value as LetterStatusFilter })}
        style={{ minWidth: 120 }}
      >
        {LETTER_STATUS_FILTERS.map((status) => (
          <option key={status} value={status}>
            {status === 'all' ? 'Все статусы' : status === 'pending' ? 'Ожидает' : 'Выдано'}
          </option>
        ))}
      </select>
    </div>
  );
};
