import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseService.getRouteHandlerClient();

    const { data: rooms, error } = await supabase
      .from('rooms')
      .select(
        `
        id,
        room_number,
        letters (
          id,
          status,
          sync_status,
          note,
          photo_url,
          created_at,
          recipient_notified
        )
      `
      )
      .order('room_number');

    if (error) {
      return NextResponse.json(
        { error: 'Ошибка при получении данных', type: 'error' },
        { status: 500 }
      );
    }

    // Преобразуем данные для удобства использования на клиенте
    const roomsWithLetters = rooms.map((room) => ({
      id: room.id,
      room_number: room.room_number,
      letters: room.letters || [],
      total_letters: room.letters?.length || 0,
      delivered_count: room.letters?.filter((letter) => letter.status === 'delivered').length || 0,
      undelivered_count: room.letters?.filter((letter) => letter.status === 'pending').length || 0,
    }));

    return NextResponse.json({ data: roomsWithLetters, type: 'success' });
  } catch (e) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', type: 'error' },
      { status: 500 }
    );
  }
}
