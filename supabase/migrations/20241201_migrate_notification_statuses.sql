-- Миграция для переноса статусов уведомлений из старых полей в notification_statuses
-- Дата: 2024-12-01

-- Обновляем записи с отправленными email уведомлениями
UPDATE letters 
SET notification_statuses = notification_statuses || jsonb_build_object('email', 'sent')
WHERE (email_notified = true OR recipient_notified = true) 
  AND (notification_statuses->>'email' IS NULL OR notification_statuses = '{}');

-- Обновляем записи с отправленными telegram уведомлениями  
UPDATE letters 
SET notification_statuses = notification_statuses || jsonb_build_object('telegram', 'sent')
WHERE telegram_notified = true 
  AND (notification_statuses->>'telegram' IS NULL OR notification_statuses = '{}');

-- Проверяем результат миграции
-- SELECT id, email_notified, telegram_notified, recipient_notified, notification_statuses 
-- FROM letters 
-- WHERE email_notified = true OR telegram_notified = true OR recipient_notified = true; 