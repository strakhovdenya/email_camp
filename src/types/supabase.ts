export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          room_id: string | null;
          role: 'admin' | 'staff' | 'camper';
          channels_for_notification: string[] | null;
          telegram_chat_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          room_id?: string | null;
          role?: 'admin' | 'staff' | 'camper';
          channels_for_notification?: string[] | null;
          telegram_chat_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          room_id?: string | null;
          role?: 'admin' | 'staff' | 'camper';
          channels_for_notification?: string[] | null;
          telegram_chat_id?: string | null;
        };
      };
      rooms: {
        Row: {
          id: string;
          created_at: string;
          room_number: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          room_number: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          room_number?: string;
        };
      };
      letters: {
        Row: {
          id: string;
          room_id: string;
          status: 'pending' | 'delivered';
          created_at: string;
          delivered_at: string | null;
          sync_status: 'pending' | 'synced' | 'failed';
          note: string | null;
          photo_url: string | null;
          user_id: string | null;
          email_notified: boolean;
          telegram_notified: boolean;
          notification_statuses: Json;
        };
        Insert: {
          id?: string;
          room_id: string;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          note?: string | null;
          photo_url?: string | null;
          user_id?: string | null;
          email_notified?: boolean;
          telegram_notified?: boolean;
          notification_statuses?: Json;
        };
        Update: {
          id?: string;
          room_id?: string;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          note?: string | null;
          photo_url?: string | null;
          user_id?: string | null;
          email_notified?: boolean;
          telegram_notified?: boolean;
          notification_statuses?: Json;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Extended types for joined relations
export type LetterWithRelations = Database['public']['Tables']['letters']['Row'] & {
  rooms: Pick<Database['public']['Tables']['rooms']['Row'], 'room_number'> | null;
  users: Pick<
    Database['public']['Tables']['users']['Row'],
    'id' | 'first_name' | 'last_name' | 'email'
  > | null;
  note?: string | null;
  delivered_at?: string | null;
};

export interface User {
  id: string;
  created_at: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  room_id: string | null;
  role: 'admin' | 'staff' | 'camper';
  channels_for_notification: string[] | null;
  telegram_chat_id: string | null;
  room?: { room_number: string } | null;
}

export type Room = Database['public']['Tables']['rooms']['Row'];
