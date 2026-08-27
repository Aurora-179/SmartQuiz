'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Quiz } from '@/types';
import {
  PlusCircle,
  BarChart3,
  FileSpreadsheet,
  Printer,
  X,
  Trash2,
  Eye,
} from 'lucide-react';
import { CreateQuizModal } from '@/components/Modals/CreateQuizModal';

export const TeacherDashboard: React.FC = () => {
  const { currentUser, quizzes, deleteQuiz, attempts, students } = useApp();

  const [createQuizOpen, setCreateQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // Filter quizzes created by teachers
  const teacherQuizzes = quizzes.filter(
    (q) => !q.isPublic || q.teacherName === currentUser.name || currentUser.role === 'teacher'
  );

  const handleDeleteQuiz = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete quiz "${title}"?`)) {
      deleteQuiz(id);
      if (selectedQuiz?.id === id) setSelectedQuiz(null);
    }
  };

  const exportScoresCSV = (quiz: Quiz) => {
    const quizAttempts = attempts.filter((a) => a.quizId === quiz.id);

    let csvContent = 'Roll No,Student Name,Status,Score,Total,Submission Date\n';

    students.forEach((s) => {
      // Check if student belongs to quiz scope
      if (
        (quiz.major === 'All' || quiz.major === s.major) &&
        (quiz.year === 'All' || quiz.year === s.year)
      ) {
        const att = quizAttempts.find((a) => a.studentRoll === s.rollNo);
        if (att) {
          csvContent += `"${s.rollNo}","${s.name}","Submitted",${att.score},${att.total},"${att.submittedAt}"\n`;
        } else {
          csvContent += `"${s.rollNo}","${s.name}","Pending",0,${quiz.questions.length},"N/A"\n`;
        }
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${quiz.title.replace(/\s+/g, '_')}_Scores.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6">
      
      {/* Side-by-Side Responsive Layout */}
      <div className={`grid grid-cols-1 ${selectedQuiz ? 'lg:grid-cols-12' : ''} gap-6 items-start transition-all duration-300`}>
        
        {/* Left Column: Quizzes Table (Full data columns always preserved) */}
        <div className={`glass-card overflow-hidden ${selectedQuiz ? 'lg:col-span-7' : 'w-full'} transition-all duration-300`}>
          <div className="p-4 md:p-5 bg-stone-50/80 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-stone-900 dark:text-white text-base">
                Created Examinations & Practice Quizzes
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {selectedQuiz
                  ? 'Click any quiz row to view its score analytics.'
                  : 'Manage live access codes, question banks, and student attempts.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="badge-sage font-mono font-bold">
                {teacherQuizzes.length} Quizzes
              </span>
              <button
                onClick={() => setCreateQuizOpen(true)}
                className="btn-sage text-xs py-1.5 px-3 flex items-center gap-1.5 font-bold shadow-md whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Create New
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 uppercase font-extrabold tracking-wider border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3 px-3">Quiz Title</th>
                  <th className="py-3 px-3">Type & Scope</th>
                  <th className="py-3 px-3">Access Code</th>
                  <th className="py-3 px-3">Questions</th>
                  <th className="py-3 px-3">Submissions</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {teacherQuizzes.map((q) => {
                  const subCount = attempts.filter((a) => a.quizId === q.id).length;
                  const isCurrentSelected = selectedQuiz?.id === q.id;

                  return (
                    <tr
                      key={q.id}
                      onClick={() => {
                        if (selectedQuiz) {
                          setSelectedQuiz(q);
                        }
                      }}
                      className={`transition-all ${
                        selectedQuiz ? 'cursor-pointer' : ''
                      } ${
                        isCurrentSelected
                          ? 'bg-sage-100/90 dark:bg-sage-900/70 border-l-4 border-l-sage-600 font-bold'
                          : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <td className="py-3.5 px-3 font-bold text-stone-900 dark:text-white max-w-[150px] sm:max-w-none">
                        <span className="line-clamp-1">{q.title}</span>
                        <span className="block text-[10px] text-stone-400 font-normal truncate">{q.subject}</span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {q.isPublic ? (
                          <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                            Public Practice
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-sage-100 dark:bg-sage-950 text-sage-800 dark:text-sage-200 font-bold text-[10px]">
                            {q.year} ({q.major})
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-sage-600 dark:text-sage-400 whitespace-nowrap">
                        {q.code || 'OPEN'}
                      </td>

                      <td className="py-3.5 px-3 font-semibold whitespace-nowrap">{q.questions.length} Qs</td>

                      <td className="py-3.5 px-3 font-bold text-stone-900 dark:text-white whitespace-nowrap">{subCount}</td>

                      <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                        {/* Show Analytics button ONLY when side panel is closed */}
                        {!selectedQuiz && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedQuiz(q);
                            }}
                            className="p-1.5 rounded-lg text-[11px] font-bold bg-sage-50 text-sage-700 hover:bg-sage-100 dark:bg-sage-950 dark:text-sage-300 inline-flex items-center gap-1 transition-all"
                            title="View Score Analytics"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Analytics</span>
                          </button>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuiz(q.id, q.title);
                          }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 font-semibold inline-flex items-center gap-1 text-xs"
                          title="Delete Quiz"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Compact Quiz Analytics Panel */}
        {selectedQuiz && (
          <div className="lg:col-span-5 glass-card p-4 sm:p-5 space-y-5 border-2 border-sage-500/40 animate-fade-in sticky top-20">
            
            {/* Header Controls */}
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-sage-600" />
                  <span>Score Analytics</span>
                </h3>
                <p className="text-xs font-bold text-sage-600 dark:text-sage-400 line-clamp-1">
                  {selectedQuiz.title}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">
                  Code: <span className="font-mono font-bold text-stone-900 dark:text-white me-2">{selectedQuiz.code || 'OPEN'}</span>
                  Subject: <span className="font-semibold">{selectedQuiz.subject}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 no-print shrink-0">
                <button
                  onClick={() => exportScoresCSV(selectedQuiz)}
                  className="btn-outline-sage text-[10px] py-1 px-2 flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400"
                  title="Export Scores CSV"
                >
                  <FileSpreadsheet className="w-3 h-3" /> CSV
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-1 rounded-lg bg-stone-900 text-white hover:bg-black text-[10px] font-bold flex items-center gap-1"
                  title="Print Report"
                >
                  <Printer className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="p-1 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                  title="Close Side Panel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Stats Cards */}
            {(() => {
              const quizAttempts = attempts.filter((a) => a.quizId === selectedQuiz.id);
              const targetScopeStudents = students.filter(
                (s) => (selectedQuiz.major === 'All' || selectedQuiz.major === s.major) && (selectedQuiz.year === 'All' || selectedQuiz.year === s.year)
              );

              const submittedCount = quizAttempts.length;
              const pendingCount = Math.max(0, targetScopeStudents.length - submittedCount);
              const totalScoreSum = quizAttempts.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0);
              const avgPct = submittedCount > 0 ? Math.round(totalScoreSum / submittedCount) : 0;

              return (
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-sage-50 dark:bg-sage-950/60 border border-sage-200 dark:border-sage-800">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-sage-700 dark:text-sage-300 block truncate">Submitted</span>
                    <p className="text-xl font-black text-sage-800 dark:text-sage-200 mt-0.5">{submittedCount}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 block truncate">Pending</span>
                    <p className="text-xl font-black text-amber-800 dark:text-amber-200 mt-0.5">{pendingCount}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block truncate">Class Avg</span>
                    <p className="text-xl font-black text-emerald-800 dark:text-emerald-200 mt-0.5">{avgPct}%</p>
                  </div>
                </div>
              );
            })()}

            {/* Student Scores Roster */}
            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-[11px]">
                Enrolled Student Roster (`submitted` / `pending`)
              </h4>
              <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-stone-100 dark:bg-stone-900 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-800">
                    <tr>
                      <th className="py-2 px-2.5">Roll No</th>
                      <th className="py-2 px-2.5">Name</th>
                      <th className="py-2 px-2.5">Status</th>
                      <th className="py-2 px-2.5">Score</th>
                      <th className="py-2 px-2.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                    {students
                      .filter(
                        (s) =>
                          (selectedQuiz.major === 'All' || selectedQuiz.major === s.major) &&
                          (selectedQuiz.year === 'All' || selectedQuiz.year === s.year)
                      )
                      .map((std) => {
                        const att = attempts.find((a) => a.quizId === selectedQuiz.id && a.studentRoll === std.rollNo);

                        return (
                          <tr key={std.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                            <td className="py-2 px-2.5 font-mono font-bold text-[10px]">{std.rollNo}</td>
                            <td className="py-2 px-2.5 font-bold truncate max-w-[90px]">{std.name}</td>
                            <td className="py-2 px-2.5">
                              {att ? (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                                  Submitted
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[9px]">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-2.5 font-bold">
                              {att ? `${att.score}/${att.total}` : '-'}
                            </td>
                            <td className="py-2 px-2.5 text-stone-400 font-mono text-[9px] truncate max-w-[80px]">
                              {att ? att.submittedAt : '-'}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      <CreateQuizModal isOpen={createQuizOpen} onClose={() => setCreateQuizOpen(false)} />

    </div>
  );
};
