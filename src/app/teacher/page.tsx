'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TeacherDashboard } from '@/components/TeacherDashboard';

export default function TeacherPage() {
  const { currentUser, setLoginModalOpen } = useApp();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('sq_user');
    const role = currentUser.role !== 'guest' ? currentUser.role : (savedUser ? JSON.parse(savedUser).role : 'guest');

    if (role !== 'teacher') {
      if (role === 'guest') setLoginModalOpen(true);
      router.push('/');
    }
  }, [currentUser, router, setLoginModalOpen]);

  if (currentUser.role !== 'teacher') {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-stone-500">Access Restricted. Teacher Management Portal login required.</p>
        <button onClick={() => setLoginModalOpen(true)} className="btn-sage">
          Sign In to Teacher Portal
        </button>
      </div>
    );
  }

  return <TeacherDashboard />;
}
