import { sendEmailNotification } from './emailNotificationService';
import { sendTelegramNotification } from './telegramNotificationService';

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

  if (params.user.channels_for_notification.includes('email')) {
    results.email = await sendEmailNotification({
      letterId: params.letterId,
      recipientEmail: params.user.email,
      letterNote: params.letterNote,
      photoUrl: params.photoUrl,
    });
  }

  if (params.user.channels_for_notification.includes('telegram') && params.user.telegram_chat_id) {
    results.telegram = await sendTelegramNotification();
  }

  return results;
}
