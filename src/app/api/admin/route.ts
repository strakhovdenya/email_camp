import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseService.getAdminClient();

    // Получаем статистику
    const [
      { count: totalUsers, error: usersError },
      { count: totalRooms, error: roomsError },
      { count: totalLetters, error: lettersError },
      { count: deliveredLetters, error: deliveredError },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('rooms').select('*', { count: 'exact', head: true }),
      supabase.from('letters').select('*', { count: 'exact', head: true }),
      supabase
        .from('letters')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'delivered'),
    ]);

    if (usersError) throw usersError;
    if (roomsError) throw roomsError;
    if (lettersError) throw lettersError;
    if (deliveredError) throw deliveredError;

    return NextResponse.json({
      success: true,
      data: {
        total_users: totalUsers || 0,
        total_rooms: totalRooms || 0,
        total_letters: totalLetters || 0,
        delivered_letters: deliveredLetters || 0,
        undelivered_letters: (totalLetters || 0) - (deliveredLetters || 0),
      },
    });
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
