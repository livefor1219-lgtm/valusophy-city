"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, Users, Sparkles, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Valusophy City
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              발루소사이어시티
            </p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              철학적 세계관 위의 디지털 도시<br />
              각자의 삶과 창작을 시각화하는 메타 커뮤니티
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                입주 신청하기
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/citymap"
                className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
              >
                시티맵 보기
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            발루시티의 특별함
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Building2 className="w-12 h-12" />}
              title="펜트하우스 공간"
              description="각 입주민은 자신만의 아파트를 꾸며 포트폴리오로 활용할 수 있습니다. 인물 소개, 작업물 전시, 협업 링크를 입체적으로 구성하세요."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="일상 & 창작물 공유"
              description="자신의 일상을 자랑하고 창작물을 업로드하여 정기적으로 보고하세요. AI가 자동으로 활동을 기록하고 시각화합니다."
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12" />}
              title="협업 프로젝트"
              description="다른 유저의 공간을 방문하고 협업을 시작하세요. 공용 아틀리에에서 공동 창작 프로젝트를 운영할 수 있습니다."
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="∞" label="발루루체" />
            <StatCard number="0+" label="입주민" />
            <StatCard number="0+" label="프로젝트" />
            <StatCard number="0+" label="창작물" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Valusophy City. Neo-minimal + Ether + Glow</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
}
