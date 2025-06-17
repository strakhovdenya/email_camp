import type { Database } from '@/lib/database.types';

export type Letter = {
  id: string;
  room_id: string;
  status: 'pending' | 'delivered';
  created_at: string;
  delivered_at: string | null;
  sync_status: 'pending' | 'synced' | 'failed';
  barcode_id?: string;
  recipient_notified?: boolean;
  user_id: string | null;
  notification_statuses: unknown;
  note: string | null;
  photo_url: string | null;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllLetters(): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLetterById(id: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLettersByRoom(roomNumber: string): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLettersByUser(userId: string): Promise<any[]>;

  // Создание и обновление писем
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createLetter(input: CreateLetterInput): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLetter(id: string, input: UpdateLetterInput): Promise<any>;
  deleteLetter(id: string): Promise<void>;

  // Специальные операции
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deliverLetter(id: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateNotificationStatuses(id: string, statuses: any): Promise<void>;

  // Дополнительные методы для совместимости
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLetters(): Promise<any[]>;
  getLetterStats(): Promise<{ total: number; pending: number; delivered: number }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markAsDelivered(id: string): Promise<any>;
}
