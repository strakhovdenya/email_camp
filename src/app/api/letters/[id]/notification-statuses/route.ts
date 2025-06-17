import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { notification_statuses } = await request.json();
    const letterId = params.id;

    if (!letterId) {
      return NextResponse.json({ error: 'Letter ID is required' }, { status: 400 });
    }

    if (!notification_statuses || typeof notification_statuses !== 'object') {
      return NextResponse.json({ error: 'Valid notification_statuses object is required' }, { status: 400 });
    }

    const supabase = supabaseService.getAdminClient();

    const { error } = await supabase
      .from('letters')
      .update({ notification_statuses })
      .eq('id', letterId);

    if (error) {
      console.error('Error updating notification statuses:', error);
      return NextResponse.json({ error: 'Failed to update notification statuses' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in notification statuses update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
 
 
 