import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/services/notifications/emailNotificationService';

export async function POST(request: Request) {
  try {
    const { letterId, recipientEmail, letterNote, photoUrl } = await request.json();

    if (!letterId || !recipientEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendEmailNotification({
      letterId,
      recipientEmail,
      letterNote,
      photoUrl,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
