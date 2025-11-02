import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 서버 사이드용 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 클라이언트 사이드용 클라이언트 (브라우저에서만 사용)
export function createClientComponentClient() {
  if (typeof window === 'undefined') {
    throw new Error('createClientComponentClient must be called in browser context');
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

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

