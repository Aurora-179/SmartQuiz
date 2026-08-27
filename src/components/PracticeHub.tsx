'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
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
} from 'lucide-react';

const MAJORS = ['All', 'IST', 'CE', 'ECE', 'PrE', 'AME'];
const YEARS = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year'];

export const PracticeHub: React.FC = () => {
  const { quizzes, startQuiz } = useApp();

  const [selectedMajor, setSelectedMajor] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publicQuizzes = quizzes.filter((q) => q.isPublic);

  const filteredQuizzes = publicQuizzes.filter((quiz) => {
    const matchesMajor = selectedMajor === 'All' || quiz.major === selectedMajor;
    const matchesYear = selectedYear === 'All Years' || quiz.year === selectedYear;
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMajor && matchesYear && matchesSearch;
  });

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl hero-gradient p-8 md:p-10 border border-sage-200 dark:border-sage-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900/80 text-sage-800 dark:text-sage-200 text-xs font-bold border border-sage-300 dark:border-sage-700">
          <BookOpen className="w-4 h-4 text-sage-600 dark:text-sage-300" />
          <span>Open Academic Practice Catalog</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Practice Quizzes & Skill Modules
        </h1>

        <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base max-w-2xl leading-relaxed">
          Explore free, open-access academic practice modules created by university faculty. Filter by your specialization major or academic year to sharpen your knowledge.
        </p>

        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-15 dark:opacity-20 text-sage-700 pointer-events-none">
          <GraduationCap className="w-56 h-56" />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card p-6 space-y-4 shadow-sm border border-stone-200 dark:border-stone-800">
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

          {/* Year Filter Dropdown & Search */}
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
                className="glass-card p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-t-4 border-t-sage-500"
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
                    onClick={() => startQuiz(quiz)}
                    className="btn-sage text-xs py-2 px-4 flex items-center gap-1.5 font-bold shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Start Practice</span>
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

    </div>
  );
};
