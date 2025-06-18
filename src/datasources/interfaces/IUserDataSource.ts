import type { Database } from '@/lib/database.types';

export type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  room_id: string | null;
  role: 'admin' | 'staff' | 'camper';
  created_at: string;
  channels_for_notification: string[] | null;
  telegram_chat_id: string | null;
  room_number?: string;
};

export type CreateUserInput = Database['public']['Tables']['users']['Insert'] & {
  telegram_chat_id?: string | null;
};
export type UpdateUserInput = Database['public']['Tables']['users']['Update'] & {
  telegram_chat_id?: string | null;
};

export interface IUserDataSource {
  // Получение пользователей
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllUsers(): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserById(id: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsersByRoom(roomNumber: string): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentUser(): Promise<any>;

  // Создание и обновление пользователей
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser(input: CreateUserInput): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser(id: string, input: UpdateUserInput): Promise<any>;
  deleteUser(id: string): Promise<void>;

  // Дополнительные методы
  cascadeDeleteUser(id: string): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchUsers(query: string): Promise<any[]>;

  // Методы для совместимости
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsers(): Promise<any[]>;

  // Уведомления
  notifyUser(
    userId: string,
    letterId: string,
    letterNote?: string,
    photoUrl?: string
  ): Promise<boolean>;
}
