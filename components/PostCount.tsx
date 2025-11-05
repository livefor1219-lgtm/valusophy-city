'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/browser';

interface PostCountProps {
  residentId: string | null;
}

export default function PostCount({ residentId }: PostCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!residentId) return;

    const loadCount = async () => {
      try {
        const supabase = createBrowserClient();
        const { count, error } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('resident_id', residentId);

        if (error) {
          console.error('Failed to load post count:', error);
          return;
        }

        setCount(count || 0);
      } catch (err) {
        console.error('Failed to load post count:', err);
      }
    };

    loadCount();
  }, [residentId]);

  return <>{count !== null ? count : '-'}</>;
}

