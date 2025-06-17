import { NotificationDispatcher } from './NotificationDispatcher';
import { EmailNotifier } from './EmailNotifier';
import { TelegramNotifier } from './TelegramNotifier';
import { getDataSource } from '@/datasources/factory';
import type { ChannelType, NotificationMessage } from './types';

export async function notifyUser({
  user,
  letterId,
  letterNote,
  photoUrl,
}: {
  user: {
    id: string;
    email?: string;
    telegram_chat_id?: string;
    channels_for_notification: string[];
  };
  letterId: string;
  letterNote?: string;
  photoUrl?: string;
}) {
  const message: NotificationMessage = { letterId, letterNote, photoUrl };
  const channels = user.channels_for_notification as ChannelType[];

  const dispatcher = new NotificationDispatcher({
    email: new EmailNotifier(),
    telegram: new TelegramNotifier(),
  });

  // Отправляем уведомления
  const results = await dispatcher.notify(user, message, channels);

  // Формируем статусы для notification_statuses
  const notificationStatuses: Record<string, 'sent' | 'failed'> = {};
  
  // Проверяем результаты для каждого канала
  Object.entries(results).forEach(([channel, result]) => {
    if (result) {
      notificationStatuses[channel] = result.success ? 'sent' : 'failed';
    }
  });

  // Используем DataSource для обновления статусов уведомлений
  const dataSource = getDataSource();
  await dataSource.letters.updateNotificationStatuses(letterId, notificationStatuses);
  
  return results;
}
