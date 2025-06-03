import { INotifier, NotificationMessage } from './types';

export class TelegramNotifier implements INotifier {
  async send(
    user: {
      id: number;
      email?: string;
      telegram_chat_id?: string | null;
      channels_for_notification: string[];
    },
    message: NotificationMessage
  ): Promise<{ success: boolean; error?: string }> {
    // TODO: Implement Telegram notification
    console.log('Telegram notification would be sent to user:', user.id, 'with message:', message);
    return { success: true };
  }
}
