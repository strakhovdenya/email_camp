import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_request: Request, { params }: { params: { roomNumber: string } }) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const roomNumber = params.roomNumber;
    // Получаем id комнаты по номеру
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('room_number', roomNumber)
      .single();
    if (roomError || !room) {
      return NextResponse.json({ error: 'Комната не найдена' }, { status: 404 });
    }
    // Получаем пользователей этой комнаты
    const { data, error } = await supabase
      .from('users')
      .select('*, room:rooms(room_number)')
      .eq('room_id', room.id);
    if (error) {
      return NextResponse.json({ error: 'Ошибка при получении пользователей' }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
