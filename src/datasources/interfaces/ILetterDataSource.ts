import type { Database } from '@/lib/database.types';

export type Letter = Database['public']['Tables']['letters']['Row'] & {
  users?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  rooms?: {
    id: string;
    room_number: string;
    telegram_chat_id: string | null;
    created_at: string;
  };
  room_number?: string;
};

export type CreateLetterInput = Database['public']['Tables']['letters']['Insert'];
export type UpdateLetterInput = Database['public']['Tables']['letters']['Update'];

export interface ILetterDataSource {
  // Получение писем
  getAllLetters(): Promise<Letter[]>;
  getLetterById(id: string): Promise<Letter | null>;
  getLettersByRoom(roomNumber: string): Promise<Letter[]>;
  getLettersByUser(userId: string): Promise<Letter[]>;
  
  // Создание и обновление писем
  createLetter(input: CreateLetterInput): Promise<Letter>;
  updateLetter(id: string, input: UpdateLetterInput): Promise<Letter>;
  deleteLetter(id: string): Promise<void>;
  
  // Специальные операции
  deliverLetter(id: string): Promise<Letter>;
  updateNotificationStatuses(id: string, statuses: any): Promise<void>;
  
  // Дополнительные методы для совместимости
  getLetters(): Promise<Letter[]>;
  getLetterStats(): Promise<{ total: number; pending: number; delivered: number }>;
  markAsDelivered(id: string): Promise<Letter>;
} 