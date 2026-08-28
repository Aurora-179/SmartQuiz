'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Attempt } from '@/types';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShieldAlert,
  XCircle,
  Award,
  RotateCcw,
  BookOpen,
  Layers,
  History,
  FileCheck,
} from 'lucide-react';
import { ReviewQuizModal } from './Modals/ReviewQuizModal';

export const QuizEngine: React.FC = () => {
  const router = useRouter();
  const { currentActiveQuiz, currentUser, submitAttempt, finishQuiz, setReviewQuizId } = useApp();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  const [overallSecondsLeft, setOverallSecondsLeft] = useState(0);
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(0);
  const [cheatingWarningsCount, setCheatingWarningsCount] = useState(0);

  const [completedResult, setCompletedResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    status: 'submitted' | 'auto_terminated';
  } | null>(null);

  const antiCheatLockRef = useRef(false);
  const isPublicQuiz = currentActiveQuiz?.isPublic ?? true;

  // Initialize timers when quiz starts
  useEffect(() => {
    if (!currentActiveQuiz) return;

    setOverallSecondsLeft(currentActiveQuiz.overallTime * 60);
    setQuestionSecondsLeft(currentActiveQuiz.questionTime);
    setCurrentQIndex(0);
    setUserAnswers({});
    setCheatingWarningsCount(0);
    setCompletedResult(null);
  }, [currentActiveQuiz]);

  // Overall Timer Countdown
  useEffect(() => {
    if (!currentActiveQuiz || overallSecondsLeft <= 0 || completedResult) return;

    const timer = setInterval(() => {
      setOverallSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentActiveQuiz, overallSecondsLeft, completedResult]);

  // Question Timer Countdown
  useEffect(() => {
    if (!currentActiveQuiz || questionSecondsLeft <= 0 || completedResult) return;

    const qTimer = setInterval(() => {
      setQuestionSecondsLeft((prev) => {
        if (prev <= 1) {
          // Auto advance question on question timer expiry
          if (currentQIndex < currentActiveQuiz.questions.length - 1) {
            setCurrentQIndex((idx) => idx + 1);
            return currentActiveQuiz.questionTime;
          } else {
            clearInterval(qTimer);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(qTimer);
  }, [currentActiveQuiz, currentQIndex, questionSecondsLeft, completedResult]);

  // Reset question timer on question change
  useEffect(() => {
    if (currentActiveQuiz && !completedResult) {
      setQuestionSecondsLeft(currentActiveQuiz.questionTime);
    }
  }, [currentQIndex, currentActiveQuiz, completedResult]);

  // Anti-Cheating Guard Setup (Window Blur & Visibility Change)
  useEffect(() => {
    if (!currentActiveQuiz || isPublicQuiz || completedResult) return;

    const handleViolation = () => {
      if (antiCheatLockRef.current) return;
      antiCheatLockRef.current = true;

      setCheatingWarningsCount((prev) => {
        const nextCount = prev + 1;

        if (nextCount === 1) {
          alert(
            'WARNING (1/2): Tab or Window switching is strictly prohibited during official examinations.\n\nIf you leave the exam window one more time, your exam will be terminated!'
          );
        } else if (nextCount >= 2) {
          alert(
            'SECURITY VIOLATION DETECTED!\n\nYou have switched or minimized the exam window multiple times.\n\nYour exam is AUTO-TERMINATED with 0 score.'
          );
          terminateCheating();
        }
        return nextCount;
      });

      setTimeout(() => {
        antiCheatLockRef.current = false;
      }, 1000);
    };

    const onBlur = () => handleViolation();
    const onVisibilityChange = () => {
      if (document.hidden) handleViolation();
    };

    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [currentActiveQuiz, isPublicQuiz, completedResult]);

  if (!currentActiveQuiz) return null;

  if (!currentActiveQuiz.questions || currentActiveQuiz.questions.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-full w-fit mx-auto">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">No Questions Available</h2>
        <p className="text-stone-500 text-sm">
          This quiz currently does not contain any questions. Please select another quiz or check back later.
        </p>
        <button
          onClick={() => finishQuiz(currentUser.role === 'student' ? '/student/practice' : '/')}
          className="btn-sage inline-flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Practice
        </button>
      </div>
    );
  }

  const currentQuestion = currentActiveQuiz.questions[currentQIndex];
  if (!currentQuestion) return null;

  const handleTimeExpired = () => {
    alert('Time limit expired! Submitting your examination answers now.');
    handleSubmitQuiz();
  };

  const terminateCheating = () => {
    const attempt: Attempt = {
      quizId: currentActiveQuiz.id,
      studentRoll: currentUser.rollNo || 'GUEST',
      studentName: currentUser.name,
      score: 0,
      total: currentActiveQuiz.questions.length,
      status: 'auto_terminated',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' (Auto-Terminated)',
      answers: userAnswers,
    };
    submitAttempt(attempt);

    setCompletedResult({
      score: 0,
      total: currentActiveQuiz.questions.length,
      percentage: 0,
      status: 'auto_terminated',
    });
  };

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleExitExam = () => {
    const confirmExit = window.confirm('Are you sure you want to exit this examination? Progress will be lost if not submitted.');
    if (confirmExit) {
      finishQuiz('/student/practice');
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    currentActiveQuiz.questions.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.answer.trim().toLowerCase();
      if (userAns === correctAns) score++;
    });

    const attempt: Attempt = {
      quizId: currentActiveQuiz.id,
      studentRoll: currentUser.rollNo || 'GUEST',
      studentName: currentUser.name,
      score,
      total: currentActiveQuiz.questions.length,
      status: 'submitted',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      answers: userAnswers,
    };

    // Save to Quiz History
    submitAttempt(attempt);

    // Show Result Pop-up
    setCompletedResult({
      score,
      total: currentActiveQuiz.questions.length,
      percentage: Math.round((score / currentActiveQuiz.questions.length) * 100),
      status: 'submitted',
    });
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setOverallSecondsLeft(currentActiveQuiz.overallTime * 60);
    setQuestionSecondsLeft(currentActiveQuiz.questionTime);
    setCheatingWarningsCount(0);
    setCompletedResult(null);
  };

  const formatMinSec = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
      {/* Quiz Completion Result Pop-up Modal */}
      {completedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 text-center">
            
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-700">
              <Award className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 text-xs font-bold">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Result Saved to History</span>
              </div>

              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                {completedResult.status === 'auto_terminated'
                  ? 'Exam Terminated'
                  : completedResult.percentage >= 50
                  ? 'Congratulations! Examination Passed'
                  : 'Quiz Complete - Needs Practice'}
              </h2>

              <p className="text-xs text-stone-500 dark:text-stone-400">
                {currentActiveQuiz.title} ({currentActiveQuiz.subject})
              </p>
            </div>

            {/* Score Stats Box */}
            <div className="p-6 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
              <div className="text-4xl font-black text-stone-900 dark:text-white">
                {completedResult.score} / {completedResult.total}
              </div>
              <div className="inline-block px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-sage-100 dark:bg-sage-900 text-sage-800 dark:text-sage-200">
                Percentage Score: {completedResult.percentage}%
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-stone-200 dark:border-stone-700">
                <div>
                  <span className="text-stone-400 block font-medium">Correct Answers</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{completedResult.score}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Incorrect</span>
                  <span className="font-bold text-red-500 text-sm">{completedResult.total - completedResult.score}</span>
                </div>
              </div>
            </div>

            {/* Interactive Choice Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setReviewQuizId(currentActiveQuiz.id);
                }}
                className="w-full btn-outline-sage py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-sage-600" />
                <span>Review Correct Answers</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRetakeQuiz}
                  className="btn-sage py-3 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={() => {
                    finishQuiz('/student/practice');
                  }}
                  className="bg-stone-800 hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-600 text-white py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Layers className="w-4 h-4" />
                  <span>Other Quizzes</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Anti-Cheating Warning Banner */}
      {!isPublicQuiz && (
        <div className="p-4 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-700 dark:text-red-300 text-xs font-semibold">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong>Anti-Cheating Guard Active:</strong> Tab or window switching will trigger a violation warning. 2 violations will auto-terminate your exam with 0 score!
          </div>
        </div>
      )}

      {/* Timers Sticky Header */}
      <div className="glass-card bg-stone-900 text-white p-4 sticky top-4 z-30 shadow-lg border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExitExam}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Exit Examination"
          >
            <XCircle className="w-5 h-5 text-red-400" />
          </button>
          <div>
            <h3 className="font-bold text-sage-300 text-base">{currentActiveQuiz.title}</h3>
            <p className="text-xs text-stone-400">{currentActiveQuiz.subject} • {currentActiveQuiz.year}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Overall Timer</span>
            <span className="font-mono text-lg font-bold text-emerald-400">
              {formatMinSec(overallSecondsLeft)}
            </span>
          </div>

          <div className="text-right border-l border-stone-700 pl-6">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Question Timer</span>
            <span className="font-mono text-lg font-bold text-amber-400">
              {formatMinSec(questionSecondsLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <span className="badge-sage font-bold">
            Question {currentQIndex + 1} of {currentActiveQuiz.questions.length}
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-md">
            {currentQuestion.type === 'mcq' ? 'Multiple Choice' : currentQuestion.type === 'tf' ? 'True / False' : 'Fill In Blank'}
          </span>
        </div>

        <h2 className="text-lg md:text-xl font-bold text-stone-900 dark:text-white leading-snug">
          {currentQuestion.text}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3 pt-2">
          {currentQuestion.type === 'mcq' && currentQuestion.choices && currentQuestion.choices.length > 0 && (
            currentQuestion.choices.map((choice, idx) => {
              const isSelected = userAnswers[currentQuestion.id] === choice;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(choice)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-sage-100 border-sage-600 text-sage-900 dark:bg-sage-900/60 dark:border-sage-500 dark:text-sage-100 font-bold shadow-sm'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{choice}</span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-sage-600 dark:text-sage-400" />}
                </button>
              );
            })
          )}

          {currentQuestion.type === 'mcq' && (!currentQuestion.choices || currentQuestion.choices.length === 0) && (
            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                Type your answer below:
              </label>
              <input
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sage-500 focus:outline-none"
              />
            </div>
          )}

          {currentQuestion.type === 'tf' && (
            <div className="grid grid-cols-2 gap-4">
              {(currentQuestion.choices && currentQuestion.choices.length > 0 ? currentQuestion.choices : ['True', 'False']).map((choice) => {
                const isSelected = userAnswers[currentQuestion.id] === choice;
                return (
                  <button
                    key={choice}
                    onClick={() => handleAnswerSelect(choice)}
                    className={`p-4 rounded-xl text-center text-sm font-bold transition-all border ${
                      isSelected
                        ? 'bg-sage-600 text-white border-sage-700 shadow-md'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'blank' && (
            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                Type your answer below:
              </label>
              <input
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="Enter exact text answer..."
                className="w-full p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sage-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 disabled:opacity-40 flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentQIndex < currentActiveQuiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIndex((prev) => Math.min(currentActiveQuiz.questions.length - 1, prev + 1))}
              className="btn-sage text-xs py-2 px-5 font-bold flex items-center gap-1.5"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-6 rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <CheckCircle className="w-4 h-4" /> Submit Examination
            </button>
          )}
        </div>
      </div>

      <ReviewQuizModal />

    </div>
  );
};
