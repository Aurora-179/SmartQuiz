'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CommunityHub } from '@/components/CommunityHub';
import { Lock } from 'lucide-react';

export default function TeacherCommunityPage() {
  const { currentUser, setLoginModalOpen } = useApp();

  if (currentUser.role === 'guest') {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="p-4 bg-sage-100 dark:bg-sage-900/60 text-sage-600 rounded-full w-fit mx-auto border border-sage-300">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
          Portal Sign In Required
        </h2>
        <p className="text-stone-500 text-xs leading-relaxed">
          The Campus Community Chat Hub is accessible to verified campus teachers. Please sign in to join discussions.
        </p>
        <button
          onClick={() => setLoginModalOpen(true)}
          className="btn-sage px-6 py-2.5 text-xs font-bold shadow-md"
        >
          Sign In to Portal
        </button>
      </div>
    );
  }

  return <CommunityHub />;
}
