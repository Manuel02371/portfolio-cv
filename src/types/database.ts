export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          headline: string;
          summary: string;
          location: string | null;
          email: string | null;
          phone: string | null;
          linkedin_url: string | null;
          github_url: string | null;
          portfolio_url: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          description: string;
          achievements: string[];
          technologies: string[];
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["experiences"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          problem: string | null;
          solution: string | null;
          technologies: string[];
          repository_url: string | null;
          demo_url: string | null;
          display_order: number;
          is_featured: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          level: number;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["skills"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["skills"]["Insert"]>;
        Relationships: [];
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          institution: string;
          issue_date: string | null;
          credential_url: string | null;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["certifications"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["certifications"]["Insert"]>;
        Relationships: [];
      };
      education: {
        Row: {
          id: string;
          institution: string;
          degree: string;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["education"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["education"]["Insert"]>;
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          label: string;
          value: string;
          url: string | null;
          display_order: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contacts"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
        Relationships: [];
      };
      admin_users: {
        Row: {
          user_id: string;
          role: "admin";
          created_at: string;
        };
        Insert: {
          user_id: string;
          role: "admin";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
