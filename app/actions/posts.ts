'use server';

import { createServerClient } from '@/lib/supabase/server';
import { getServerUser } from '@/lib/supabase/server';

export interface CreatePostData {
  title: string;
  content?: string;
  type: 'image' | 'video' | 'text';
  file_url?: string;
  thumbnail_url?: string;
}

export async function createPost(data: CreatePostData) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    const supabase = createServerClient();

    // resident 찾기 또는 생성
    let { data: resident } = await supabase
      .from('residents')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!resident) {
      // resident가 없으면 생성
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

      if (createError) {
        return { error: createError.message || 'Failed to create resident' };
      }
      
      if (!newResident) {
        return { error: 'Failed to create resident' };
      }
      
      resident = newResident;
    }

    // resident가 여전히 null인 경우 체크
    if (!resident || !resident.id) {
      return { error: 'Resident not found' };
    }

    // 포스트 생성
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        resident_id: resident.id,
        title: data.title,
        content: data.content || null,
        type: data.type,
        file_url: data.file_url || null,
        thumbnail_url: data.thumbnail_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Post creation error:', error);
      return { error: error.message };
    }

    return { data: post };
  } catch (error: any) {
    console.error('Create post error:', error);
    return { error: error.message || 'Failed to create post' };
  }
}

export async function listPosts(residentId?: string) {
  try {
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

    const { data, error } = await query;

    if (error) {
      console.error('List posts error:', error);
      return { error: error.message };
    }

    return { data: data || [] };
  } catch (error: any) {
    console.error('List posts error:', error);
    return { error: error.message || 'Failed to list posts' };
  }
}

export async function deletePost(postId: string) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    const supabase = createServerClient();

    // resident 찾기
    const { data: resident } = await supabase
      .from('residents')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!resident) {
      return { error: 'Resident not found' };
    }

    // 포스트 소유권 확인
    const { data: post } = await supabase
      .from('posts')
      .select('resident_id, file_url')
      .eq('id', postId)
      .single();

    if (!post || post.resident_id !== resident.id) {
      return { error: 'Unauthorized' };
    }

    // 파일 삭제 (Supabase Storage)
    if (post.file_url) {
      const filePath = post.file_url.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('penthouse-media')
          .remove([filePath]);
      }
    }

    // 포스트 삭제
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Delete post error:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Delete post error:', error);
    return { error: error.message || 'Failed to delete post' };
  }
}

