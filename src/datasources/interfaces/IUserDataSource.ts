import type { Database } from '@/lib/database.types';

export type User = Database['public']['Tables']['users']['Row'] & {
  room_number?: string;
};

export type CreateUserInput = Database['public']['Tables']['users']['Insert'];
export type UpdateUserInput = Database['public']['Tables']['users']['Update'];

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
} 