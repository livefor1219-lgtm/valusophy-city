'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Users, TrendingUp } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import Link from 'next/link';
import Image from 'next/image';
import CityMap3D from '@/components/CityMap3D';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#12061A]/20 to-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#BA8E4C] to-[#12061A] bg-clip-text text-transparent font-display">
            City Map
          </h1>
          <p className="text-xl text-gray-400">
            발루소사이어시티의 3D 인터랙티브 월드맵
          </p>
        </motion.div>

        {/* 3D City Map */}
        {!loading && residents.length > 0 && (
          <div className="mb-12">
            <CityMap3D
              buildings={residents.map((resident, index) => ({
                id: resident.id,
                residentId: resident.id,
                position: [
                  (index % 5) * 2 - 4, // X: -4 ~ 4
                  0.5, // Y: 바닥
                  Math.floor(index / 5) * 2 - 2, // Z: -2 ~ 2
                ] as [number, number, number],
                height: 1 + Math.random() * 2, // 랜덤 높이
                color: '#12061A',
                name: resident.name,
                activity: Math.floor(Math.random() * 100), // 임시 활동 지수
              }))}
              onBuildingClick={(buildingId) => {
                window.location.href = `/profile/${buildingId}`;
              }}
            />
          </div>
        )}
        
        {loading && (
          <div className="relative mb-12 h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#12061A]/40 to-black border border-[#BA8E4C]/20 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
              <p className="text-gray-400">도시 맵 로딩 중...</p>
            </div>
          </div>
        )}

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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BA8E4C] to-[#12061A] flex items-center justify-center text-white font-bold">
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

