'use server';

import { createServerClient } from '@/lib/supabase/server';
import { getServerUser } from '@/lib/supabase/server';

export async function toggleLike(postId: string) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    const supabase = createServerClient();

    // resident 찾기
    let { data: resident } = await supabase
      .from('residents')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!resident) {
      return { error: 'Resident not found' };
    }

    // 기존 좋아요 확인
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('resident_id', resident.id)
      .single();

    if (existingLike) {
      // 좋아요 취소
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (error) {
        return { error: error.message };
      }

      return { success: true, liked: false };
    } else {
      // 좋아요 추가
      const { error } = await supabase
        .from('likes')
        .insert({
          post_id: postId,
          resident_id: resident.id,
        });

      if (error) {
        return { error: error.message };
      }

      return { success: true, liked: true };
    }
  } catch (error: any) {
    console.error('Toggle like error:', error);
    return { error: error.message || 'Failed to toggle like' };
  }
}

export async function addComment(postId: string, content: string) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    if (!content.trim()) {
      return { error: 'Comment content is required' };
    }

    const supabase = createServerClient();

    // resident 찾기
    let { data: resident } = await supabase
      .from('residents')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!resident) {
      return { error: 'Resident not found' };
    }

    // 댓글 추가
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        resident_id: resident.id,
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error('Add comment error:', error);
      return { error: error.message };
    }

    return { data: comment };
  } catch (error: any) {
    console.error('Add comment error:', error);
    return { error: error.message || 'Failed to add comment' };
  }
}

