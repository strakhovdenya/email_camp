import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomNumber = searchParams.get('roomNumber');

    if (!roomNumber) {
      return NextResponse.json(
        { success: false, error: 'Room number is required' },
        { status: 400 }
      );
    }

    const supabase = supabaseService.getRouteHandlerClient();

    // Получаем id комнаты по номеру
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('room_number', roomNumber)
      .single();

    if (roomError || !room) {
      return NextResponse.json({ success: false, error: 'Комната не найдена' }, { status: 404 });
    }

    // Получаем письма этой комнаты
    const { data, error } = await supabase
      .from('letters')
      .select('*, rooms(room_number), users(id, first_name, last_name, email)')
      .eq('room_id', room.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data: data || [] });
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
