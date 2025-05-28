import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { letterHtmlTemplate } from '@/lib/emailTemplates';

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

    // Use the template for the email HTML
    const html = letterHtmlTemplate({
      roomNumber: room.room_number,
      note: letterNote,
      photoUrl,
      createdAt: letter.created_at,
      userName: recipientName,
    });

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Mail <noreply@resend.dev>',
      to: recipientEmail,
      subject: subject,
      html: html,
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
