'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, CheckCircle, RotateCcw, HelpCircle, AlertCircle } from 'lucide-react';

export const ReviewQuizModal: React.FC = () => {
  const { reviewQuizId, setReviewQuizId, quizzes, attempts, currentUser, startQuiz } = useApp();

  if (!reviewQuizId) return null;

  const quiz = quizzes.find((q) => q.id === reviewQuizId);
  const attempt = attempts.find(
    (a) => a.quizId === reviewQuizId && a.studentRoll === currentUser.rollNo
  );

  if (!quiz) return null;

  const handlePracticeAgain = () => {
    setReviewQuizId(null);
    startQuiz(quiz);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-2xl w-full p-6 space-y-6 relative my-8 shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={() => setReviewQuizId(null)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-sage-600" />
            <span>Quiz Review & Practice Mode</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {quiz.title} • Subject: {quiz.subject}
          </p>
        </div>

        {/* Score Highlight Banner */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm">
              Your Recorded Score: {attempt ? `${attempt.score} / ${attempt.total}` : 'N/A'}
            </h3>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-400">
              Answer key verified by course instructor.
            </p>
          </div>

          <button
            onClick={handlePracticeAgain}
            className="btn-sage text-xs py-2 px-4 font-bold flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Practice Again
          </button>
        </div>

        {/* Answer Key List */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {quiz.questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
              <div className="font-bold text-stone-900 dark:text-white flex items-start gap-2">
                <span className="text-sage-600">Q{idx + 1}.</span>
                <span>{q.text}</span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Correct Answer: {q.answer}</span>
                </div>

                {attempt?.answers && (
                  <div className="text-stone-500 font-medium pl-5">
                    Your Answer: <span className="font-bold text-stone-800 dark:text-stone-200">{attempt.answers[q.id] || '(No Answer)'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
