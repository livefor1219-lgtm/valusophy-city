'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase';
import { LogIn, LogOut, User } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { signInWithGoogle, signOut } from '@/lib/auth';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'CITYMAP', path: '/citymap' },
  { name: 'PROFILE', path: '/profile' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClientComponentClient();
    
    // 현재 사용자 가져오기
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-transparent overflow-hidden flex items-center justify-center p-1.5 relative">
              <Image
                src="/logo-seal.svg"
                alt="Valusophy City seal"
                width={48}
                height={48}
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <span className="text-white font-semibold text-lg font-display">
              Valusophy City
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative px-4 py-2 rounded-lg transition-colors"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 text-sm ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    } transition-colors`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* 인증 버튼 */}
            <div className="flex items-center gap-2">
              {!loading && (
                user ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">
                        {user.email?.split('@')[0] || '내 프로필'}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden md:inline">로그아웃</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#12061A] to-[#BA8E4C] hover:opacity-90 transition-opacity text-white text-sm font-semibold"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden md:inline">Google 로그인</span>
                    <span className="md:hidden">로그인</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

