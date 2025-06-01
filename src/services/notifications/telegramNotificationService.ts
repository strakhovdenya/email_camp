// Заглушка для отправки telegram-уведомлений
export async function sendTelegramNotification() {
  // Здесь могла бы быть интеграция с Telegram Bot API
  // Сейчас всегда возвращаем успех
  return { success: true };
}
