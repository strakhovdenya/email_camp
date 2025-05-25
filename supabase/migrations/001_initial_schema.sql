-- Create rooms table first (because letters will reference it)
CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY,
    room_number TEXT NOT NULL UNIQUE,
    telegram_chat_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create letters table with foreign key
CREATE TABLE letters (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'delivered')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    sync_status TEXT NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed')),
    note TEXT,
    photo_url TEXT
);

-- Create indexes for faster lookups
CREATE INDEX idx_letters_room_id ON letters(room_id);
CREATE INDEX idx_letters_status ON letters(status);
CREATE INDEX idx_letters_sync_status ON letters(sync_status);
CREATE INDEX idx_rooms_room_number ON rooms(room_number);

-- Enable Row Level Security
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON letters FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON letters FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON letters FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON rooms FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON rooms FOR UPDATE USING (true);

-- Create view for letters with room information
-- Обновляем view letters_with_rooms: добавляем first_name и last_name пользователя
CREATE OR REPLACE VIEW letters_with_rooms AS
SELECT 
    l.id,
    l.room_id,
    l.status,
    l.created_at,
    l.delivered_at,
    l.sync_status,
    l.note,
    l.photo_url,
    l.user_id,
    u.first_name,
    u.last_name,
    r.room_number,
    r.telegram_chat_id
FROM letters l
JOIN rooms r ON l.room_id = r.id
LEFT JOIN users u ON l.user_id = u.id;


-- Включить Row Level Security (RLS) для таблицы users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Разрешить чтение всем пользователям
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT
  USING (true);

-- Разрешить добавление всем пользователям
CREATE POLICY "Enable insert for all users" ON users
  FOR INSERT
  WITH CHECK (true);

-- Разрешить обновление всем пользователям
CREATE POLICY "Enable update for all users" ON users
  FOR UPDATE
  USING (true);

ALTER TABLE letters ADD COLUMN user_id BIGINT REFERENCES users(id);