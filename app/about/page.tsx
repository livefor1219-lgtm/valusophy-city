'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, Globe, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#BA8E4C] to-[#2B0727] bg-clip-text text-transparent">
            About Valusophy
          </h1>
          <p className="text-xl text-gray-400">
            철학적 세계관 위의 디지털 도시
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-[#BA8E4C]" />
              철학과 비전
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              발루소사이어시티는 단순한 포트폴리오 플랫폼이 아닙니다. 
              각자의 삶과 창작을 의미 있게 연결하는 메타 커뮤니티입니다. 
              우리는 개인의 창작 활동이 시각화되고 다른 사람들과 공유될 때 
              더욱 깊은 가치를 만들어낸다고 믿습니다.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#BA8E4C]" />
              핵심 가치
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#BA8E4C] mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">창작의 자유</strong>
                  <p className="text-gray-400">어떤 형태의 창작물도 자유롭게 표현하고 공유할 수 있습니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#2B0727] mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">커뮤니티 협업</strong>
                  <p className="text-gray-400">같은 관심사를 가진 사람들과 협업하고 함께 성장합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#BA8E4C] mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">시각적 경험</strong>
                  <p className="text-gray-400">창작 활동이 자동으로 아름답게 시각화되어 감상을 돕습니다.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-8 rounded-2xl bg-gradient-to-br from-[#2B0727]/30 to-black/30 border border-[#BA8E4C]/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-[#BA8E4C]" />
              발루루체의 의미
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              <strong>발루루체</strong>는 각 입주민의 생활 공간이자 창작 작업실입니다. 
              펜트하우스처럼 최상층에 위치한 이 공간은 개인의 아이덴티티를 담은 
              디지털 아파트입니다. 여기서는 자신의 작업물을 전시하고, 
              일상을 기록하며, 다른 사람들과 소통합니다.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-[#BA8E4C]" />
              Ma'at Index (발루소피 지수)
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Ma'at은 고대 이집트의 정의, 균형, 조화를 상징하는 개념입니다. 
              발루소사이어시티에서는 도시 전체의 에너지와 조화를 추적하는 
              'Ma'at Index'로 커뮤니티의 건강한 활동을 측정합니다. 
              이 지수는 개인과 집단의 창작 활동이 얼마나 활발하고 의미 있는지 보여줍니다.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

