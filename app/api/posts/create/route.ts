import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getServerUser } from '@/lib/supabase/server';
import { createPost } from '@/app/actions/posts';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string | null;
    const type = formData.get('type') as 'image' | 'video' | 'text';
    const file = formData.get('file') as File | null;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // resident 찾기 또는 생성
    let { data: resident } = await supabase
      .from('residents')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!resident) {
      const { data: newResident, error: createError } = await supabase
        .from('residents')
        .insert({
          auth_user_id: user.id,
          name: user.email?.split('@')[0] || 'User',
          email: user.email || '',
          apartment_number: `A${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 100) + 1}`,
          building: 'A동',
          floor: Math.floor(Math.random() * 20) + 1,
        })
        .select()
        .single();

      if (createError || !newResident) {
        return NextResponse.json(
          { error: 'Failed to create resident' },
          { status: 500 }
        );
      }
      resident = newResident;
    }

    let fileUrl: string | undefined;
    let thumbnailUrl: string | undefined;

    // 파일 업로드 처리
    if (file && (type === 'image' || type === 'video')) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 파일을 ArrayBuffer로 변환
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Supabase Storage에 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('penthouse-media')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload file' },
          { status: 500 }
        );
      }

      // Public URL 가져오기
      const { data: urlData } = supabase.storage
        .from('penthouse-media')
        .getPublicUrl(filePath);

      fileUrl = urlData.publicUrl;

      // 이미지인 경우 썸네일도 같은 URL 사용 (추후 썸네일 생성 로직 추가 가능)
      if (type === 'image') {
        thumbnailUrl = fileUrl;
      }
    }

    // 포스트 생성
    const result = await createPost({
      title,
      content: content || undefined,
      type,
      file_url: fileUrl,
      thumbnail_url: thumbnailUrl,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error: any) {
    console.error('Create post API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

