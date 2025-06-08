export type ChannelType = 'email' | 'telegram';

export interface NotificationMessage {
  letterId: string;
  letterNote?: string;
  photoUrl?: string;
}

export interface INotifier {
  send(
    user: {
      id: string;
      email?: string;
      telegram_chat_id?: string | null;
      channels_for_notification: string[];
    },
    message: NotificationMessage
  ): Promise<{ success: boolean; error?: string }>;
}
