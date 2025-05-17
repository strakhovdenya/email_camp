import Dexie, { Table } from 'dexie';

interface Letter {
  id?: number;
  roomNumber: string;
  status: 'pending' | 'delivered';
  registeredAt: Date;
  deliveredAt?: Date;
  syncStatus: 'pending' | 'synced' | 'failed';
}

export class MailDatabase extends Dexie {
  letters!: Table<Letter>;

  constructor() {
    super('MailDatabase');
    this.version(1).stores({
      letters: '++id, roomNumber, status, syncStatus'
    });
  }

  async addLetter(roomNumber: string): Promise<number> {
    const id = await this.letters.add({
      roomNumber,
      status: 'pending',
      registeredAt: new Date(),
      syncStatus: 'pending'
    });
    this.syncWithServer();
    return id;
  }

  async deliverLetter(id: number): Promise<void> {
    await this.letters.update(id, {
      status: 'delivered',
      deliveredAt: new Date(),
      syncStatus: 'pending'
    });
    this.syncWithServer();
  }

  private async syncWithServer(): Promise<void> {
    // TODO: Implement server synchronization
    const pendingSync = await this.letters
      .where('syncStatus')
      .equals('pending')
      .toArray();

    // Здесь будет логика синхронизации с сервером
    // При успешной синхронизации обновляем статус на 'synced'
    // При ошибке - на 'failed'
  }
}

export const db = new MailDatabase(); 