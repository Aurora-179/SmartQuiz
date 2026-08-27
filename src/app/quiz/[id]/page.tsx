'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { QuizEngine } from '@/components/QuizEngine';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function QuizTakingPage() {
  const params = useParams();
  const router = useRouter();
  const { quizzes, currentActiveQuiz, startQuiz, currentUser } = useApp();
  const [loading, setLoading] = useState(true);

  const quizId = params?.id ? Number(params.id) : null;

  const dashboardLink =
    currentUser.role === 'teacher'
      ? '/teacher'
      : currentUser.role === 'student'
      ? '/student'
      : currentUser.role === 'admin'
      ? '/admin'
      : '/';

  useEffect(() => {
    if (!quizId) {
      setLoading(false);
      return;
    }

    if (!currentActiveQuiz || currentActiveQuiz.id !== quizId) {
      const foundQuiz = quizzes.find((q) => q.id === quizId);
      if (foundQuiz) {
        startQuiz(foundQuiz);
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-stone-500 text-sm">Loading Quiz Examination Session...</p>
      </div>
    );
  }

  if (!currentActiveQuiz && !loading) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-full w-fit mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">Quiz Not Found</h2>
        <p className="text-stone-500 text-sm">
          The requested examination or practice quiz session could not be located or has expired.
        </p>
        <Link href={dashboardLink} className="btn-sage inline-flex items-center gap-2 text-xs">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return <QuizEngine />;
}
