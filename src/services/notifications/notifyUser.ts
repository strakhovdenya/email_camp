import { EmailNotifier } from './EmailNotifier';
import { TelegramNotifier } from './TelegramNotifier';
import { NotificationDispatcher } from './NotificationDispatcher';
import type { ChannelType, NotificationMessage } from './types';
import { supabase } from '@/lib/supabase';

const dispatcher = new NotificationDispatcher({
  email: new EmailNotifier(),
  telegram: new TelegramNotifier(),
});

export async function notifyUser({
  user,
  letterId,
  letterNote,
  photoUrl,
}: {
  user: {
    id: number;
    email?: string;
    telegram_chat_id?: string | null;
    channels_for_notification: string[];
  };
  letterId: number;
  letterNote?: string;
  photoUrl?: string;
}) {
  const message: NotificationMessage = { letterId, letterNote, photoUrl };
  const channels = user.channels_for_notification as ChannelType[];
  const result = await dispatcher.notify(user, message, channels);

  // Сохраняем статусы в letter
  const notificationStatuses: Record<string, 'sent' | 'failed'> = {};
  for (const ch of channels) {
    const chResult = result[ch];
    notificationStatuses[ch] = chResult && chResult.success ? 'sent' : 'failed';
  }
  await supabase
    .from('letters')
    .update({ notification_statuses: notificationStatuses })
    .eq('id', letterId);

  return result;
}
