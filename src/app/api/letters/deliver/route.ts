import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { letterId } = await request.json();
    if (!letterId) {
      return NextResponse.json({ success: false, error: 'Не указан ID письма' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('letters')
      .update({
        status: 'delivered',
        delivered_at: new Date().toISOString(),
      })
      .eq('id', letterId)
      .select(`
        *,
        users (
          id,
          first_name,
          last_name
        )
      `)
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Ошибка при выдаче письма' },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data, message: 'Письмо выдано!' });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
