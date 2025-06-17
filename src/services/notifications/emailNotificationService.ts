import { Resend } from 'resend';
import { getDataSource } from '@/datasources/factory';
import { letterHtmlTemplate } from '@/lib/emailTemplates';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailNotification({
  letterId,
  recipientEmail,
  letterNote,
  photoUrl,
}: {
  letterId: string;
  recipientEmail: string;
  letterNote?: string;
  photoUrl?: string;
}) {
  try {
    const dataSource = getDataSource();

    // Получаем письмо
    const letter = await dataSource.letters.getLetterById(letterId);
    if (!letter) {
      console.error('Letter not found:', letterId);
      return { success: false, error: 'Letter not found' };
    }

    // Получаем номер комнаты из письма (уже есть в LetterWithRelations)
    const roomNumber = letter.rooms?.room_number;
    if (!roomNumber) {
      console.error('Room not found in letter:', letter.room_id);
      return { success: false, error: 'Room not found' };
    }

    // Получаем имя пользователя, если есть user_id
    let recipientName = '';
    if (letter.user_id) {
      const user = await dataSource.users.getUserById(letter.user_id);
      if (user) {
        recipientName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
      }
    }

    // Формируем subject
    let subject = `Room ${roomNumber}`;
    if (recipientName && letterNote) {
      subject = `Room ${roomNumber} for ${recipientName}: ${letterNote}`;
    } else if (recipientName) {
      subject = `Room ${roomNumber} for ${recipientName}`;
    } else if (letterNote) {
      subject = `Room ${roomNumber}: ${letterNote}`;
    }

    // Формируем html
    const html = letterHtmlTemplate({
      roomNumber: roomNumber,
      note: letterNote,
      photoUrl,
      createdAt: letter.created_at,
      userName: recipientName,
    });

    // Отправляем email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Mail <noreply@resend.dev>',
      to: recipientEmail,
      subject: subject,
      html: html,
    });

    if (emailError) {
      console.error('Email sending error:', emailError);
      return { success: false, error: emailError.message };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Unexpected error in sendEmailNotification:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
