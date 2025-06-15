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
      return NextResponse.json({ error: 'Не указан ID письма', type: 'error' }, { status: 400 });
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
        { error: 'Ошибка при выдаче письма', type: 'error' },
        { status: 500 }
      );
    }
    return NextResponse.json({ data, type: 'success', message: 'Письмо выдано!' });
  } catch (e) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', type: 'error' },
      { status: 500 }
    );
  }
}
