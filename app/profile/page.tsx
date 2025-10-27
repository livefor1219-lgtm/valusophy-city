'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, FileText, Calendar, Heart, Eye } from 'lucide-react';

export default function ProfilePage() {
  const [posts, setPosts] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 펜트하우스 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30 border border-cyan-500/20">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                유
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">내 펜트하우스</h1>
                <p className="text-gray-400">발루루체 A동 12층 1204호</p>
              </div>
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
            <h2 className="text-2xl font-bold text-white mb-4">내 활동</h2>

            {/* 업로드 버튼 */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">새 창작물 업로드</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpload('image')}
                  className="flex-1 p-4 rounded-lg bg-purple-900/30 border border-purple-500/20 hover:bg-purple-900/40 transition-colors flex flex-col items-center gap-2 text-white"
                >
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-sm">이미지</span>
                </button>
                <button
                  onClick={() => handleUpload('video')}
                  className="flex-1 p-4 rounded-lg bg-purple-900/30 border border-purple-500/20 hover:bg-purple-900/40 transition-colors flex flex-col items-center gap-2 text-white"
                >
                  <Video className="w-6 h-6" />
                  <span className="text-sm">비디오</span>
                </button>
                <button
                  onClick={() => handleUpload('text')}
                  className="flex-1 p-4 rounded-lg bg-purple-900/30 border border-purple-500/20 hover:bg-purple-900/40 transition-colors flex flex-col items-center gap-2 text-white"
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
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
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
                      <button className="flex items-center gap-1 hover:text-pink-400">
                        <Heart className="w-4 h-4" /> 0
                      </button>
                      <button className="flex items-center gap-1 hover:text-cyan-400">
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

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Ma'at Index</h3>
              <div className="text-5xl font-bold text-cyan-400 mb-2">42</div>
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

