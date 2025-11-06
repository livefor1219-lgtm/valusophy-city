'use client';

import { createBrowserClient } from './supabase/browser';
import type { AuthError } from '@supabase/supabase-js';

export async function signInWithGoogle() {
  const supabase = createBrowserClient();
  
  // 프로덕션 URL을 하드코딩하여 재배포 후에도 일관된 동작 보장
  // 환경 변수 우선, 없으면 프로덕션 URL 사용 (재배포 후 안정성 보장)
  // 로컬 개발 시에는 window.location.origin 사용
  const getSiteUrl = () => {
    // 환경 변수가 있으면 우선 사용
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
    
    // 브라우저 환경에서 로컬 개발인 경우
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      // 로컬 개발 환경인 경우
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return origin;
      }
    }
    
    // 프로덕션 URL (기본값)
    return 'https://valusophy-city.vercel.app';
  };
  
  const siteUrl = getSiteUrl();
  
  const redirectUrl = `${siteUrl}/auth/callback`;
  
  // 디버깅을 위한 로그 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log('OAuth redirect URL:', redirectUrl);
  }
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error('OAuth error:', error);
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

