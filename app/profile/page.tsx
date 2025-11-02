'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, FileText, Calendar, Heart, Eye, Settings } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import PenthouseEditor from '@/components/PenthouseEditor';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClientComponentClient();
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.push('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleUpload = (type: 'image' | 'video' | 'text') => {
    // TODO: 실제 업로드 구현
    const newPost = {
      id: posts.length + 1,
      type,
      title: '새로운 창작물',
      date: new Date().toLocaleDateString('ko-KR'),
    };
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 펜트하우스 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#2B0727]/30 to-black/30 border border-[#BA8E4C]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#2B0727] flex items-center justify-center text-white text-4xl font-bold">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 font-display">내 펜트하우스</h1>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors"
              >
                <Settings className="w-4 h-4" />
                {showEditor ? '보기 모드' : '편집 모드'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">{posts.length}</div>
                <div className="text-gray-400 text-sm">작성물</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">방문자</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">좋아요</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {showEditor ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">펜트하우스 꾸미기</h2>
                <PenthouseEditor user={user} />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-4">내 활동</h2>

            {/* 업로드 버튼 */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">새 창작물 업로드</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpload('image')}
                  className="flex-1 p-4 rounded-lg bg-[#2B0727]/30 border border-[#BA8E4C]/20 hover:bg-[#2B0727]/40 transition-colors flex flex-col items-center gap-2 text-white"
                >
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-sm">이미지</span>
                </button>
                <button
                  onClick={() => handleUpload('video')}
                  className="flex-1 p-4 rounded-lg bg-[#2B0727]/30 border border-[#BA8E4C]/20 hover:bg-[#2B0727]/40 transition-colors flex flex-col items-center gap-2 text-white"
                >
                  <Video className="w-6 h-6" />
                  <span className="text-sm">비디오</span>
                </button>
                <button
                  onClick={() => handleUpload('text')}
                  className="flex-1 p-4 rounded-lg bg-[#2B0727]/30 border border-[#BA8E4C]/20 hover:bg-[#2B0727]/40 transition-colors flex flex-col items-center gap-2 text-white"
                >
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">텍스트</span>
                </button>
              </div>
            </div>

            {/* 포스트 리스트 */}
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#BA8E4C] to-[#2B0727] flex items-center justify-center">
                        {post.type === 'image' ? <ImageIcon className="w-6 h-6 text-white" /> :
                         post.type === 'video' ? <Video className="w-6 h-6 text-white" /> :
                         <FileText className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{post.title}</h3>
                        <p className="text-gray-400 text-sm">{post.date}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-gray-400 text-sm">
                      <button className="flex items-center gap-1 hover:text-[#BA8E4C]">
                        <Heart className="w-4 h-4" /> 0
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#BA8E4C]">
                        <Eye className="w-4 h-4" /> 0
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>아직 작성물이 없습니다.</p>
                <p className="text-sm mt-2">첫 창작물을 업로드해보세요!</p>
              </div>
              )}
            </div>
              </>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">활동 로그</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  프로필 생성됨
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  첫 입주민이 되었습니다!
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2B0727]/30 to-black/30 border border-[#BA8E4C]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Ma'at Index</h3>
              <div className="text-5xl font-bold text-[#BA8E4C] mb-2">42</div>
              <p className="text-gray-400 text-sm">
                창작 활동 지수가 증가하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

