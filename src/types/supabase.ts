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
          room_id: string | null;
          channels_for_notification: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          room_id?: string | null;
          channels_for_notification?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          room_id?: string | null;
          channels_for_notification?: string[] | null;
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
          created_at: string;
          room_id: string;
          recipient_id: string;
          status: string;
          photo_url: string | null;
          notification_statuses: Json | null;
          recipient_notified: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          room_id: string;
          recipient_id: string;
          status?: string;
          photo_url?: string | null;
          notification_statuses?: Json | null;
          recipient_notified?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          room_id?: string;
          recipient_id?: string;
          status?: string;
          photo_url?: string | null;
          notification_statuses?: Json | null;
          recipient_notified?: boolean;
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
  users: Pick<Database['public']['Tables']['users']['Row'], 'first_name' | 'last_name'> | null;
};

export type User = Database['public']['Tables']['users']['Row'];
export type Room = Database['public']['Tables']['rooms']['Row'];
