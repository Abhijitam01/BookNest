export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_lists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string
          duration: string
          featured: boolean | null
          id: number
          image_url: string
          level: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          duration: string
          featured?: boolean | null
          id?: number
          image_url: string
          level: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: string
          featured?: boolean | null
          id?: number
          image_url?: string
          level?: string
          title?: string
        }
        Relationships: []
      }
      list_books: {
        Row: {
          added_at: string | null
          book_id: string
          id: string
          list_id: string
        }
        Insert: {
          added_at?: string | null
          book_id: string
          id?: string
          list_id: string
        }
        Update: {
          added_at?: string | null
          book_id?: string
          id?: string
          list_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "list_books_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "book_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          content: string
          course_id: number
          created_at: string
          id: number
          order_index: number
          title: string
        }
        Insert: {
          content: string
          course_id: number
          created_at?: string
          id?: number
          order_index: number
          title: string
        }
        Update: {
          content?: string
          course_id?: number
          created_at?: string
          id?: number
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_answer: number
          created_at: string
          id: number
          module_id: number
          options: Json
          text: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          id?: number
          module_id: number
          options: Json
          text: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          id?: number
          module_id?: number
          options?: Json
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          amount: number
          course_id: number | null
          created_at: string
          description: string
          id: number
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          course_id?: number | null
          created_at?: string
          description: string
          id?: number
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          course_id?: number | null
          created_at?: string
          description?: string
          id?: number
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tokens_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_books: {
        Row: {
          authors: string[]
          book_id: string
          categories: string[] | null
          date_added: string | null
          description: string | null
          id: string
          image_url: string | null
          is_read: boolean | null
          notes: string | null
          rating: number | null
          title: string
          user_id: string
        }
        Insert: {
          authors: string[]
          book_id: string
          categories?: string[] | null
          date_added?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          notes?: string | null
          rating?: number | null
          title: string
          user_id: string
        }
        Update: {
          authors?: string[]
          book_id?: string
          categories?: string[] | null
          date_added?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          notes?: string | null
          rating?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_courses: {
        Row: {
          course_id: number
          created_at: string
          id: number
          progress: number
          score: number | null
          status: string
          tokens_earned: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          progress?: number
          score?: number | null
          status?: string
          tokens_earned?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          progress?: number
          score?: number | null
          status?: string
          tokens_earned?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_modules: {
        Row: {
          completed: boolean
          created_at: string
          id: number
          module_id: number
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: number
          module_id: number
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: number
          module_id?: number
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
