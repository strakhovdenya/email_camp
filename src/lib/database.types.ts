export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      letters: {
        Row: {
          id: number;
          room_id: number;
          status: 'pending' | 'delivered';
          created_at: string;
          delivered_at: string | null;
          sync_status: 'pending' | 'synced' | 'failed';
          barcode_id: string;
          recipient_notified: boolean;
        };
        Insert: {
          id?: number;
          room_id: number;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          barcode_id: string;
          recipient_notified?: boolean;
        };
        Update: {
          id?: number;
          room_id?: number;
          status?: 'pending' | 'delivered';
          created_at?: string;
          delivered_at?: string | null;
          sync_status?: 'pending' | 'synced' | 'failed';
          barcode_id?: string;
          recipient_notified?: boolean;
        };
      };
      rooms: {
        Row: {
          id: number;
          room_number: string;
          telegram_chat_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          room_number: string;
          telegram_chat_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          room_number?: string;
          telegram_chat_id?: string | null;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: number;
          first_name: string;
          last_name: string;
          phone: string | null;
          email: string;
          room_id: number;
          role: 'admin' | 'staff' | 'camper';
          created_at: string;
        };
        Insert: {
          id?: number;
          first_name: string;
          last_name: string;
          phone?: string | null;
          email: string;
          room_id: number;
          role?: 'admin' | 'staff' | 'camper';
          created_at?: string;
        };
        Update: {
          id?: number;
          first_name?: string;
          last_name?: string;
          phone?: string | null;
          email?: string;
          room_id?: number;
          role?: 'admin' | 'staff' | 'camper';
          created_at?: string;
        };
      };
    };
    Views: {
      letters_with_rooms: {
        Row: {
          id: number;
          room_id: number;
          room_number: string;
          telegram_chat_id: string | null;
          status: 'pending' | 'delivered';
          created_at: string;
          delivered_at: string | null;
          sync_status: 'pending' | 'synced' | 'failed';
          barcode_id: string;
          recipient_notified: boolean;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
