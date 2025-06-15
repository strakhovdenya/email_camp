import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    const { data, error } = await supabase
      .from('users')
      .select('*, room:rooms(room_number)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
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
        .from('users')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          room_id: data.room_id,
          role: data.role,
          channels_for_notification: data.channels_for_notification,
          telegram_chat_id: data.telegram_chat_id,
        })
        .eq('id', data.id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    } else {
      const { error } = await supabase.from('users').insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          room_id: data.room_id,
          role: data.role,
          channels_for_notification: data.channels_for_notification,
          telegram_chat_id: data.telegram_chat_id,
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
    const userId = searchParams.get('id');
    const cascade = searchParams.get('cascade') === 'true';

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (cascade) {
      const { error: lettersError } = await supabase.from('letters').delete().eq('user_id', userId);

      if (lettersError) throw lettersError;
    } else {
      const { count, error } = await supabase
        .from('letters')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) throw error;

      if (count && count > 0) {
        return NextResponse.json({
          success: false,
          requiresCascade: true,
        });
      }
    }

    const { error: userError } = await supabase.from('users').delete().eq('id', userId);

    if (userError) throw userError;

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
