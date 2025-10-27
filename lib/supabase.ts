import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface Resident {
  id: string;
  name: string;
  email: string;
  apartment_number: string;
  building: string;
  floor: number;
  bio?: string;
  created_at: string;
}

export interface Post {
  id: string;
  resident_id: string;
  type: 'image' | 'video' | 'text';
  title: string;
  content?: string;
  file_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'recruiting' | 'in_progress' | 'completed';
  leader_id: string;
  member_ids: string[];
  start_date: string;
  end_date?: string;
  created_at: string;
}

