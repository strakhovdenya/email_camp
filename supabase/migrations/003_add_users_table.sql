-- Создаём тип для роли пользователя
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'camper');

-- Создаём таблицу пользователей
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  room_id BIGINT NOT NULL REFERENCES rooms(id),
  role user_role NOT NULL DEFAULT 'camper',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  channels_for_notification TEXT[]
); 