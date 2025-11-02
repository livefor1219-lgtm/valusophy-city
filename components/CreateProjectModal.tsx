'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess?: () => void;
}

export default function CreateProjectModal({ isOpen, onClose, user, onSuccess }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const supabase = createClientComponentClient();

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
          throw createError;
        }
        resident = newResident;
      }

      // 프로젝트 생성
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: formData.title,
          description: formData.description || null,
          leader_id: resident.id,
          status: 'recruiting',
          start_date: formData.start_date || null,
        })
        .select()
        .single();

      if (projectError) {
        throw projectError;
      }

      if (!newProject) {
        throw new Error('프로젝트 생성에 실패했습니다.');
      }

      // 프로젝트 리더를 멤버로 추가
      const { error: memberError } = await supabase
        .from('project_members')
        .insert({
          project_id: newProject.id,
          resident_id: resident.id,
          role: 'leader',
        });

      if (memberError) {
        console.error('멤버 추가 오류:', memberError);
        // 멤버 추가 실패해도 프로젝트는 생성되었으므로 계속 진행
      }

      setFormData({ title: '', description: '', start_date: '' });
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err: any) {
      console.error('프로젝트 생성 오류:', err);
      setError(err.message || '프로젝트 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-gradient-to-br from-black via-[#2B0727]/50 to-black border border-[#BA8E4C]/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">새 프로젝트 생성</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  프로젝트 제목 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors"
                  placeholder="프로젝트 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  프로젝트 설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors min-h-[120px] resize-none"
                  placeholder="프로젝트에 대해 설명해주세요"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  시작일 (선택사항)
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2B0727] to-[#BA8E4C] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? '생성 중...' : '프로젝트 생성'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

