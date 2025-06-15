-- Удаление старых полей уведомлений из таблицы letters
-- Дата: 2024-12-01
-- ВНИМАНИЕ: Запускать только после переноса данных в notification_statuses!

-- Удаляем старые столбцы
ALTER TABLE letters DROP COLUMN IF EXISTS email_notified;
ALTER TABLE letters DROP COLUMN IF EXISTS telegram_notified;
ALTER TABLE letters DROP COLUMN IF EXISTS recipient_notified; 