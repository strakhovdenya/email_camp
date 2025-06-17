import type { Database } from '@/lib/database.types';

export type User = Database['public']['Tables']['users']['Row'] & {
  room_number?: string;
  telegram_chat_id?: string | null;
};

export type CreateUserInput = Database['public']['Tables']['users']['Insert'] & {
  telegram_chat_id?: string | null;
};
export type UpdateUserInput = Database['public']['Tables']['users']['Update'] & {
  telegram_chat_id?: string | null;
};

export interface IUserDataSource {
  // Получение пользователей
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUsersByRoom(roomNumber: string): Promise<User[]>;
  
  // Создание и обновление пользователей
  createUser(input: CreateUserInput): Promise<User>;
  updateUser(id: string, input: UpdateUserInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  // Дополнительные методы
  cascadeDeleteUser(id: string): Promise<void>;
  searchUsers(query: string): Promise<User[]>;
  
  // Методы для совместимости
  getUsers(): Promise<User[]>;
} 