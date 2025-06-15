import type { LetterWithRelations } from '@/types/supabase';

export interface Letter extends Omit<LetterWithRelations, 'status' | 'notification_statuses'> {
  status: 'pending' | 'delivered';
  notification_statuses?: Record<string, 'sent' | 'failed'>;
  note: string | null;
  delivered_at: string | null;
  first_name?: string;
  last_name?: string;
}
