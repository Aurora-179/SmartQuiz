'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  History,
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Calendar,
  Search,
  FileText,
} from 'lucide-react';

interface QuizHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizHistoryModal: React.FC<QuizHistoryModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, attempts, quizzes, setReviewQuizId, startQuiz } = useApp();
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  // Filter attempts belonging to current student
  const studentAttempts = attempts.filter(
    (a) =>
      (currentUser.rollNo && a.studentRoll === currentUser.rollNo) ||
      a.studentName === currentUser.name
  );

  const filteredAttempts = studentAttempts.filter((att) => {
    const quiz = quizzes.find((q) => q.id === att.quizId);
    const title = quiz?.title || 'Quiz Exam';
    const subject = quiz?.subject || '';
    return (
      title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      subject.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sage-100 dark:bg-sage-900/60 rounded-2xl text-sage-600 dark:text-sage-300">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                <span>My Examination & Quiz History</span>
                <span className="badge-sage text-xs">{studentAttempts.length} Completed</span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Track all your submitted exams, scores, and review correct answers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search history by quiz title or subject..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sage-500 text-stone-900 dark:text-white"
            />
          </div>
        </div>

        {/* History List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
          {filteredAttempts.length > 0 ? (
            filteredAttempts.map((att, idx) => {
              const quiz = quizzes.find((q) => q.id === att.quizId);
              const percentage = Math.round((att.score / att.total) * 100);
              const isPassed = percentage >= 50;

              return (
                <div
                  key={idx}
                  className="glass-card p-5 border border-stone-200 dark:border-stone-800 hover:border-sage-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sage-100 dark:bg-sage-900/60 text-sage-800 dark:text-sage-200 px-2.5 py-0.5 rounded-md">
                        {quiz?.subject || 'Course Quiz'}
                      </span>
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {att.submittedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-stone-900 dark:text-white text-base">
                      {quiz?.title || `Quiz #${att.quizId}`}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Instructor: {quiz?.teacherName || 'Faculty System'} • Total Questions: {att.total}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100 dark:border-stone-800">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Score Result</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm font-black ${
                            isPassed
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {att.score} / {att.total} ({percentage}%)
                        </span>
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setReviewQuizId(att.quizId);
                          onClose();
                        }}
                        className="btn-outline-sage text-xs py-1.5 px-3 flex items-center gap-1 font-bold whitespace-nowrap"
                        title="Review Answers"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>

                      {quiz && quiz.isPublic && (
                        <button
                          onClick={() => {
                            startQuiz(quiz);
                            onClose();
                          }}
                          className="btn-sage text-xs py-1.5 px-3 flex items-center gap-1 font-bold whitespace-nowrap"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Retake</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="p-3 bg-stone-100 dark:bg-stone-800 text-stone-400 rounded-full w-fit mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base">
                No Quiz History Found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                You haven&apos;t completed any examinations or practice modules yet. Take a quiz from your dashboard or practice catalog to see results here.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
