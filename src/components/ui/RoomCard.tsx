import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { Home } from 'lucide-react';

interface RoomCardProps {
  room: {
    room_number: string;
    total_letters: number;
    delivered_count: number;
    undelivered_count: number;
  };
  children?: React.ReactNode;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, children }) => (
  <Card
    elevation={3}
    className="rounded-2xl px-4 py-4 sm:px-6 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:shadow-xl transition-shadow border border-gray-100"
    sx={{ background: '#fff' }}
  >
    <CardContent className="flex flex-col gap-2 flex-1 min-w-0 p-0">
      <span className="font-bold text-lg sm:text-xl text-gray-900 truncate flex items-center gap-2">
        <Home className="w-5 h-5 text-blue-500" />
        Комната {room.room_number}
      </span>
      <div className="flex flex-wrap gap-2 items-center mt-1">
        {room.undelivered_count > 0 && (
          <Chip
            label={`${room.undelivered_count} не выдано`}
            color="error"
            size="small"
            sx={{ fontWeight: 600, fontSize: 13 }}
          />
        )}
        <Chip
          label={`${room.delivered_count} выдано`}
          color={room.undelivered_count === 0 && room.total_letters > 0 ? 'success' : 'default'}
          size="small"
          sx={{ fontWeight: 600, fontSize: 13 }}
        />
        <Chip
          label={`${room.total_letters} всего`}
          color="info"
          size="small"
          sx={{ fontWeight: 600, fontSize: 13 }}
        />
      </div>
    </CardContent>
    <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">{children}</div>
  </Card>
);
