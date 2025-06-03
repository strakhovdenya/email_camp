import { INotifier, NotificationMessage } from './types';
import { sendTelegramNotification } from './telegramNotificationService';

export class TelegramNotifier implements INotifier {
  async send(
    user: {
      id: number;
      email?: string;
      telegram_chat_id?: string | null;
      channels_for_notification: string[];
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _message: NotificationMessage
  ): Promise<{ success: boolean; error?: string }> {
    if (!user.telegram_chat_id) {
      return { success: false, error: 'No telegram_chat_id' };
    }
    return await sendTelegramNotification();
  }
}
