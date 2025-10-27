'use client';

import { motion } from 'framer-motion';
import { Users, Rocket, Calendar, User } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: '첫 번째 협업 프로젝트',
      description: '여러 입주민들이 함께 작업하는 창작 프로젝트입니다.',
      members: ['김철수', '이영희', '박민수'],
      status: 'recruiting',
      startDate: '2025-01-01',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
              + 새 프로젝트
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="mb-4">
                  <div className="w-full h-32 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 flex items-center justify-center">
                    <Rocket className="w-12 h-12 text-purple-400" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {project.members.length}명 참여
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{project.startDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                    모집 중
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {project.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold"
                      title={member}
                    >
                      {member.charAt(0)}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

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
    </div>
  );
}

