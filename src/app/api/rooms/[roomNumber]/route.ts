import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { roomNumber: string } }
) {
  try {
    const { roomNumber } = params;

    if (!roomNumber) {
      return NextResponse.json({ error: 'Room number is required' }, { status: 400 });
    }

    const supabase = supabaseService.getAdminClient();

    const { data: room, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_number', roomNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      }
      console.error('Error fetching room:', error);
      return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: room });
  } catch (error) {
    console.error('Error in GET /api/rooms/[roomNumber]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 