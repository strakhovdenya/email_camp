export interface Letter {
  id: number;
  created_at: string;
  delivered_at?: string | null;
  status: 'pending' | 'delivered';
  note?: string;
  photo_url?: string;
  first_name?: string;
  last_name?: string;
  recipient_notified?: boolean;
}
