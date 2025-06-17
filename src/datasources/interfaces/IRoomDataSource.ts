import type { Room } from '@/types/supabase';

export interface CreateRoomInput {
  room_number: string;
}

export interface UpdateRoomInput {
  id: string;
  room_number?: string;
}

export interface IRoomDataSource {
  // Получение комнат
  getRooms(): Promise<Room[]>;
  getRoomById(id: string): Promise<Room | null>;
  getRoomByNumber(roomNumber: string): Promise<Room | null>;

  // Создание и обновление
  createRoom(data: CreateRoomInput): Promise<Room>;
  updateRoom(data: UpdateRoomInput): Promise<Room>;
  deleteRoom(id: string): Promise<void>;

  // Специальные запросы
  getRoomsWithLetters(): Promise<
    Array<Room & { total_letters: number; delivered_count: number; undelivered_count: number }>
  >;
}
