'use client';

import React, { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const [localFilter, setLocalFilter] = useState(filter);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  if (!mounted) {
    return <div className="flex flex-wrap gap-2 mb-4" />;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="ID письма"
        className="border rounded px-2 py-1 text-sm"
        value={localFilter.id}
        onChange={(e) => {
          const newFilter = { ...localFilter, id: e.target.value };
          setLocalFilter(newFilter);
          onChange(newFilter);
        }}
        style={{ minWidth: 100 }}
      />
      <input
        type="text"
        placeholder="Комната"
        className="border rounded px-2 py-1 text-sm"
        value={localFilter.room}
        onChange={(e) => {
          const newFilter = { ...localFilter, room: e.target.value };
          setLocalFilter(newFilter);
          onChange(newFilter);
        }}
        style={{ minWidth: 100 }}
      />
      <input
        type="text"
        placeholder="Получатель"
        className="border rounded px-2 py-1 text-sm"
        value={localFilter.recipient}
        onChange={(e) => {
          const newFilter = { ...localFilter, recipient: e.target.value };
          setLocalFilter(newFilter);
          onChange(newFilter);
        }}
        style={{ minWidth: 120 }}
      />
      <select
        className="border rounded px-2 py-1 text-sm"
        value={localFilter.status}
        onChange={(e) => {
          const newFilter = { ...localFilter, status: e.target.value as LetterStatusFilter };
          setLocalFilter(newFilter);
          onChange(newFilter);
        }}
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
