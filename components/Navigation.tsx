'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
        </div>
      </div>
    </nav>
  );
}

