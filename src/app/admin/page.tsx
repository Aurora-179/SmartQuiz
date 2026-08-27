'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AdminDashboard } from '@/components/AdminDashboard';
import { ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const { currentUser, isMounted } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) return;

    if (currentUser.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [currentUser, isMounted, router]);

  if (!isMounted) return null;

  if (currentUser.role !== 'admin') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="p-4 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full w-fit mx-auto border border-amber-300">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
          Admin Portal Access Restricted
        </h2>
        <p className="text-stone-500 text-xs leading-relaxed">
          Redirecting to dedicated Admin Login Portal...
        </p>
      </div>
    );
  }

  return <AdminDashboard />;
}
