'use client';

import { createClientComponentClient } from './supabase';
import type { AuthError } from '@supabase/supabase-js';

export async function signInWithGoogle() {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const supabase = createClientComponentClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }
  
  return user;
}

export async function getSession() {
  const supabase = createClientComponentClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return session;
}

