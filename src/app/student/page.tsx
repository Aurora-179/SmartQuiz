'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { StudentDashboard } from '@/components/StudentDashboard';

export default function StudentPage() {
  const { currentUser, setLoginModalOpen } = useApp();
  const router = useRouter();

  useEffect(() => {
    // Check role after state hydration
    const savedUser = localStorage.getItem('sq_user');
    const role = currentUser.role !== 'guest' ? currentUser.role : (savedUser ? JSON.parse(savedUser).role : 'guest');
    
    if (role !== 'student') {
      if (role === 'guest') setLoginModalOpen(true);
      router.push('/');
    }
  }, [currentUser, router, setLoginModalOpen]);

  if (currentUser.role !== 'student') {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-stone-500">Access Restricted. Student Portal login required.</p>
        <button onClick={() => setLoginModalOpen(true)} className="btn-sage">
          Sign In to Student Portal
        </button>
      </div>
    );
  }

  return <StudentDashboard />;
}
