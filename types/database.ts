// House of Soyaal — Supabase database types
// Re-generate with: supabase gen types typescript --local > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubscriptionStatus = "active" | "inactive" | "canceled" | "past_due";
export type UserRole = "member" | "admin";
export type AccessState = "public" | "members";
export type LessonResourceType = "PDF" | "Transcript" | "Worksheet" | "Link";
export type AnnotationLabel = "Theme" | "Image" | "Performance" | "Question" | "Metaphor";
export type EventFormat = "Online workshop" | "Online seminar" | "In-person session";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: UserRole;
          stripe_customer_id: string | null;
          subscription_id: string | null;
          subscription_status: SubscriptionStatus;
          onboarded: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          role?: UserRole;
          stripe_customer_id?: string | null;
          subscription_id?: string | null;
          subscription_status?: SubscriptionStatus;
          onboarded?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string;
          hero_quote: string;
          description: string;
          monthly_price_gbp: number;
          hero_stats: Json;
          outcomes: string[];
          includes: string[];
          audience: string[];
          access: AccessState;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string;
          hero_quote?: string;
          description?: string;
          monthly_price_gbp?: number;
          hero_stats?: Json;
          outcomes?: string[];
          includes?: string[];
          audience?: string[];
          access?: AccessState;
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          order: number;
          summary: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          order: number;
          summary?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["modules"]["Insert"]>;
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          slug: string;
          title: string;
          order: number;
          duration_minutes: number;
          summary: string;
          mux_asset_id: string | null;
          mux_playback_id: string | null;
          transcript: string;
          notes_summary: string;
          captions: string[];
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          slug: string;
          title: string;
          order: number;
          duration_minutes?: number;
          summary?: string;
          mux_asset_id?: string | null;
          mux_playback_id?: string | null;
          transcript?: string;
          notes_summary?: string;
          captions?: string[];
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lessons"]["Insert"]>;
      };
      lesson_resources: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          type: LessonResourceType;
          storage_path: string | null;
          href: string | null;
          description: string;
          order: number;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          type: LessonResourceType;
          storage_path?: string | null;
          href?: string | null;
          description?: string;
          order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["lesson_resources"]["Insert"]>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
        };
        Update: never;
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          playback_position_seconds: number;
          started_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          playback_position_seconds?: number;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["lesson_progress"]["Insert"]>;
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          format: EventFormat;
          datetime_label: string;
          location_label: string;
          seats_label: string;
          price_label: string;
          eventbrite_url: string;
          event_date: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary?: string;
          format: EventFormat;
          datetime_label?: string;
          location_label?: string;
          seats_label?: string;
          price_label?: string;
          eventbrite_url?: string;
          event_date?: string | null;
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
      archive_items: {
        Row: {
          id: string;
          slug: string;
          title: string;
          poet: string;
          era: string;
          description: string;
          preview: string;
          tags: string[];
          access: AccessState;
          pdf_storage_path: string | null;
          editorial_note: string;
          passages: string[];
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          poet?: string;
          era?: string;
          description?: string;
          preview?: string;
          tags?: string[];
          access?: AccessState;
          pdf_storage_path?: string | null;
          editorial_note?: string;
          passages?: string[];
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["archive_items"]["Insert"]>;
      };
      pdf_annotations: {
        Row: {
          id: string;
          user_id: string;
          archive_item_id: string;
          selected_text: string;
          label: AnnotationLabel;
          note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          archive_item_id: string;
          selected_text: string;
          label: AnnotationLabel;
          note?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pdf_annotations"]["Insert"]>;
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          body: string;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["announcements"]["Insert"]>;
      };
    };
  };
}

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Module = Database["public"]["Tables"]["modules"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type LessonResource = Database["public"]["Tables"]["lesson_resources"]["Row"];
export type Enrollment = Database["public"]["Tables"]["enrollments"]["Row"];
export type LessonProgress = Database["public"]["Tables"]["lesson_progress"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type ArchiveItem = Database["public"]["Tables"]["archive_items"]["Row"];
export type PdfAnnotation = Database["public"]["Tables"]["pdf_annotations"]["Row"];
export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
