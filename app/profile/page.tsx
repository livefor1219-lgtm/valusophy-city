'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { User } from '@supabase/supabase-js';
import PenthouseEditor from '@/components/PenthouseEditor';
import UploadPost from '@/components/UploadPost';
import PostList from '@/components/PostList';
import PostCount from '@/components/PostCount';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [residentId, setResidentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // 타임아웃 설정 (5초로 단축 - 더 빠른 피드백)
    const timeoutId = setTimeout(() => {
      console.warn('Profile page loading timeout - forcing load completion');
      setLoading(false);
    }, 5000);

    const supabase = createBrowserClient();
    let mounted = true;
    
    const loadUserData = async () => {
      try {
        // 병렬 로딩: getUser와 resident 조회를 동시에 시작
        const [userResult, residentResult] = await Promise.allSettled([
          supabase.auth.getUser(),
          // user가 없을 수 있으므로 일단 실행
          Promise.resolve({ data: null, error: null })
        ]);
        
        if (!mounted) {
          clearTimeout(timeoutId);
          return;
        }

        // User 결과 처리
        if (userResult.status === 'rejected') {
          console.error('User fetch error:', userResult.reason);
          clearTimeout(timeoutId);
          setLoading(false);
          router.push('/');
          return;
        }

        const { data: { user }, error: userError } = userResult.value;

        if (userError) {
          console.error('User fetch error:', userError);
          clearTimeout(timeoutId);
          setLoading(false);
          if (userError.message.includes('session') || userError.message.includes('JWT')) {
            router.push('/');
          }
          return;
        }

        setUser(user);
        
        if (!user) {
          clearTimeout(timeoutId);
          setLoading(false);
          router.push('/');
          return;
        }

        // resident 찾기 또는 생성 (이미 병렬로 시작했지만 user가 필요하므로 여기서 완료)
        try {
          let { data: resident, error: residentError } = await supabase
            .from('residents')
            .select('id')
            .eq('auth_user_id', user.id)
            .single();

          // resident가 없으면 자동 생성
          if (!resident && (residentError?.code === 'PGRST116' || !residentError)) {
            console.log('Resident not found, creating new resident...');
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
              .select('id')
              .single();

            if (createError) {
              console.error('Failed to create resident:', createError);
              // resident 생성 실패해도 계속 진행 (로딩은 종료)
            } else if (newResident && mounted) {
              resident = newResident;
              setResidentId(resident.id);
            }
          } else if (residentError && residentError.code !== 'PGRST116') {
            // PGRST116이 아닌 다른 에러인 경우
            console.error('Resident fetch error:', residentError);
          } else if (resident && mounted) {
            // resident를 찾은 경우
            setResidentId(resident.id);
          }
        } catch (residentErr) {
          console.error('Resident fetch/create error:', residentErr);
          // resident 조회/생성 실패해도 계속 진행 (로딩은 종료)
        }

        if (mounted) {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        if (mounted) {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      }
    };

    loadUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      if (!session?.user) {
        clearTimeout(timeoutId);
        setLoading(false);
        router.push('/');
        return;
      }

      try {
        // resident 찾기
        const { data: resident, error: residentError } = await supabase
          .from('residents')
          .select('id')
          .eq('auth_user_id', session.user.id)
          .single();

        if (residentError && residentError.code !== 'PGRST116') {
          console.error('Resident fetch error:', residentError);
        }

        if (resident && mounted) {
          setResidentId(resident.id);
        }
      } catch (error) {
        console.error('Resident fetch error:', error);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [router]);

  const handlePostSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#12061A]/20 to-black pt-32 pb-20 px-6">
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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#12061A]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 펜트하우스 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#12061A]/30 to-black/30 border border-[#BA8E4C]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#12061A] flex items-center justify-center text-white text-4xl font-bold">
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
                <div className="text-2xl font-bold text-white mb-1">
                  <PostCount residentId={residentId} />
                </div>
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

                {/* 업로드 컴포넌트 */}
                <UploadPost onSuccess={handlePostSuccess} />

                {/* 포스트 리스트 */}
                <PostList
                  key={refreshKey}
                  residentId={residentId || undefined}
                  currentUserId={user?.id}
                  currentResidentId={residentId || undefined}
                  onDelete={handlePostSuccess}
                />
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

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12061A]/30 to-black/30 border border-[#BA8E4C]/20">
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

