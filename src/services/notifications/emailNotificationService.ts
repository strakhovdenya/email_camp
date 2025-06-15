import { Resend } from 'resend';
import { supabaseService } from '@/lib/supabase/server';
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
    const supabase = supabaseService.getAdminClient();

    // Получаем письмо
    const { data: letter, error: letterError } = await supabase
      .from('letters')
      .select('*')
      .eq('id', letterId)
      .single();
    if (letterError || !letter) {
      console.error('Letter not found:', letterError);
      return { success: false, error: 'Letter not found' };
    }

    // Получаем комнату
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('room_number')
      .eq('id', letter.room_id)
      .single();
    if (roomError || !room) {
      console.error('Room not found:', roomError);
      return { success: false, error: 'Room not found' };
    }

    // Получаем имя пользователя, если есть user_id
    let recipientName = '';
    if (letter.user_id) {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('first_name, last_name')
        .eq('id', letter.user_id)
        .single();
      if (!userError && user) {
        recipientName = `${user.first_name} ${user.last_name}`.trim();
      }
    }

    // Формируем subject
    let subject = `Room ${room.room_number}`;
    if (recipientName && letterNote) {
      subject = `Room ${room.room_number} for ${recipientName}: ${letterNote}`;
    } else if (recipientName) {
      subject = `Room ${room.room_number} for ${recipientName}`;
    } else if (letterNote) {
      subject = `Room ${room.room_number}: ${letterNote}`;
    }

    // Формируем html
    const html = letterHtmlTemplate({
      roomNumber: room.room_number,
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
      await supabase.from('letters').update({ recipient_notified: false }).eq('id', letterId);
      return { success: false, error: emailError.message };
    }

    await supabase.from('letters').update({ recipient_notified: true }).eq('id', letterId);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Unexpected error in sendEmailNotification:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
