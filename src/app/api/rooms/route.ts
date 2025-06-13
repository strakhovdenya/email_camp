import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('room_number', { ascending: true });

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

export async function POST(request: Request) {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const data = await request.json();

    if (data.id) {
      const { error } = await supabase
        .from('rooms')
        .update({
          room_number: data.room_number,
        })
        .eq('id', data.id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    } else {
      const { error } = await supabase.from('rooms').insert([
        {
          room_number: data.room_number,
        },
      ]);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }
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

export async function DELETE(request: Request) {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('id');

    if (!roomId) {
      return NextResponse.json({ success: false, error: 'Room ID is required' }, { status: 400 });
    }

    // Проверяем, есть ли пользователи в этой комнате
    const { count, error: userError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('room_id', roomId);

    if (userError) throw userError;

    if (count && count > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Сначала удалите или переместите всех пользователей из этой комнаты',
          users_exist: true,
        },
        { status: 400 }
      );
    }

    // Если пользователей нет — удаляем комнату
    const { error } = await supabase.from('rooms').delete().eq('id', roomId);
    if (error) throw error;

    return NextResponse.json({ success: true });
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
