import type {
  IDataSource,
  IUserDataSource,
  ILetterDataSource,
  IRoomDataSource,
  CreateRoomInput,
  UpdateRoomInput,
} from '../interfaces/IDataSource';
import type { CreateLetterFormInput, UpdateLetterInput } from '../interfaces/ILetterDataSource';
import type { User, CreateUserInput, UpdateUserInput } from '../interfaces/IUserDataSource';
import type { Room, LetterWithRelations, Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

// Создаём admin клиент для серверного контекста
function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Функция для получения полного URL в серверном контексте
function getFullUrl(path: string): string {
  const isServerSide = typeof window === 'undefined';
  if (isServerSide) {
    // В серверном контексте определяем базовый URL автоматически
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    let host;

    if (process.env.VERCEL_URL) {
      host = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_BASE_URL) {
      host = process.env.NEXT_PUBLIC_BASE_URL;
    } else {
      host = `${protocol}://localhost:3000`;
    }

    const fullUrl = `${host}${path}`;
    console.log(`[DataSource] Server-side URL: ${fullUrl}`);
    return fullUrl;
  }
  return path;
}

class SupabaseUserDataSource implements IUserDataSource {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAllUsers(): Promise<any[]> {
    return this.getUsers();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUsers(): Promise<any[]> {
    const isServerSide = typeof window === 'undefined';

    if (isServerSide) {
      // В серверном контексте используем прямые вызовы к Supabase
      const supabase = getAdminClient();
      const { data, error } = await supabase
        .from('users')
        .select(
          `
          id,
          first_name,
          last_name,
          email,
          phone,
          role,
          channels_for_notification,
          telegram_chat_id,
          room_id,
          room:rooms (
            room_number
          )
        `
        )
        .order('last_name')
        .order('first_name');
      if (error) throw new Error(error.message);
      return data || [];
    }

    // В клиентском контексте используем API routes
    const response = await fetch('/api/users');
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Ошибка получения пользователей');
    return result.data || [];
  }

  async getUserById(id: string): Promise<User | null> {
    const isServerSide = typeof window === 'undefined';

    if (isServerSide) {
      // В серверном контексте используем прямые вызовы к Supabase
      const supabase = getAdminClient();
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

      if (error && error.code === 'PGRST116') return null; // Not found
      if (error) throw new Error(error.message);
      return data;
    }

    // В клиентском контексте используем API routes
    const response = await fetch(getFullUrl(`/api/users/${id}`));
    if (response.status === 404) return null;
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch user');
    return result.data;
  }

  async getUsersByRoom(roomNumber: string): Promise<User[]> {
    // Используем тот же API что и в старом useUsersByRoom
    const response = await fetch(`/api/rooms/${roomNumber}/users`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Ошибка при получении пользователей');
    return result.data || [];
  }

  async createUser(data: CreateUserInput): Promise<User> {
    // Используем тот же API что и в старом saveUser - POST без id
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to create user');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateUser(id: string, data: UpdateUserInput): Promise<any> {
    // Используем тот же API что и в старом saveUser - POST с id
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }), // включаем id для обновления
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    // Используем тот же API что и в старом deleteUser - query parameter
    const response = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
    const result = await response.json();

    if (result.success) {
      return;
    } else if (result.requiresCascade) {
      throw new Error('CASCADE_REQUIRED');
    } else {
      throw new Error(result.error || 'Failed to delete user');
    }
  }

  async cascadeDeleteUser(id: string): Promise<void> {
    // Используем тот же API что и в старом cascadeDeleteUser
    const response = await fetch(`/api/users?id=${id}&cascade=true`, { method: 'DELETE' });
    const result = await response.json();

    if (result.success) {
      return;
    } else {
      throw new Error(result.error || 'Failed to cascade delete user');
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to search users');
    return result.data || [];
  }

  async getCurrentUser(): Promise<{ id: string; email: string; role: string } | null> {
    const response = await fetch('/api/auth/me');
    const result = await response.json();

    if (response.status === 401) {
      return null; // Пользователь не авторизован
    }

    if (!result.success) {
      throw new Error(result.error || 'Ошибка получения пользователя');
    }

    return result.data;
  }

  async notifyUser(
    userId: string,
    letterId: string,
    letterNote?: string,
    photoUrl?: string
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/notify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          letterId,
          letterNote,
          photoUrl,
        }),
      });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error notifying user:', error);
      return false;
    }
  }
}

class SupabaseLetterDataSource implements ILetterDataSource {
  async getLetters(): Promise<LetterWithRelations[]> {
    const response = await fetch('/api/letters');
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch letters');
    return result.data;
  }

  async getLetterById(id: string): Promise<LetterWithRelations | null> {
    const isServerSide = typeof window === 'undefined';

    if (isServerSide) {
      // В серверном контексте используем прямые вызовы к Supabase
      const supabase = getAdminClient();
      const { data, error } = await supabase
        .from('letters')
        .select(
          `
          *,
          rooms:room_id(id, room_number),
          users:user_id(id, email, first_name, last_name)
        `
        )
        .eq('id', id)
        .single();

      if (error && error.code === 'PGRST116') return null; // Not found
      if (error) throw new Error(error.message);
      return data;
    }

    // В клиентском контексте используем API routes
    const response = await fetch(getFullUrl(`/api/letters/${id}`));
    if (response.status === 404) return null;
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch letter');
    return result.data;
  }

  async getLettersByRoom(roomNumber: string): Promise<LetterWithRelations[]> {
    // Используем тот же API что и в старом useLettersByRoom
    const response = await fetch(`/api/letters/by-room?roomNumber=${roomNumber}`);
    const result = await response.json();

    if (result.success) {
      return result.data || [];
    } else {
      throw new Error(result.error || 'Failed to fetch letters by room');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createLetter(data: CreateLetterFormInput): Promise<any> {
    const response = await fetch('/api/letters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to create letter');
    return result.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateLetter(id: string, data: UpdateLetterInput): Promise<any> {
    const response = await fetch(`/api/letters/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to update letter');
    return result.data;
  }

  async deleteLetter(id: string): Promise<void> {
    const response = await fetch(`/api/letters/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to delete letter');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async markAsDelivered(id: string): Promise<any> {
    const response = await fetch('/api/letters/deliver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ letterId: id }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to mark letter as delivered');
    return result.data;
  }

  async updateLetterNotificationStatuses(
    letterId: string,
    statuses: Record<string, 'sent' | 'failed'>
  ): Promise<void> {
    const isServerSide = typeof window === 'undefined';

    if (isServerSide) {
      // В серверном контексте используем прямые вызовы к Supabase
      const supabase = getAdminClient();
      const { error } = await supabase
        .from('letters')
        .update({ notification_statuses: statuses })
        .eq('id', letterId);

      if (error) throw new Error(error.message);
      return;
    }

    // В клиентском контексте используем API routes
    const response = await fetch(getFullUrl(`/api/letters/${letterId}/notification-statuses`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_statuses: statuses }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to update notification statuses');
  }

  async getLetterStats(): Promise<{ total: number; pending: number; delivered: number }> {
    const letters = await this.getLetters();
    return {
      total: letters.length,
      pending: letters.filter((l) => l.status === 'pending').length,
      delivered: letters.filter((l) => l.status === 'delivered').length,
    };
  }

  async getAllLetters(): Promise<LetterWithRelations[]> {
    return this.getLetters();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getLettersByUser(userId: string): Promise<any[]> {
    const response = await fetch(`/api/letters/by-user?userId=${userId}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch letters by user');
    return result.data || [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deliverLetter(id: string): Promise<any> {
    return this.markAsDelivered(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateNotificationStatuses(id: string, statuses: any): Promise<void> {
    return this.updateLetterNotificationStatuses(id, statuses);
  }
}

class SupabaseRoomDataSource implements IRoomDataSource {
  async getRooms(): Promise<Room[]> {
    const response = await fetch('/api/rooms');
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch rooms');
    return result.data || [];
  }

  async getRoomById(id: string): Promise<Room | null> {
    const response = await fetch(getFullUrl(`/api/rooms/${id}`));
    if (response.status === 404) return null;
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch room');
    return result.data;
  }

  async getRoomByNumber(roomNumber: string): Promise<Room | null> {
    const response = await fetch(`/api/rooms/by-number/${roomNumber}`);
    if (response.status === 404) return null;
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch room');
    return result.data;
  }

  async createRoom(data: CreateRoomInput): Promise<Room> {
    // Используем тот же API что и в старом saveRoom - просто POST без id
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to create room');
    }
  }

  async updateRoom(data: UpdateRoomInput): Promise<Room> {
    // Используем тот же API что и в старом saveRoom - POST с id
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // включает id для обновления
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to update room');
    }
  }

  async deleteRoom(id: string): Promise<void> {
    // Точно такая же логика как в старом deleteRoom
    const response = await fetch(`/api/rooms?id=${id}`, { method: 'DELETE' });
    const result = await response.json();

    if (result.success) {
      return;
    } else if (result.users_exist) {
      throw new Error('Сначала удалите или переместите всех пользователей из этой комнаты');
    } else {
      throw new Error(result.error || 'Failed to delete room');
    }
  }

  async getRoomsWithLetters(): Promise<
    Array<Room & { total_letters: number; delivered_count: number; undelivered_count: number }>
  > {
    const response = await fetch('/api/rooms-with-letters');
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to fetch rooms with letters');
    return result.data || [];
  }
}

export class SupabaseDataSource implements IDataSource {
  public readonly users: IUserDataSource;
  public readonly letters: ILetterDataSource;
  public readonly rooms: IRoomDataSource;

  constructor() {
    this.users = new SupabaseUserDataSource();
    this.letters = new SupabaseLetterDataSource();
    this.rooms = new SupabaseRoomDataSource();
  }

  async initialize(): Promise<void> {
    // Supabase не требует специальной инициализации для API routes
    return Promise.resolve();
  }

  async disconnect(): Promise<void> {
    // API routes не требуют разрыва соединения
    return Promise.resolve();
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Простая проверка доступности API
      const response = await fetch('/api/health');
      return response.ok;
    } catch {
      return false;
    }
  }
}
