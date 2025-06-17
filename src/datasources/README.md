# DataSource Architecture

Архитектура абстракции источников данных позволяет легко переключаться между различными источниками данных (Supabase, Mock, PostgreSQL, MySQL) изменением одной настройки.

## 📁 Структура

```
src/datasources/
├── interfaces/           # Абстрактные интерфейсы
│   ├── IDataSource.ts    # Главный интерфейс
│   ├── IUserDataSource.ts
│   ├── ILetterDataSource.ts
│   └── IRoomDataSource.ts
├── supabase/            # Реализация для Supabase
│   └── SupabaseDataSource.ts
├── mock/                # Mock данные
│   └── MockDataSource.ts
├── factory.ts           # Фабрика для выбора источника
└── README.md
```

## 🔧 Конфигурация

Переключение источника данных происходит в файле `src/config/datasource.ts`:

```typescript
// НАСТРОЙКА: Измените эту переменную для переключения источника данных
export const CURRENT_DATASOURCE: DataSourceType = 'supabase'; // или 'mock'
```

### Доступные источники:

- **`supabase`** - Использует существующие API routes к Supabase
- **`mock`** - Локальные mock данные с имитацией задержек API
- **`postgresql`** - Прямое подключение к PostgreSQL (не реализовано)
- **`mysql`** - Прямое подключение к MySQL (не реализовано)

## 🎯 Использование

### 1. Импорт хуков

```typescript
import { useUsersDataSource, useUserMutationsDataSource } from '@/hooks/useUsersDataSource';
import { useLettersDataSource, useLetterMutationsDataSource } from '@/hooks/useLettersDataSource';
import { useRoomsDataSource, useRoomMutationsDataSource } from '@/hooks/useRoomsDataSource';
```

### 2. Использование в компонентах

```typescript
function MyComponent() {
  // Получение данных
  const { data: users, isLoading } = useUsersDataSource();
  const { data: letters } = useLettersByRoomDataSource('101');
  
  // Мутации
  const { createUser, updateUser, deleteUser } = useUserMutationsDataSource();
  
  const handleCreateUser = async () => {
    await createUser.mutateAsync({
      first_name: 'Иван',
      last_name: 'Петров',
      email: 'ivan@example.com',
      room_number: '101',
    });
  };
  
  return (
    // JSX...
  );
}
```

### 3. Прямое использование DataSource

```typescript
import { getDataSource } from '@/datasources/factory';

const dataSource = getDataSource();

// Работа с пользователями
const users = await dataSource.users.getUsers();
const user = await dataSource.users.createUser({
  first_name: 'Иван',
  last_name: 'Петров',
  email: 'ivan@example.com',
});

// Работа с письмами
const letters = await dataSource.letters.getLetters();
const stats = await dataSource.letters.getLetterStats();
```

## 🔌 Интерфейсы

### IUserDataSource
```typescript
interface IUserDataSource {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUsersByRoom(roomNumber: string): Promise<User[]>;
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(data: UpdateUserInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  searchUsers(query: string): Promise<User[]>;
}
```

### ILetterDataSource
```typescript
interface ILetterDataSource {
  getLetters(): Promise<LetterWithRelations[]>;
  getLetterById(id: string): Promise<LetterWithRelations | null>;
  getLettersByRoom(roomNumber: string): Promise<LetterWithRelations[]>;
  createLetter(data: CreateLetterInput): Promise<Letter>;
  updateLetter(data: UpdateLetterInput): Promise<Letter>;
  deleteLetter(id: string): Promise<void>;
  markAsDelivered(id: string): Promise<Letter>;
  getLetterStats(): Promise<{
    total: number;
    pending: number;
    delivered: number;
  }>;
}
```

### IRoomDataSource
```typescript
interface IRoomDataSource {
  getRooms(): Promise<Room[]>;
  getRoomById(id: string): Promise<Room | null>;
  getRoomByNumber(roomNumber: string): Promise<Room | null>;
  createRoom(data: CreateRoomInput): Promise<Room>;
  updateRoom(data: UpdateRoomInput): Promise<Room>;
  deleteRoom(id: string): Promise<void>;
  getRoomsWithLetters(): Promise<Array<Room & { letterCount: number }>>;
}
```

## 🚀 Добавление новых источников данных

### 1. Создайте новую реализацию

```typescript
// src/datasources/postgresql/PostgreSQLDataSource.ts
export class PostgreSQLDataSource implements IDataSource {
  // Реализация интерфейсов...
}
```

### 2. Обновите фабрику

```typescript
// src/datasources/factory.ts
case 'postgresql':
  dataSourceInstance = new PostgreSQLDataSource();
  break;
```

### 3. Обновите конфигурацию

```typescript
// src/config/datasource.ts
export const CURRENT_DATASOURCE: DataSourceType = 'postgresql';
```

## 🧪 Тестирование

Для тестирования разных источников данных:

1. **Mock данные** - быстрые тесты с предсказуемыми данными
2. **Supabase** - интеграционные тесты с реальной БД
3. **Сброс состояния** - используйте `resetDataSource()` в тестах

```typescript
import { resetDataSource } from '@/datasources/factory';

beforeEach(() => {
  resetDataSource(); // Сброс singleton для чистых тестов
});
```

## 💡 Преимущества архитектуры

1. **Единый интерфейс** - одинаковые методы для всех источников
2. **Легкое переключение** - одна настройка в конфиге
3. **Тестируемость** - mock данные для быстрых тестов
4. **Расширяемость** - легко добавлять новые источники
5. **Типобезопасность** - полная поддержка TypeScript
6. **Производительность** - singleton паттерн, кеширование через React Query

## 🔧 Миграция с существующих хуков

Старые хуки (например, `useUsers`) можно постепенно заменять на новые (`useUsersDataSource`). Оба подхода могут сосуществовать во время миграции.

---

**Примечание**: Для демонстрации архитектуры используйте компонент `DataSourceExample` на странице `/showcase/datasource`. 
 
 
 
 