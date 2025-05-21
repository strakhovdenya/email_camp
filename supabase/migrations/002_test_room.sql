-- Добавляем тестовую комнату
INSERT INTO rooms (room_number, telegram_chat_id)
VALUES ('101', NULL)
ON CONFLICT (room_number) DO NOTHING; 