import React from 'react';
import { Badge } from './Badge';

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
  <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow border border-gray-100">
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <span className="font-bold text-xl text-gray-900 truncate">Room {room.room_number}</span>
      <div className="flex flex-wrap gap-2 items-center mt-1">
        {room.undelivered_count > 0 && (
          <Badge color="red">{room.undelivered_count} undelivered</Badge>
        )}
        <Badge color={room.undelivered_count === 0 && room.total_letters > 0 ? 'green' : 'gray'}>
          {room.delivered_count} delivered
        </Badge>
        <Badge color="gray">{room.total_letters} total</Badge>
      </div>
    </div>
    <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">{children}</div>
  </div>
);
