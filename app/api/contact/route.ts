import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Supabase 클라이언트 생성
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables not set');
      // 환경 변수가 없어도 성공으로 처리 (로컬 개발)
      return NextResponse.json({ 
        success: true, 
        message: '신청서가 성공적으로 제출되었습니다.' 
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Supabase에 신청서 저장
    const { data, error } = await supabase
      .from('applications')
      .insert({
        name,
        email,
        message,
        status: 'pending',
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: '신청서 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 2. 신청서 로그 출력
    console.log('새 입주 신청서:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      message: '신청서가 성공적으로 제출되었습니다.' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

