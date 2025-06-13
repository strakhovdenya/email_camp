import { Database } from './supabase';

type Letter = Database['public']['Tables']['letters']['Row'];

export interface RoomWithLetters {
  id: string;
  room_number: string;
  letters: Letter[];
  total_letters: number;
  delivered_count: number;
  undelivered_count: number;
}
