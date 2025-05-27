import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { letterId, recipientEmail, letterNote, photoUrl } = await request.json();

    if (!letterId || !recipientEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: letter, error: letterError } = await supabase
      .from('letters')
      .select('*')
      .eq('id', letterId)
      .single();

    if (letterError || !letter) {
      return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
    }

    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('room_number')
      .eq('id', letter.room_id)
      .single();

    if (roomError || !room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Get recipient name if user_id exists
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
    // Short subject in English
    let subject = `Room ${room.room_number}`;
    if (recipientName && letterNote) {
      subject = `Room ${room.room_number} for ${recipientName}: ${letterNote}`;
    } else if (recipientName) {
      subject = `Room ${room.room_number} for ${recipientName}`;
    } else if (letterNote) {
      subject = `Room ${room.room_number}: ${letterNote}`;
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Mail <noreply@resend.dev>',
      to: recipientEmail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #1e40af; margin-bottom: 20px;">You have a new letter!</h1>
          <p style="color: #374151; margin-bottom: 16px;">A letter is waiting for you in room ${room.room_number}.</p>
          ${letterNote ? `<p style=\"color: #374151; margin-bottom: 16px;\"><strong>Description:</strong> ${letterNote}</p>` : ''}
          ${photoUrl ? `<p style=\"color: #374151; margin-bottom: 16px;\"><strong>Photo:</strong> <a href=\"${photoUrl}\" style=\"color: #2563eb;\">View photo</a></p>` : ''}
          <p style="color: #374151; margin-bottom: 16px;"><strong>Received at:</strong> ${new Date(letter.created_at).toLocaleString()}</p>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      // Update notification status to false on error
      await supabase.from('letters').update({ recipient_notified: false }).eq('id', letterId);

      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Update notification status to true on success
    await supabase.from('letters').update({ recipient_notified: true }).eq('id', letterId);

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
