import React from 'react';
import { Badge } from './Badge';

interface RoomCardProps {
  room: { room_number: string; pending_count: number };
  children?: React.ReactNode;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, children }) => (
  <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow border border-gray-100">
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <span className="font-bold text-lg text-gray-900 truncate">Room {room.room_number}</span>
      <span className="inline-flex items-center gap-2 mt-1">
        <Badge color={room.pending_count > 0 ? 'red' : 'green'}>
          {room.pending_count > 0 ? `${room.pending_count} undelivered` : 'All delivered'}
        </Badge>
      </span>
    </div>
    <div className="flex gap-2 flex-shrink-0">{children}</div>
  </div>
);
