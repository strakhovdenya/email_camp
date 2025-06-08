-- Включить расширение для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Тип для роли пользователя
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'camper');

-- Таблица комнат
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number TEXT NOT NULL UNIQUE,
  telegram_chat_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица пользователей
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  room_id uuid REFERENCES rooms(id),
  role user_role NOT NULL DEFAULT 'camper',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  channels_for_notification TEXT[]
);

-- Таблица писем
CREATE TABLE letters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'delivered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at TIMESTAMPTZ,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed')),
  note TEXT,
  photo_url TEXT,
  user_id uuid REFERENCES users(id),
  notification_statuses jsonb DEFAULT '{}'
);

-- Индексы
CREATE INDEX idx_letters_room_id ON letters(room_id);
CREATE INDEX idx_letters_status ON letters(status);
CREATE INDEX idx_letters_sync_status ON letters(sync_status);
CREATE INDEX idx_rooms_room_number ON rooms(room_number);

-- Включить Row Level Security
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Политики доступа (оставлены как были)
CREATE POLICY "Enable read access for all users" ON letters FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON letters FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON letters FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON letters FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON rooms FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON rooms FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON rooms FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON users FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON users FOR DELETE USING (true); 