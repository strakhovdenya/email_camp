import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseService.getRouteHandlerClient();
    
    // Получаем текущего пользователя из auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Получаем роль из user_metadata или из таблицы users
    let role = user.user_metadata?.role;
    
    if (!role) {
      const { data: userRow, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user role:', userError);
        return NextResponse.json(
          { success: false, error: 'Failed to fetch user role' },
          { status: 500 }
        );
      }
      
      role = userRow?.role || '';
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: role,
      }
    });
  } catch (e) {
    console.error('Unexpected error in auth/me API:', e);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 