'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Calendar, User } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import ProjectModal from '@/components/ProjectModal';
import CreateProjectModal from '@/components/CreateProjectModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // 타임아웃 설정 (10초 후 강제로 로딩 종료)
    const timeoutId = setTimeout(() => {
      console.warn('Projects page loading timeout - forcing load completion');
      setLoading(false);
    }, 10000);

    const supabase = createBrowserClient();
    
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('User fetch error:', error);
      }
    };

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // loadProjects는 내부에서 setLoading을 관리하므로 여기서는 호출만
    loadProjects().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const supabase = createBrowserClient();

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_members(
            resident_id,
            residents(
              name,
              email
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('프로젝트 로드 실패:', error);
        setProjects([]);
      } else {
        setProjects(data || []);
      }
    } catch (error: any) {
      console.error('로드 오류:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleApplySuccess = () => {
    loadProjects(); // 프로젝트 목록 새로고침
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#BA8E4C] to-[#2B0727] bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-xl text-gray-400">
            공동작업 및 협업 프로젝트 공간
          </p>
        </motion.div>

        {/* 프로젝트 목록 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">진행 중인 프로젝트</h2>
            {user && (
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#2B0727] to-[#BA8E4C] rounded-lg text-white font-semibold hover:scale-105 transition-transform"
              >
                + 새 프로젝트
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const members = project.project_members || [];
              return (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => handleProjectClick(project)}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="mb-4">
                    <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#2B0727]/30 to-black/30 border border-[#BA8E4C]/20 flex items-center justify-center">
                      <Rocket className="w-12 h-12 text-[#BA8E4C]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description || '설명이 없습니다.'}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      {members.length}명 참여
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      {project.start_date || '미정'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'recruiting' ? 'bg-[#BA8E4C]/20 text-[#BA8E4C]' :
                      project.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {project.status === 'recruiting' ? '모집 중' :
                       project.status === 'in_progress' ? '진행 중' :
                       '완료'}
                    </span>
                  </div>

                  {members.length > 0 && (
                    <div className="mt-4 flex items-center gap-2">
                      {members.slice(0, 5).map((member: any, idx: number) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#2B0727] flex items-center justify-center text-white text-sm font-bold"
                          title={member.residents?.name || member.residents?.email || 'Unknown'}
                        >
                          {(member.residents?.name || member.residents?.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {members.length > 5 && (
                        <div className="text-gray-400 text-sm">+{members.length - 5}</div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {projects.length === 0 && (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <Rocket className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>진행 중인 프로젝트가 없습니다.</p>
                <p className="text-sm mt-2">첫 협업 프로젝트를 시작해보세요!</p>
              </div>
            )}
          </div>
        </div>

        {/* 공용 아틀리에 */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="w-8 h-8" />
            공용 아틀리에
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            공용 아틀리에서는 모든 입주민이 함께 창작 활동을 할 수 있는 공간입니다. 
            실시간으로 다른 창작자들과 소통하고, 아이디어를 나누며, 협업 프로젝트를 시작할 수 있습니다.
          </p>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-colors">
            아틀리에 입장하기
          </button>
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
          user={user}
          onApply={handleApplySuccess}
        />
      )}

      {/* 프로젝트 생성 모달 */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        user={user}
        onSuccess={() => {
          loadProjects();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}

