'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Eye, Trash2, Calendar } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import { toggleLike, addComment } from '@/app/actions/social';
import { deletePost } from '@/app/actions/posts';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  content?: string;
  type: 'image' | 'video' | 'text';
  file_url?: string;
  thumbnail_url?: string;
  views: number;
  likes_count?: number;
  comments_count?: number;
  created_at: string;
  residents: {
    id: string;
    name: string;
    email: string;
    profile_image_url?: string;
  };
}

interface PostListProps {
  residentId?: string;
  currentUserId?: string;
  currentResidentId?: string;
  onDelete?: () => void;
}

export default function PostList({ residentId, currentUserId, currentResidentId, onDelete }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [userResidentId, setUserResidentId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
    if (currentUserId) {
      loadUserResidentId();
      loadLikedPosts();
    }
  }, [residentId, currentUserId]);

  const loadUserResidentId = async () => {
    if (!currentUserId) return;

    try {
      const supabase = createBrowserClient();
      const { data: resident } = await supabase
        .from('residents')
        .select('id')
        .eq('auth_user_id', currentUserId)
        .single();

      if (resident) {
        setUserResidentId(resident.id);
      }
    } catch (err) {
      console.error('Failed to load user resident ID:', err);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const url = residentId 
        ? `/api/posts?residentId=${residentId}`
        : '/api/posts';
      
      // 타임아웃 설정 (5초)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load posts');
        }

        setPosts(result.data || []);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
        }
        throw fetchError;
      }
    } catch (err: any) {
      console.error('Post load error:', err);
      setError(err.message || 'Failed to load posts');
      setPosts([]); // 에러 발생 시 빈 배열로 설정
    } finally {
      setLoading(false);
    }
  };

  const loadLikedPosts = async () => {
    if (!currentUserId) return;

    try {
      const supabase = createBrowserClient();
      const { data: resident } = await supabase
        .from('residents')
        .select('id')
        .eq('auth_user_id', currentUserId)
        .single();

      if (!resident) return;

      const { data: likes } = await supabase
        .from('likes')
        .select('post_id')
        .eq('resident_id', resident.id);

      if (likes) {
        setLikedPosts(new Set(likes.map(like => like.post_id)));
      }
    } catch (err) {
      console.error('Failed to load liked posts:', err);
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUserId) return;

    try {
      const result = await toggleLike(postId);
      if (result.error) {
        console.error('Like error:', result.error);
        return;
      }

      // UI 업데이트
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });

      // 포스트 새로고침
      loadPosts();
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleComment = async (postId: string) => {
    if (!currentUserId || !commentInputs[postId]) return;

    try {
      const result = await addComment(postId, commentInputs[postId]);
      if (result.error) {
        console.error('Comment error:', result.error);
        return;
      }

      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      loadPosts();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('정말 이 포스트를 삭제하시겠습니까?')) return;

    try {
      const result = await deletePost(postId);
      if (result.error) {
        alert(result.error);
        return;
      }

      if (onDelete) {
        onDelete();
      }
      loadPosts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>아직 작성물이 없습니다.</p>
        <p className="text-sm mt-2">첫 창작물을 업로드해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
        >
          {/* 헤더 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#2B0727] flex items-center justify-center text-white font-bold">
                {post.residents?.name?.charAt(0) || post.residents?.email?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="text-white font-semibold">
                  {post.residents?.name || post.residents?.email || 'Unknown'}
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            {(currentResidentId || userResidentId) && post.residents?.id === (currentResidentId || userResidentId) && (
              <button
                onClick={() => handleDelete(post.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 제목 */}
          <h3 className="text-white font-bold text-xl mb-2">{post.title}</h3>

          {/* 내용 */}
          {post.content && (
            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
          )}

          {/* 미디어 */}
          {post.file_url && (
            <div className="mb-4 rounded-lg overflow-hidden">
              {post.type === 'image' ? (
                <Image
                  src={post.file_url}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              ) : post.type === 'video' ? (
                <video
                  src={post.file_url}
                  controls
                  className="w-full rounded-lg"
                />
              ) : null}
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-2 transition-colors ${
                likedPosts.has(post.id)
                  ? 'text-[#BA8E4C]'
                  : 'text-gray-400 hover:text-[#BA8E4C]'
              }`}
            >
              <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
              <span>{post.likes_count || 0}</span>
            </button>
            <button
              onClick={() => setShowComments(prev => {
                const newSet = new Set(prev);
                if (newSet.has(post.id)) {
                  newSet.delete(post.id);
                } else {
                  newSet.add(post.id);
                }
                return newSet;
              })}
              className="flex items-center gap-2 text-gray-400 hover:text-[#BA8E4C] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments_count || 0}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-5 h-5" />
              <span>{post.views || 0}</span>
            </div>
          </div>

          {/* 댓글 입력 */}
          {showComments.has(post.id) && currentUserId && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({
                    ...prev,
                    [post.id]: e.target.value
                  }))}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleComment(post.id);
                    }
                  }}
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="px-4 py-2 bg-gradient-to-r from-[#2B0727] to-[#BA8E4C] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  작성
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

