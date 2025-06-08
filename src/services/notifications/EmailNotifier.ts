import { INotifier, NotificationMessage } from './types';
import { sendEmailNotification } from './emailNotificationService';

type NotifierUser = {
  id: string;
  email?: string;
  telegram_chat_id?: string | null;
  channels_for_notification: string[];
};

export class EmailNotifier implements INotifier {
  async send(user: NotifierUser, message: NotificationMessage) {
    if (!user.email) return { success: false, error: 'No email' };
    return await sendEmailNotification({
      letterId: message.letterId,
      recipientEmail: user.email,
      letterNote: message.letterNote,
      photoUrl: message.photoUrl,
    });
  }
}
