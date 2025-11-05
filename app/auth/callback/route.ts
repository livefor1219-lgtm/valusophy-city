import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const errorDescription = requestUrl.searchParams.get('error_description');

    // 오류가 있는 경우 처리
    if (error) {
      console.error('Auth error:', error, errorDescription);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin)
      );
    }

    if (code) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Session exchange error:', exchangeError);
        return NextResponse.redirect(
          new URL(`/?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
        );
      }

      // 로그인 성공 후 프로필 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/profile', requestUrl.origin));
    }

    // 코드가 없는 경우 홈으로 리다이렉트
    return NextResponse.redirect(new URL('/', requestUrl.origin));
  } catch (error: any) {
    console.error('Callback error:', error);
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error.message || 'Authentication failed')}`, requestUrl.origin)
    );
  }
}

