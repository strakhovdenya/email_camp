import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { letterHtmlTemplate } from '@/lib/emailTemplates';

const resend = new Resend('re_DsbyqpLV_ModnXYRf3527oVihYUDozwhe');

export async function POST(req: NextRequest) {
  const { roomNumber, note, photoUrl, createdAt, userEmail, userName } = await req.json();
  const html = letterHtmlTemplate({ roomNumber, note, photoUrl, createdAt, userName });

  try {
    const subject =
      note && note.trim()
        ? `Новое письмо для комнаты ${roomNumber} (${note.trim()})`
        : `Новое письмо для комнаты ${roomNumber}`;
    const data = await resend.emails.send({
      from: 'noreply@resend.dev', // для тестов
      to: userEmail || 'delivered@resend.dev',
      subject,
      html,
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
