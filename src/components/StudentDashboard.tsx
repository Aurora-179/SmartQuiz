'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { academicCurriculum } from '@/lib/initialData';
import {
  User as UserIcon,
  Key,
  BookOpen,
  Lock,
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/Modals/ChangePasswordModal';
import { ReviewQuizModal } from '@/components/Modals/ReviewQuizModal';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    quizzes,
    attempts,
    notifications,
    startQuiz,
    setReviewQuizId,
  } = useApp();

  const [joinCode, setJoinCode] = useState('');
  const [changePassOpen, setChangePassOpen] = useState(false);

  const studentMajor = currentUser.major || 'IST';
  const studentYear = currentUser.year || 'Third Year';

  // Get subjects for student's enrolled major & year
  const enrolledSubjects = academicCurriculum[studentMajor]?.[studentYear] || [
    'Database Management System',
    'Data Communication',
    'Operating System',
    'Compiling Techniques',
  ];

  // Filter assigned graded quizzes matching student's major & year
  const assignedQuizzes = quizzes.filter(
    (q) => !q.isPublic && (q.major === studentMajor || q.major === 'All') && (q.year === studentYear || q.year === 'All')
  );

  // Filter scope notifications
  const studentNotifs = notifications.filter(
    (n) => (n.targetMajor === studentMajor || n.targetMajor === 'All') && (n.targetYear === studentYear || n.targetYear === 'All')
  );

  const handleJoinByCode = () => {
    const cleanCode = joinCode.trim().toUpperCase();
    if (!cleanCode) {
      alert('Please enter a 6-digit access code.');
      return;
    }

    const foundQuiz = quizzes.find((q) => q.code === cleanCode);
    if (!foundQuiz) {
      alert('Invalid Access Code! Please check with your course instructor.');
      return;
    }

    // Verify scope match
    if (
      foundQuiz.major !== 'All' &&
      foundQuiz.major !== studentMajor
    ) {
      alert(`Scope Guard Protection!\n\nThis examination is restricted to ${foundQuiz.major} students only.`);
      return;
    }

    startQuiz(foundQuiz);
    setJoinCode('');
  };

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

        <button
          onClick={() => setChangePassOpen(true)}
          className="btn-outline-sage text-xs flex items-center gap-1.5 py-2"
        >
          <Key className="w-4 h-4" />
          <span>Change Password</span>
        </button>
      </div>

      {/* Pre-Enrolled Subjects */}
      <div className="glass-card p-6 space-y-3 bg-stone-50/50 dark:bg-stone-900/40">
        <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sage-600" />
          <span>Your Pre-Enrolled Major Subjects</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {enrolledSubjects.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-xs"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* 6-Digit Quiz Join Box */}
      <div className="glass-card p-6 md:p-8 space-y-4 border-l-4 border-l-sage-600">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-sage-600" />
            <span>Join Graded Course Examination</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Enter the secret 6-digit access code provided by your instructor to start your official course exam.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            maxLength={6}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="e.g. 849201"
            className="flex-grow px-4 py-3 bg-white text-stone-900 font-mono text-lg font-bold tracking-widest uppercase rounded-xl focus:outline-none focus:ring-4 focus:ring-sage-300"
          />
          <button
            onClick={handleJoinByCode}
            className="bg-stone-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>Join Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Scope Notifications & Assigned Examinations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Academic Major Notifications */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Scope Announcements</span>
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {studentNotifs.length > 0 ? (
              studentNotifs.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300">{n.title}</h4>
                  <p className="text-amber-800/80 dark:text-amber-400">{n.message}</p>
                  <span className="text-[10px] text-amber-600 dark:text-amber-500 font-mono block text-right">{n.date}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 text-center py-6">No scope announcements at this time.</p>
            )}
          </div>
        </div>

        {/* Assigned Course Examinations */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-sage-600" />
              <span>Assigned Examinations & History</span>
            </h3>
            <span className="badge-sage">Scope Protected</span>
          </div>

          <div className="space-y-4">
            {assignedQuizzes.length > 0 ? (
              assignedQuizzes.map((quiz) => {
                const userAttempt = attempts.find(
                  (a) => a.quizId === quiz.id && a.studentRoll === currentUser.rollNo
                );

                return (
                  <div
                    key={quiz.id}
                    className="p-5 rounded-2xl border border-stone-200 dark:border-stone-700/80 bg-stone-50/50 dark:bg-stone-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-sage-100 dark:bg-sage-900/60 text-sage-700 dark:text-sage-300 px-2 py-0.5 rounded-md">
                          Code: {quiz.code}
                        </span>
                        <span className="text-xs text-stone-400">• {quiz.subject}</span>
                      </div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-base">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Instructor: {quiz.teacherName} • {quiz.questions.length} Questions • {quiz.overallTime} Mins
                      </p>
                    </div>

                    <div>
                      {userAttempt ? (
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 uppercase font-bold block">Status</span>
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Score: {userAttempt.score}/{userAttempt.total}
                            </span>
                          </div>
                          <button
                            onClick={() => setReviewQuizId(quiz.id)}
                            className="btn-outline-sage text-xs py-1.5 px-3 flex items-center gap-1 font-bold"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Review / Practice
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startQuiz(quiz)}
                          className="btn-sage text-xs py-2 px-4 font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" /> Take Examination
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-stone-400 text-center py-8">No assigned course examinations currently scheduled.</p>
            )}
          </div>
        </div>

      </div>

      <ChangePasswordModal isOpen={changePassOpen} onClose={() => setChangePassOpen(false)} />
      <ReviewQuizModal />

    </div>
  );
};
