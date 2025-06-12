import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { room_number, note, photo_url, user_id } = body;

    // Получаем room_id по номеру комнаты
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('room_number', room_number)
      .single();
    if (roomError) {
      return NextResponse.json({ error: 'Комната не найдена', type: 'error' }, { status: 400 });
    }

    // Добавляем письмо
    const { data, error } = await supabase
      .from('letters')
      .insert([
        {
          room_id: room.id,
          status: 'pending',
          sync_status: 'pending',
          note: note ?? null,
          photo_url: photo_url ?? null,
          user_id: user_id ?? null,
          recipient_notified: false,
        },
      ])
      .select()
      .single();
    if (error) {
      return NextResponse.json(
        { error: 'Ошибка при добавлении письма', type: 'error' },
        { status: 500 }
      );
    }

    // Можно добавить вызов уведомления здесь, если нужно
    // ...

    return NextResponse.json({
      success: true,
      data,
      type: 'success',
      message: 'Письмо успешно добавлено!',
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', type: 'error' },
      { status: 500 }
    );
  }
}

// (Опционально) GET: получение писем
export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
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
