'use client';

import React, { useEffect, useState } from 'react';
import { LETTER_STATUS_FILTERS, LetterStatusFilter } from '@/constants/letterStatus';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { CheckCircle2, Clock, List } from 'lucide-react';

interface LettersFiltersProps {
  filter: {
    room: string;
    recipient: string;
    status: LetterStatusFilter;
  };
  onChange: (filter: LettersFiltersProps['filter']) => void;
}

const statusIcons = {
  all: <List className="w-4 h-4 mr-1 text-gray-400" />,
  pending: <Clock className="w-4 h-4 mr-1 text-yellow-500" />,
  delivered: <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />,
};

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
    return <div className="flex flex-wrap gap-3 mb-6" />;
  }

  return (
    <div className="flex flex-wrap gap-3 mb-0.5 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md">
      <input
        type="text"
        placeholder="Комната"
        className="border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150 shadow-sm"
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
        className="border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150 shadow-sm"
        value={localFilter.recipient}
        onChange={(e) => {
          const newFilter = { ...localFilter, recipient: e.target.value };
          setLocalFilter(newFilter);
          onChange(newFilter);
        }}
        style={{ minWidth: 120 }}
      />
      <FormControl
        size="small"
        sx={{ minWidth: 140, background: 'white', borderRadius: 2, boxShadow: 1 }}
      >
        <InputLabel id="status-select-label">Статус</InputLabel>
        <Select
          labelId="status-select-label"
          value={localFilter.status}
          label="Статус"
          onChange={(e) => {
            const newFilter = { ...localFilter, status: e.target.value as LetterStatusFilter };
            setLocalFilter(newFilter);
            onChange(newFilter);
          }}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            fontSize: '1rem',
            '.MuiSelect-select': { display: 'flex', alignItems: 'center' },
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {statusIcons[selected as LetterStatusFilter]}
              <span>
                {selected === 'all' ? 'Все статусы' : selected === 'pending' ? 'Ожидает' : 'Выдано'}
              </span>
            </Box>
          )}
        >
          {LETTER_STATUS_FILTERS.map((status) => (
            <MenuItem key={status} value={status} sx={{ display: 'flex', alignItems: 'center' }}>
              {statusIcons[status as LetterStatusFilter]}
              <span style={{ marginLeft: 4 }}>
                {status === 'all' ? 'Все статусы' : status === 'pending' ? 'Ожидает' : 'Выдано'}
              </span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
