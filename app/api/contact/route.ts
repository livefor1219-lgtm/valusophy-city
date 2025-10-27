import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Supabase 클라이언트 생성
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 1. Supabase에 신청서 저장
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase
        .from('applications')
        .insert({
          name,
          email,
          message,
          status: 'pending',
        });

      if (error) {
        console.error('Database error:', error);
        // 데이터베이스 에러가 있어도 이메일 전송은 시도
      }
    }

    // 2. 이메일 전송 (valusophy.page@gmail.com으로 알림)
    const emailSubject = `🎉 발루소사이어시티 새 입주 신청: ${name}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            
            <div style="background-color: white; padding: 40px; border-radius: 8px;">
              <h1 style="color: #333; font-size: 28px; margin-bottom: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                🏙️ 발루소사이어시티 입주 신청
              </h1>
              
              <div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                <h2 style="color: #333; font-size: 20px; margin-bottom: 20px;">신청자 정보</h2>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #667eea; display: block; margin-bottom: 5px;">이름</strong>
                  <p style="color: #666; margin: 0; font-size: 16px;">${name}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #667eea; display: block; margin-bottom: 5px;">이메일</strong>
                  <p style="color: #666; margin: 0; font-size: 16px;">${email}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #667eea; display: block; margin-bottom: 5px;">메시지</strong>
                  <p style="color: #666; margin: 0; font-size: 16px; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                <p style="color: #999; font-size: 14px; margin: 0;">
                  🎨 Valusophy City - Neo-minimal + Ether + Glow
                </p>
              </div>
            </div>
            
          </div>
        </body>
      </html>
    `;

    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // 도메인 등록 전: onboarding@resend.dev 사용
        // 도메인 등록 후: noreply@yourdomain.com 사용 가능
        const { data, error: emailError } = await resend.emails.send({
          from: 'Valusophy City <onboarding@resend.dev>',
          to: 'valusophy.page@gmail.com',
          subject: emailSubject,
          html: emailHtml,
        });

        if (emailError) {
          console.error('이메일 전송 실패:', emailError);
        } else {
          console.log('이메일 전송 성공:', data);
        }
      } else {
        console.log('이메일 전송 건너뜀 (RESEND_API_KEY 없음)');
      }
    } catch (emailError) {
      console.error('이메일 전송 실패:', emailError);
      // 이메일 전송 실패해도 신청서는 저장되었으므로 계속 진행
    }

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

