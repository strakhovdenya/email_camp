import type { IUserDataSource } from './IUserDataSource';
import type { ILetterDataSource } from './ILetterDataSource';
import type { IRoomDataSource } from './IRoomDataSource';

// Главный интерфейс для всех операций с данными
export interface IDataSource {
  users: IUserDataSource;
  letters: ILetterDataSource;
  rooms: IRoomDataSource;
  
  // Методы инициализации и очистки
  initialize(): Promise<void>;
  disconnect(): Promise<void>;
  
  // Проверка связи
  healthCheck(): Promise<boolean>;
}

// Re-export всех интерфейсов для удобства
export type { IUserDataSource } from './IUserDataSource';
export type { ILetterDataSource } from './ILetterDataSource';
export type { IRoomDataSource } from './IRoomDataSource';

// Re-export типов входных данных
export type { CreateUserInput, UpdateUserInput } from './IUserDataSource';
export type { CreateLetterInput, UpdateLetterInput } from './ILetterDataSource';
export type { CreateRoomInput, UpdateRoomInput } from './IRoomDataSource'; 
 
 
 