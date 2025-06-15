import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: { roomNumber: string } }) {
  const supabase = supabaseService.getAdminClient();
  const roomNumber = params.roomNumber;

  const { data: users, error } = await supabase
    .from('users')
    .select(
      `
      *,
      room:rooms!inner(room_number)
    `
    )
    .eq('room.room_number', roomNumber);

  if (error) {
    return NextResponse.json({ error: 'Ошибка получения пользователей' }, { status: 500 });
  }

  return NextResponse.json({ data: users });
}
