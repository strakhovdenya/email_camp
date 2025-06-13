import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('id, room_number, letters(id, status)');
    if (error) throw error;
    const result = (rooms || []).map((room) => ({
      ...room,
      total_letters: room.letters.length,
      delivered_count: room.letters.filter((l) => l.status === 'delivered').length,
      undelivered_count: room.letters.filter((l) => l.status !== 'delivered').length,
    }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
