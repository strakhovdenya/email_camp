export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      letters: {
        Row: {
          id: string;
          room_id: string;
          status: 'pending' | 'delivered';
          created_at: string;
          delivered_at: string | null;
          sync_status: 'pending' | 'synced' | 'failed';
          barcode_id: string;
          recipient_notified: boolean;
          user_id: string | null;
          notification_statuses: unknown;
          note?: string | null;
          photo_url?: string | null;
        };
        Insert: {
          id?: string;
          room_id: string;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          barcode_id: string;
          recipient_notified?: boolean;
          user_id?: string | null;
          notification_statuses?: unknown;
          note?: string | null;
          photo_url?: string | null;
        };
        Update: {
          id?: string;
          room_id?: string;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          barcode_id?: string;
          recipient_notified?: boolean;
          user_id?: string | null;
          notification_statuses?: unknown;
          note?: string | null;
          photo_url?: string | null;
        };
      };
      rooms: {
        Row: {
          id: string;
          room_number: string;
          telegram_chat_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_number: string;
          telegram_chat_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_number?: string;
          telegram_chat_id?: string | null;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          phone: string | null;
          email: string;
          room_id: string | null;
          role: 'admin' | 'staff' | 'camper';
          created_at: string;
          channels_for_notification: string[];
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          phone?: string | null;
          email: string;
          room_id?: string | null;
          role?: 'admin' | 'staff' | 'camper';
          created_at?: string;
          channels_for_notification?: string[];
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          phone?: string | null;
          email?: string;
          room_id?: string | null;
          role?: 'admin' | 'staff' | 'camper';
          created_at?: string;
          channels_for_notification?: string[];
        };
      };
    };
    Views: {
      // letters_with_rooms: {
      //   Row: {
      //     id: number;
      //     room_id: number;
      //     room_number: string;
      //     telegram_chat_id: string | null;
      //     status: 'pending' | 'delivered';
      //     created_at: string;
      //     delivered_at: string | null;
      //     sync_status: 'pending' | 'synced' | 'failed';
      //     barcode_id: string;
      //     recipient_notified: boolean;
      //   };
      // };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
