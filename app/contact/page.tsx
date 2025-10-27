'use client';

import { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interests: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase로 데이터 저장
    console.log('입주 신청:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            입주 신청
          </h1>
          <p className="text-xl text-gray-400">
            발루소사이어시티의 새로운 입주민이 되세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">info@valusophy.city</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white">Digital Metaverse</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Support</div>
                  <div className="text-white">24/7 Available</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-3">입주 혜택</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 개인 펜트하우스 공간 제공</li>
                <li>• 창작물 전시 및 포트폴리오 관리</li>
                <li>• 협업 프로젝트 참여</li>
                <li>• 다른 창작자와의 네트워킹</li>
                <li>• 활동 로그 자동 시각화</li>
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">신청서 작성</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  이름 또는 닉네임
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="예: Jane Doe"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  이메일 주소
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  자기소개 및 관심사
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="자신을 소개하고 발루시티에서 무엇을 하고 싶은지 알려주세요..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitted ? '신청 완료!' : '입주 신청하기'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

