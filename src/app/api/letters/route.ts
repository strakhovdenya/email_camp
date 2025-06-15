import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function POST(request: Request) {
  console.log('Headers:', request.headers.get('content-type'));
  try {
    const supabase = supabaseService.getAdminClient();
    const body = await request.json();
    const { room_number, note, photo_url, user_id } = body;

    // Получаем room_id по номеру комнаты
    const { data: room, error: roomError } = await supabase
  .from('rooms')
  .select('id')
  .eq('room_number', room_number).maybeSingle();

const roomId = Array.isArray(room) ? room[0]?.id : room?.id;

if (roomError || !roomId) {
      return NextResponse.json({ error: 'Комната не найдена', type: 'error' }, { status: 400 });
    }

    // Добавляем письмо
    const { data: insertData, error: insertError } = await supabase
      .from('letters')
      .insert([
        {
          room_id: roomId,
          status: 'pending',
          sync_status: 'pending',
          note: note ?? null,
          photo_url: photo_url ?? null,
          user_id: user_id ?? null,
        },
      ]).select('*');
    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { error: 'Ошибка при добавлении письма', type: 'error' },
        { status: 500 }
      );
    }

    // Получаем только что добавленное письмо по id
    type InsertedLetter = { id: string };
    let insertedId: string | undefined;
    if (Array.isArray(insertData) && (insertData as InsertedLetter[]).length > 0) {
      insertedId = (insertData as InsertedLetter[])[0].id;
    }
    let data = null;
    if (insertedId) {
      const { data: selected, error: selectError } = await supabase
        .from('letters')
        .select('*')
        .eq('id', insertedId)
        .single();
      if (selectError) {
        console.error(selectError);
      } else {
        data = selected;
      }
    }

    return NextResponse.json({
      data,
      type: 'success',
      message: 'Письмо успешно добавлено!',
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', type: 'error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const { searchParams } = new URL(request.url);
    const room_number = searchParams.get('room_number');
    let query = supabase.from('letters').select('*');
    if (room_number) {
      // Получаем room_id по номеру комнаты
      const { data: room } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_number', room_number)
        .single();
      if (room) {
        query = query.eq('room_id', room.id);
      }
    }
    const { data, error } = await query;
    if (error) {
      return NextResponse.json(
        { error: 'Ошибка при получении писем', type: 'error' },
        { status: 500 }
      );
    }
    return NextResponse.json({ data, type: 'success' });
  } catch (e) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', type: 'error' },
      { status: 500 }
    );
  }
}
