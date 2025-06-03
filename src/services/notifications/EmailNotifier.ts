import { INotifier, NotificationMessage } from './types';
import { sendEmailNotification } from './emailNotificationService';

type NotifierUser = Parameters<INotifier['send']>[0];

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
