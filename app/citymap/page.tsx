'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Users, TrendingUp } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import Link from 'next/link';
import Image from 'next/image';

interface Resident {
  id: string;
  name: string;
  email: string;
  apartment_number: string;
  building: string;
  floor: number;
  bio?: string;
  profile_image_url?: string;
  status: string;
}

export default function CityMapPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {
    try {
      const supabase = createBrowserClient();
      const { data, error: fetchError } = await supabase
        .from('residents')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setResidents(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load residents');
      console.error('Load residents error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0727]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#BA8E4C] to-[#2B0727] bg-clip-text text-transparent font-display">
            City Map
          </h1>
          <p className="text-xl text-gray-400">
            발루소사이어시티의 3D 인터랙티브 월드맵
          </p>
        </motion.div>

        {/* 3D Canvas Placeholder */}
        <div className="relative mb-12 h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#2B0727]/40 to-black border border-[#BA8E4C]/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🏙️</div>
              <p className="text-2xl text-gray-400 mb-2">3D City Map</p>
              <p className="text-gray-500">
                Three.js로 구현 예정 - 건물 클릭 시 각 입주민 페이지로 이동
              </p>
            </div>
          </div>
          
          {/* 미니맵 오버레이 */}
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-2">발루루체</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-white/10 rounded hover:bg-[#2B0727]/40 transition-colors cursor-pointer flex items-center justify-center text-white/60 text-sm"
                >
                  {i}층
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Users />} value={residents.length} label="총 입주민" />
          <StatCard icon={<TrendingUp />} value={residents.length > 0 ? `${residents.length}+` : '0'} label="활성 프로젝트" />
          <StatCard icon={<User />} value={residents.length} label="온라인 인원" />
        </div>

        {/* Residents List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">입주민 목록</h2>
          
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
              <p>로딩 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>{error}</p>
            </div>
          ) : residents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {residents.map((resident) => (
                <Link key={resident.id} href={`/profile/${resident.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {resident.profile_image_url ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                          <Image
                            src={resident.profile_image_url}
                            alt={resident.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#2B0727] flex items-center justify-center text-white font-bold">
                          {resident.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-white font-semibold">{resident.name}</div>
                        <div className="text-gray-400 text-sm">
                          {resident.building} {resident.floor}층
                        </div>
                        {resident.apartment_number && (
                          <div className="text-gray-500 text-xs mt-1">
                            {resident.apartment_number}
                          </div>
                        )}
                      </div>
                    </div>
                    {resident.bio && (
                      <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                        {resident.bio}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-sm text-gray-400">활성</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>아직 입주민이 없습니다.</p>
              <p className="text-sm mt-2">첫 입주민이 되어보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: any) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-4">
        <div className="text-[#BA8E4C]">{icon}</div>
        <div>
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-gray-400 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );
}

