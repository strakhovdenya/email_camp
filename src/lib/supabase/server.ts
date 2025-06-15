import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

class SupabaseService {
  public getRouteHandlerClient() {
    // Создаём новый клиент на каждый вызов
    return createRouteHandlerClient<Database>({ cookies });
  }

  public getAdminClient() {
    // Создаём новый клиент на каждый вызов
    return createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          },
          fetch: (input: RequestInfo | URL, init?: RequestInit) => {
            const headers = new Headers(init?.headers || {});
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            headers.set('Pragma', 'no-cache');
            headers.set('Expires', '0');
            headers.set('apikey', process.env.SUPABASE_SERVICE_ROLE_KEY!);
            return fetch(input, {
              ...init,
              cache: 'no-store',
              headers,
            });
          },
        },
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        db: {
          schema: 'public',
        },
      }
    );
  }
}

export const supabaseService = new SupabaseService();
 