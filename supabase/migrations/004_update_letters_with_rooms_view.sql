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