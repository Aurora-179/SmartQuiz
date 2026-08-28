'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Quiz } from '@/types';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  HelpCircle,
  PlayCircle,
  GraduationCap,
  Sparkles,
  Layers,
  History,
  LockKeyhole,
  X,
} from 'lucide-react';
import { QuizHistoryModal } from '@/components/Modals/QuizHistoryModal';

const MAJORS = ['All', 'IST', 'CE', 'ECE', 'PrE', 'AME'];
const YEARS = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year'];

export const PracticeHub: React.FC = () => {
  const { quizzes, startQuiz, currentUser, attempts } = useApp();

  const [selectedMajor, setSelectedMajor] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [catalogType, setCatalogType] = useState<'public' | 'private'>('public');
  const [selectedPrivateQuiz, setSelectedPrivateQuiz] = useState<Quiz | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');

  const studentAttemptsCount = attempts.filter(
    (a) =>
      (currentUser.rollNo && a.studentRoll === currentUser.rollNo) ||
      a.studentName === currentUser.name
  ).length;

  const publicQuizzes = quizzes.filter((q) => q.isPublic);
  const privateQuizzes = quizzes.filter((q) => {
    if (q.isPublic) return false;
    if (currentUser.role !== 'student') return true;
    return q.major === currentUser.major && q.year === currentUser.year;
  });
  const visibleQuizzes = catalogType === 'public' ? publicQuizzes : privateQuizzes;

  const filteredQuizzes = visibleQuizzes.filter((quiz) => {
    const matchesMajor = selectedMajor === 'All' || quiz.major === selectedMajor;
    const matchesYear = selectedYear === 'All Years' || quiz.year === selectedYear;
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMajor && matchesYear && matchesSearch;
  });

  const requestPrivateQuizAccess = (quiz: Quiz) => {
    setSelectedPrivateQuiz(quiz);
    setAccessCode('');
    setAccessError('');
  };

  const startPrivateQuiz = () => {
    if (!selectedPrivateQuiz) return;
    if (accessCode.trim() !== selectedPrivateQuiz.code) {
      setAccessError('The 6-digit access code is incorrect.');
      return;
    }
    setSelectedPrivateQuiz(null);
    startQuiz(selectedPrivateQuiz);
  };

  return (
    <div className="space-y-8 py-6">
      

      {/* Filter Controls Bar */}
      <div className="glass-card p-6 space-y-4 shadow-sm border border-stone-200 dark:border-stone-800">
        <div className="flex flex-wrap gap-2 border-b border-stone-100 pb-4 dark:border-stone-800">
          <button
            onClick={() => setCatalogType('public')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              catalogType === 'public'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
            }`}
          >
            <BookOpen className="h-4 w-4" /> Public Practice ({publicQuizzes.length})
          </button>
          <button
            onClick={() => setCatalogType('private')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              catalogType === 'private'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
            }`}
          >
            <LockKeyhole className="h-4 w-4" /> Private Exams ({privateQuizzes.length})
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Major Filter Tabs */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Filter by Major Specialization
            </span>
            <div className="flex flex-wrap gap-2">
              {MAJORS.map((major) => (
                <button
                  key={major}
                  onClick={() => setSelectedMajor(major)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedMajor === major
                      ? 'bg-sage-600 text-white border-sage-700 shadow-sm'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  {major === 'All' ? 'All Majors' : major}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter Dropdown & My History Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Academic Year
              </span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sage-500 focus:outline-none"
              >
                {YEARS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {currentUser.role === 'student' && (
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                  Quiz Records
                </span>
                <button
                  onClick={() => setHistoryOpen(true)}
                  className="btn-outline-sage text-xs py-2 px-3.5 flex items-center gap-1.5 font-bold shadow-xs"
                >
                  <History className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                  <span>My Quiz History</span>
                  <span className="bg-sage-600 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold ml-1">
                    {studentAttemptsCount}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 absolute left-3.5 top-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by quiz title, subject, or instructor name..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
        </div>
      </div>

      {/* Quizzes List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sage-600" />
            <span>Available Modules ({filteredQuizzes.length})</span>
          </h2>
          {(selectedMajor !== 'All' || selectedYear !== 'All Years' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedMajor('All');
                setSelectedYear('All Years');
                setSearchQuery('');
              }}
              className="text-xs text-sage-600 dark:text-sage-400 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`glass-card p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-t-4 ${quiz.isPublic ? 'border-t-sage-500' : 'border-t-rose-500'}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sage-100 dark:bg-sage-900/60 text-sage-800 dark:text-sage-200 px-2.5 py-1 rounded-md border border-sage-300 dark:border-sage-700">
                      {quiz.major} • {quiz.year}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {quiz.overallTime} mins
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 dark:text-white text-base leading-snug">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-sage-600" />
                    <span>{quiz.questions.length} Questions (MCQ, T/F, Blanks)</span>
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    <span className="block text-[10px] uppercase font-semibold text-stone-500">Instructor</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{quiz.teacherName}</span>
                  </div>
                  <button
                    onClick={() => quiz.isPublic ? startQuiz(quiz) : requestPrivateQuizAccess(quiz)}
                    className={`${quiz.isPublic ? 'btn-sage' : 'bg-rose-600 hover:bg-rose-700 text-white'} text-xs py-2 px-4 flex items-center gap-1.5 font-bold shadow-sm rounded-xl transition-colors`}
                  >
                    {quiz.isPublic ? <PlayCircle className="w-4 h-4" /> : <LockKeyhole className="w-4 h-4" />}
                    <span>{quiz.isPublic ? 'Start Practice' : 'Enter Exam'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center space-y-3 border border-stone-200 dark:border-stone-800">
            <div className="p-3 bg-stone-100 dark:bg-stone-800 text-stone-400 rounded-full w-fit mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-800 dark:text-stone-200">No Matching Practice Quizzes</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No open practice modules were found matching your selected major or search query. Try choosing &quot;All Majors&quot; or clearing filters.
            </p>
          </div>
        )}
      </div>

      {/* Quiz History Modal */}
      <QuizHistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />

      {selectedPrivateQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm">
          <div className="glass-card relative w-full max-w-md space-y-5 border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-700 dark:bg-stone-900">
            <button
              type="button"
              onClick={() => setSelectedPrivateQuiz(null)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 dark:hover:text-white"
              aria-label="Close private exam access dialog"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
                <LockKeyhole className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Private Exam</span>
              </div>
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-white">{selectedPrivateQuiz.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Enter the 6-digit access code provided by your instructor to begin.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); startPrivateQuiz(); }} className="space-y-3">
              <input
                autoFocus
                inputMode="numeric"
                maxLength={6}
                value={accessCode}
                onChange={(event) => { setAccessCode(event.target.value.replace(/\D/g, '')); setAccessError(''); }}
                placeholder="6-digit access code"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-center font-mono text-lg font-bold tracking-[0.35em] text-stone-900 outline-none focus:ring-2 focus:ring-rose-500 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
              />
              {accessError && <p className="text-xs font-semibold text-rose-600 dark:text-rose-300">{accessError}</p>}
              <button type="submit" className="w-full rounded-xl bg-rose-600 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-rose-700">Verify Code & Start Exam</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
