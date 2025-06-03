import { ChannelType, INotifier, NotificationMessage } from './types';

export class NotificationDispatcher {
  private strategies: Record<ChannelType, INotifier>;

  constructor(strategies: Record<ChannelType, INotifier>) {
    this.strategies = strategies;
  }

  async notify(
    user: {
      id: number;
      email?: string;
      telegram_chat_id?: string | null;
      channels_for_notification: string[];
    },
    message: NotificationMessage,
    channels: ChannelType[]
  ): Promise<Record<ChannelType, { success: boolean; error?: string }>> {
    const results: Partial<Record<ChannelType, { success: boolean; error?: string }>> = {};
    await Promise.all(
      channels.map(async (ch) => {
        const notifier = this.strategies[ch];
        if (!notifier) {
          results[ch] = { success: false, error: 'No strategy' };
          return;
        }
        try {
          results[ch] = await notifier.send(user, message);
        } catch (err) {
          results[ch] = { success: false, error: String(err) };
        }
      })
    );
    return results as Record<ChannelType, { success: boolean; error?: string }>;
  }
}
