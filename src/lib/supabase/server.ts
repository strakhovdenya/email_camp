import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

class SupabaseService {
  private static instance: SupabaseService;
  private routeHandlerClient: ReturnType<typeof createRouteHandlerClient<Database>> | null = null;
  private adminClient: ReturnType<typeof createClient<Database>> | null = null;

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  public getRouteHandlerClient() {
    if (!this.routeHandlerClient) {
      this.routeHandlerClient = createRouteHandlerClient<Database>({ cookies });
    }
    return this.routeHandlerClient;
  }

  public getAdminClient() {
    if (!this.adminClient) {
      this.adminClient = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
    }
    return this.adminClient;
  }
}

export const supabaseService = SupabaseService.getInstance();
