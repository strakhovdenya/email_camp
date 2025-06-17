import type { IDataSource } from '../interfaces/IDataSource';
import type {
  IUserDataSource,
  CreateUserInput,
  UpdateUserInput,
  User,
} from '../interfaces/IUserDataSource';
import type {
  ILetterDataSource,
  UpdateLetterInput,
  CreateLetterFormInput,
  Letter,
} from '../interfaces/ILetterDataSource';
import type {
  IRoomDataSource,
  CreateRoomInput,
  UpdateRoomInput,
} from '../interfaces/IRoomDataSource';
import type { LetterWithRelations, Database } from '@/types/supabase';

type DBUser = Database['public']['Tables']['users']['Row'];
type Room = Database['public']['Tables']['rooms']['Row'];

// Моковые данные
const mockUsers: DBUser[] = [
  {
    id: 'mock-user-1',
    email: 'anna.demo@example.com',
    first_name: 'Анна',
    last_name: 'Демьянова',
    phone: null,
    room_id: 'mock-room-1',
    role: 'camper',
    created_at: '2024-01-01T00:00:00Z',
    telegram_chat_id: null,
    channels_for_notification: ['email'],
  },
  {
    id: 'mock-user-2',
    email: 'ivan.demo@example.com',
    first_name: 'Иван',
    last_name: 'Демидов',
    phone: null,
    room_id: 'mock-room-2',
    role: 'camper',
    created_at: '2024-01-01T00:00:00Z',
    telegram_chat_id: null,
    channels_for_notification: ['email'],
  },
];

const mockRooms: Room[] = [
  {
    id: 'mock-room-1',
    room_number: '101',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'mock-room-2',
    room_number: '102',
    created_at: '2024-01-01T00:00:00Z',
  },
];

const mockLetters: LetterWithRelations[] = [
  {
    id: 'mock-letter-1',
    room_id: 'mock-room-1',
    user_id: 'mock-user-1',
    note: 'Письмо от бабушки (демо)',
    photo_url: null,
    status: 'pending',
    sync_status: 'synced',
    created_at: '2024-01-01T00:00:00Z',
    delivered_at: null,
    notification_statuses: { email: 'sent' },
    users: mockUsers[0],
    rooms: mockRooms[0],
  },
  {
    id: 'mock-letter-2',
    room_id: 'mock-room-2',
    user_id: 'mock-user-2',
    note: 'Важный документ (демо)',
    photo_url: null,
    status: 'delivered',
    sync_status: 'synced',
    created_at: '2024-01-01T00:00:00Z',
    delivered_at: '2024-01-02T00:00:00Z',
    notification_statuses: { email: 'sent' },
    users: mockUsers[1],
    rooms: mockRooms[1],
  },
];

class MockUserDataSource implements IUserDataSource {
  private users = [...mockUsers];

  async getAllUsers(): Promise<User[]> {
    return Promise.resolve([...this.users]);
  }

  async getUsers(): Promise<DBUser[]> {
    return Promise.resolve([...this.users]);
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return Promise.resolve(user || null);
  }

  async getUsersByRoom(roomNumber: string): Promise<User[]> {
    const room = mockRooms.find((r) => r.room_number === roomNumber);
    if (!room) return Promise.resolve([]);
    const users = this.users.filter((u) => u.room_id === room.id);
    return Promise.resolve(
      users.map((user) => ({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        room_id: user.room_id,
        role: user.role,
        created_at: user.created_at,
        telegram_chat_id: user.telegram_chat_id,
        channels_for_notification: user.channels_for_notification,
      }))
    );
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const newUser: DBUser = {
      id: `mock-user-${Date.now()}`,
      email: data.email || null,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone ?? null,
      room_id: data.room_id !== undefined ? data.room_id : null,
      role: data.role || 'camper',
      created_at: new Date().toISOString(),
      telegram_chat_id: data.telegram_chat_id || null,
      channels_for_notification: data.channels_for_notification || ['email'],
    };
    this.users.push(newUser);
    return Promise.resolve({
      id: newUser.id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      phone: newUser.phone,
      room_id: newUser.room_id,
      role: newUser.role,
      created_at: newUser.created_at,
      telegram_chat_id: newUser.telegram_chat_id,
      channels_for_notification: newUser.channels_for_notification,
    });
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');

    this.users[index] = { ...this.users[index], ...data };
    const user = this.users[index];
    return Promise.resolve({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      room_id: user.room_id,
      role: user.role,
      created_at: user.created_at,
      telegram_chat_id: user.telegram_chat_id,
      channels_for_notification: user.channels_for_notification,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    this.users.splice(index, 1);
    return Promise.resolve();
  }

  async cascadeDeleteUser(id: string): Promise<void> {
    return this.deleteUser(id);
  }

  async searchUsers(query: string): Promise<User[]> {
    const lowercaseQuery = query.toLowerCase();
    const filtered = this.users.filter(
      (user) =>
        user.first_name?.toLowerCase().includes(lowercaseQuery) ||
        false ||
        user.last_name?.toLowerCase().includes(lowercaseQuery) ||
        false ||
        user.email?.toLowerCase().includes(lowercaseQuery) ||
        false
    );
    return Promise.resolve(
      filtered.map((user) => ({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        room_id: user.room_id,
        role: user.role,
        created_at: user.created_at,
        telegram_chat_id: user.telegram_chat_id,
        channels_for_notification: user.channels_for_notification,
      }))
    );
  }

  async getCurrentUser(): Promise<{ id: string; email: string; role: string } | null> {
    // В mock версии возвращаем первого пользователя как текущего
    const mockCurrentUser = this.users.find((user) => user.role === 'admin') || this.users[0];

    if (!mockCurrentUser) return null;

    return Promise.resolve({
      id: mockCurrentUser.id,
      email: mockCurrentUser.email || '',
      role: mockCurrentUser.role,
    });
  }
}

class MockLetterDataSource implements ILetterDataSource {
  private letters = [...mockLetters];

  async getAllLetters(): Promise<Letter[]> {
    return Promise.resolve(
      this.letters.map((letter) => ({
        id: letter.id,
        room_id: letter.room_id,
        status: letter.status,
        created_at: letter.created_at,
        delivered_at: letter.delivered_at,
        sync_status: letter.sync_status,
        barcode_id: `BC-${letter.id}`,
        recipient_notified: letter.status === 'delivered',
        user_id: letter.user_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        notification_statuses: letter.notification_statuses as any,
        note: letter.note,
        photo_url: letter.photo_url,
      }))
    );
  }

  async getLetters(): Promise<LetterWithRelations[]> {
    return Promise.resolve([...this.letters]);
  }

  async getLetterById(id: string): Promise<Letter | null> {
    const letter = this.letters.find((l) => l.id === id);
    if (!letter) return null;

    return Promise.resolve({
      id: letter.id,
      room_id: letter.room_id,
      status: letter.status,
      created_at: letter.created_at,
      delivered_at: letter.delivered_at,
      sync_status: letter.sync_status,
      barcode_id: `BC-${letter.id}`,
      recipient_notified: letter.status === 'delivered',
      user_id: letter.user_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification_statuses: letter.notification_statuses as any,
      note: letter.note,
      photo_url: letter.photo_url,
    });
  }

  async getLettersByRoom(roomNumber: string): Promise<Letter[]> {
    const room = mockRooms.find((r) => r.room_number === roomNumber);
    if (!room) return Promise.resolve([]);
    const filtered = this.letters.filter((l) => l.room_id === room.id);
    return Promise.resolve(
      filtered.map((letter) => ({
        id: letter.id,
        room_id: letter.room_id,
        status: letter.status,
        created_at: letter.created_at,
        delivered_at: letter.delivered_at,
        sync_status: letter.sync_status,
        barcode_id: `BC-${letter.id}`,
        recipient_notified: letter.status === 'delivered',
        user_id: letter.user_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        notification_statuses: letter.notification_statuses as any,
        note: letter.note,
        photo_url: letter.photo_url,
      }))
    );
  }

  async getLettersByUser(userId: string): Promise<Letter[]> {
    const filtered = this.letters.filter((l) => l.user_id === userId);
    return Promise.resolve(
      filtered.map((letter) => ({
        id: letter.id,
        room_id: letter.room_id,
        status: letter.status,
        created_at: letter.created_at,
        delivered_at: letter.delivered_at,
        sync_status: letter.sync_status,
        barcode_id: `BC-${letter.id}`,
        recipient_notified: letter.status === 'delivered',
        user_id: letter.user_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        notification_statuses: letter.notification_statuses as any,
        note: letter.note,
        photo_url: letter.photo_url,
      }))
    );
  }

  async createLetter(data: CreateLetterFormInput): Promise<Letter> {
    // Получаем room_id либо напрямую, либо по room_number
    let roomId = data.room_id;
    if (!roomId && data.room_number) {
      const room = mockRooms.find((r) => r.room_number === data.room_number);
      roomId = room?.id;
    }

    if (!roomId) {
      throw new Error('Room not found');
    }

    const room = mockRooms.find((r) => r.id === roomId);
    const newLetter: Letter = {
      id: `mock-letter-${Date.now()}`,
      room_id: roomId,
      user_id: data.user_id || null,
      note: data.note || null,
      photo_url: data.photo_url || null,
      status: 'pending',
      sync_status: 'synced',
      created_at: new Date().toISOString(),
      delivered_at: null,
      notification_statuses: {},
      barcode_id: `BC-mock-letter-${Date.now()}`,
      recipient_notified: false,
    };

    // Добавляем в массив с отношениями
    const user = mockUsers.find((u) => u.id === data.user_id);

    const letterWithRelations: LetterWithRelations = {
      id: newLetter.id,
      room_id: newLetter.room_id,
      user_id: newLetter.user_id,
      note: newLetter.note,
      photo_url: newLetter.photo_url,
      status: newLetter.status,
      sync_status: newLetter.sync_status,
      created_at: newLetter.created_at,
      delivered_at: newLetter.delivered_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification_statuses: newLetter.notification_statuses as any,
      users: user || null,
      rooms: room || null,
    };

    this.letters.push(letterWithRelations);
    return Promise.resolve(newLetter);
  }

  async updateLetter(id: string, data: UpdateLetterInput): Promise<Letter> {
    const index = this.letters.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Letter not found');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.letters[index] = { ...this.letters[index], ...data } as any;
    const letter = this.letters[index];

    return Promise.resolve({
      id: letter.id,
      room_id: letter.room_id,
      status: letter.status,
      created_at: letter.created_at,
      delivered_at: letter.delivered_at,
      sync_status: letter.sync_status,
      barcode_id: `BC-${letter.id}`,
      recipient_notified: letter.status === 'delivered',
      user_id: letter.user_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification_statuses: letter.notification_statuses as any,
      note: letter.note,
      photo_url: letter.photo_url,
    });
  }

  async deleteLetter(id: string): Promise<void> {
    const index = this.letters.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Letter not found');
    this.letters.splice(index, 1);
    return Promise.resolve();
  }

  async deliverLetter(id: string): Promise<Letter> {
    const index = this.letters.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Letter not found');

    this.letters[index].status = 'delivered';
    this.letters[index].delivered_at = new Date().toISOString();
    const letter = this.letters[index];

    return Promise.resolve({
      id: letter.id,
      room_id: letter.room_id,
      status: letter.status,
      created_at: letter.created_at,
      delivered_at: letter.delivered_at,
      sync_status: letter.sync_status,
      barcode_id: `BC-${letter.id}`,
      recipient_notified: true,
      user_id: letter.user_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification_statuses: letter.notification_statuses as any,
      note: letter.note,
      photo_url: letter.photo_url,
    });
  }

  async markAsDelivered(id: string): Promise<Letter> {
    return this.deliverLetter(id);
  }

  async updateNotificationStatuses(
    letterId: string,
    statuses: Record<string, 'sent' | 'failed'>
  ): Promise<void> {
    const index = this.letters.findIndex((l) => l.id === letterId);
    if (index === -1) throw new Error('Letter not found');

    this.letters[index].notification_statuses = statuses;
    return Promise.resolve();
  }

  async updateLetterNotificationStatuses(
    letterId: string,
    statuses: Record<string, 'sent' | 'failed'>
  ): Promise<void> {
    return this.updateNotificationStatuses(letterId, statuses);
  }

  async getLetterStats(): Promise<{ total: number; pending: number; delivered: number }> {
    return Promise.resolve({
      total: this.letters.length,
      pending: this.letters.filter((l) => l.status === 'pending').length,
      delivered: this.letters.filter((l) => l.status === 'delivered').length,
    });
  }
}

class MockRoomDataSource implements IRoomDataSource {
  private rooms = [...mockRooms];

  async getRooms(): Promise<Room[]> {
    return Promise.resolve([...this.rooms]);
  }

  async getRoomById(id: string): Promise<Room | null> {
    const room = this.rooms.find((r) => r.id === id);
    return Promise.resolve(room || null);
  }

  async getRoomByNumber(roomNumber: string): Promise<Room | null> {
    const room = this.rooms.find((r) => r.room_number === roomNumber);
    return Promise.resolve(room || null);
  }

  async createRoom(data: CreateRoomInput): Promise<Room> {
    const newRoom: Room = {
      id: `mock-room-${Date.now()}`,
      room_number: data.room_number,
      created_at: new Date().toISOString(),
    };
    this.rooms.push(newRoom);
    return Promise.resolve(newRoom);
  }

  async updateRoom(data: UpdateRoomInput): Promise<Room> {
    const index = this.rooms.findIndex((r) => r.id === data.id);
    if (index === -1) throw new Error('Room not found');

    this.rooms[index] = { ...this.rooms[index], ...data };
    return Promise.resolve(this.rooms[index]);
  }

  async deleteRoom(id: string): Promise<void> {
    // Проверяем, есть ли пользователи в комнате
    const usersInRoom = mockUsers.filter((u) => u.room_id === id);
    if (usersInRoom.length > 0) {
      throw new Error('Сначала удалите или переместите всех пользователей из этой комнаты');
    }

    const index = this.rooms.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Room not found');
    this.rooms.splice(index, 1);
    return Promise.resolve();
  }

  async getRoomsWithLetters(): Promise<
    Array<Room & { total_letters: number; delivered_count: number; undelivered_count: number }>
  > {
    const roomsWithCounts = this.rooms.map((room) => {
      const roomLetters = mockLetters.filter((l) => l.room_id === room.id);
      const deliveredCount = roomLetters.filter((l) => l.status === 'delivered').length;
      const undeliveredCount = roomLetters.filter((l) => l.status === 'pending').length;

      return {
        ...room,
        total_letters: roomLetters.length,
        delivered_count: deliveredCount,
        undelivered_count: undeliveredCount,
      };
    });
    return Promise.resolve(roomsWithCounts);
  }
}

export class MockDataSource implements IDataSource {
  public readonly users: IUserDataSource;
  public readonly letters: ILetterDataSource;
  public readonly rooms: IRoomDataSource;

  constructor() {
    this.users = new MockUserDataSource();
    this.letters = new MockLetterDataSource();
    this.rooms = new MockRoomDataSource();
  }

  async initialize(): Promise<void> {
    return Promise.resolve();
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}
