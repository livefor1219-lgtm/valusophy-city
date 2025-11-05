'use client';

import { createBrowserClient } from './supabase/browser';
import type { AuthError } from '@supabase/supabase-js';

export async function signInWithGoogle() {
  const supabase = createBrowserClient();
  
  // 환경 변수 우선, 없으면 window.location.origin 사용
  // 이렇게 하면 Supabase 설정과 일치시킬 수 있음
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : '');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = createBrowserClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const supabase = createBrowserClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }
  
  return user;
}

export async function getSession() {
  const supabase = createBrowserClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return session;
}

