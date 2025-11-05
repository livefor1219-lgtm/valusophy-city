import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createServerClient() {
  // 서버 사이드에서는 기본 클라이언트 사용
  // 인증이 필요한 경우 getServerUser()를 통해 사용자 정보 확인
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getServerSession() {
  const supabase = createServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    return null;
  }
  
  return session;
}

export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}

