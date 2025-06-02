import { sendEmailNotification } from './emailNotificationService';
import { sendTelegramNotification } from './telegramNotificationService';
import { supabase } from '@/lib/supabase';

type NotifyUserParams = {
  user: {
    email: string;
    channels_for_notification: string[];
    telegram_chat_id?: string | null;
  };
  letterId: number;
  letterNote?: string;
  photoUrl?: string;
};

export async function notifyUser(params: NotifyUserParams) {
  const results: Record<string, unknown> = {};
  const notificationStatuses: Record<string, 'sent' | 'failed'> = {};

  if (params.user.channels_for_notification.includes('email')) {
    const emailResult = await sendEmailNotification({
      letterId: params.letterId,
      recipientEmail: params.user.email,
      letterNote: params.letterNote,
      photoUrl: params.photoUrl,
    });
    results.email = emailResult;
    notificationStatuses.email = emailResult.success ? 'sent' : 'failed';
  }

  if (params.user.channels_for_notification.includes('telegram') && params.user.telegram_chat_id) {
    const telegramResult = await sendTelegramNotification();
    results.telegram = telegramResult;
    notificationStatuses.telegram = telegramResult.success ? 'sent' : 'failed';
  }

  // Обновляем поле notification_statuses в письме
  await supabase
    .from('letters')
    .update({ notification_statuses: notificationStatuses })
    .eq('id', params.letterId);

  return results;
}
