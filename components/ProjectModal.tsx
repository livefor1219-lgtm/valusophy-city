'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  user: User | null;
  onApply?: () => void;
}

export default function ProjectModal({ isOpen, onClose, project, user, onApply }: ProjectModalProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!user || !project) return;

    setLoading(true);
    setError('');

    try {
      const supabase = createClientComponentClient();

      // resident 찾기
      const { data: resident } = await supabase
        .from('residents')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (!resident) {
        setError('입주민 정보를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      // 프로젝트 신청
      const { error: applyError } = await supabase
        .from('project_applications')
        .insert({
          project_id: project.id,
          resident_id: resident.id,
          message: message || null,
          status: 'pending',
        });

      if (applyError) {
        if (applyError.code === '23505') {
          setError('이미 신청한 프로젝트입니다.');
        } else {
          setError('신청 중 오류가 발생했습니다.');
        }
      } else {
        setMessage('');
        if (onApply) {
          onApply();
        }
        onClose();
      }
    } catch (err) {
      console.error('신청 오류:', err);
      setError('신청 중 오류가 발생했습니다.');
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
          className="relative bg-gradient-to-br from-black via-[#12061A]/50 to-black border border-[#BA8E4C]/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-gray-400">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">상태</div>
                <div className="text-white font-semibold">
                  {project.status === 'recruiting' ? '모집 중' :
                   project.status === 'in_progress' ? '진행 중' :
                   '완료'}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">시작일</div>
                <div className="text-white font-semibold">
                  {project.start_date || '미정'}
                </div>
              </div>
            </div>

            {project.status === 'recruiting' && user && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white">프로젝트 신청</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors min-h-[100px] resize-none"
                  placeholder="신청 메시지를 입력하세요 (선택사항)"
                />
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleApply}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#12061A] to-[#BA8E4C] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {loading ? '신청 중...' : '프로젝트 신청하기'}
                </button>
              </div>
            )}

            {!user && (
              <div className="p-4 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm text-center">
                로그인이 필요합니다.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

