'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Key,
  History,
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/Modals/ChangePasswordModal';
import { ReviewQuizModal } from '@/components/Modals/ReviewQuizModal';
import { QuizHistoryModal } from '@/components/Modals/QuizHistoryModal';
import { PracticeHub } from '@/components/PracticeHub';

export const StudentDashboard: React.FC = () => {
  const { currentUser, attempts } = useApp();

  const [changePassOpen, setChangePassOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const studentMajor = currentUser.major || 'IST';
  const studentYear = currentUser.year || 'Third Year';

  const studentAttemptsCount = attempts.filter(
    (a) =>
      (currentUser.rollNo && a.studentRoll === currentUser.rollNo) ||
      a.studentName === currentUser.name
  ).length;

  return (
    <div className="space-y-8 py-6">
      
      {/* Student Profile Header */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-sage">Student Portal</span>
            <span className="text-xs font-bold text-sage-600 dark:text-sage-400">
              {currentUser.rollNo}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Email: <span className="font-semibold text-stone-700 dark:text-stone-300">{currentUser.email}</span> • 
            Academic Scope: <span className="font-semibold text-sage-700 dark:text-sage-300">{studentYear} ({studentMajor})</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setHistoryOpen(true)}
            className="btn-sage text-xs flex items-center gap-1.5 py-2 px-3.5 font-bold shadow-sm"
          >
            <History className="w-4 h-4" />
            <span>My Quiz History</span>
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ml-0.5">
              {studentAttemptsCount}
            </span>
          </button>
          <button
            onClick={() => setChangePassOpen(true)}
            className="btn-outline-sage text-xs flex items-center gap-1.5 py-2"
          >
            <Key className="w-4 h-4" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* Embedded Practice Catalog Hub */}
      <PracticeHub />

      <ChangePasswordModal isOpen={changePassOpen} onClose={() => setChangePassOpen(false)} />
      <QuizHistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
      <ReviewQuizModal />

    </div>
  );
};
