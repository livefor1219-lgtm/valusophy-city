import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const residentId = searchParams.get('residentId') || undefined;

    const supabase = createServerClient();

    let query = supabase
      .from('posts')
      .select(`
        *,
        residents (
          id,
          name,
          email,
          profile_image_url
        )
      `)
      .order('created_at', { ascending: false });

    if (residentId) {
      query = query.eq('resident_id', residentId);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // 좋아요 및 댓글 수 계산
    const postsWithCounts = await Promise.all(
      (posts || []).map(async (post) => {
        const [likesResult, commentsResult] = await Promise.all([
          supabase
            .from('likes')
            .select('id', { count: 'exact', head: true })
            .eq('post_id', post.id),
          supabase
            .from('comments')
            .select('id', { count: 'exact', head: true })
            .eq('post_id', post.id),
        ]);

        return {
          ...post,
          likes_count: likesResult.count || 0,
          comments_count: commentsResult.count || 0,
        };
      })
    );

    return NextResponse.json({ data: postsWithCounts });
  } catch (error: any) {
    console.error('List posts API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
