import { supabaseService } from '@/lib/supabase/server';
import { NotificationDispatcher } from './NotificationDispatcher';
import { EmailNotifier } from './EmailNotifier';
import { TelegramNotifier } from './TelegramNotifier';
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
  const supabase = supabaseService.getAdminClient();
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

  // Сохраняем только новый формат статусов уведомлений
  const updates = {
    notification_statuses: notificationStatuses,
  };

  const { error: updateError } = await supabase.from('letters').update(updates).eq('id', letterId);

  if (updateError) {
    console.error('Error updating notification statuses:', updateError);
    throw new Error('Failed to update notification statuses');
  }
  
  return results;
}
