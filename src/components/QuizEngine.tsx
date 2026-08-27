'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Attempt } from '@/types';
import {
  AlertTriangle,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShieldAlert,
  XCircle,
} from 'lucide-react';

export const QuizEngine: React.FC = () => {
  const { currentActiveQuiz, currentUser, submitAttempt, finishQuiz } = useApp();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  const [overallSecondsLeft, setOverallSecondsLeft] = useState(0);
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(0);
  const [cheatingWarningsCount, setCheatingWarningsCount] = useState(0);

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
  }, [currentActiveQuiz]);

  // Overall Timer Countdown
  useEffect(() => {
    if (!currentActiveQuiz || overallSecondsLeft <= 0) return;

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
  }, [currentActiveQuiz, overallSecondsLeft]);

  // Question Timer Countdown
  useEffect(() => {
    if (!currentActiveQuiz || questionSecondsLeft <= 0) return;

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
  }, [currentActiveQuiz, currentQIndex, questionSecondsLeft]);

  // Reset question timer on question change
  useEffect(() => {
    if (currentActiveQuiz) {
      setQuestionSecondsLeft(currentActiveQuiz.questionTime);
    }
  }, [currentQIndex, currentActiveQuiz]);

  // Anti-Cheating Guard Setup (Window Blur & Visibility Change)
  useEffect(() => {
    if (!currentActiveQuiz || isPublicQuiz) return;

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
  }, [currentActiveQuiz, isPublicQuiz]);

  if (!currentActiveQuiz) return null;

  const currentQuestion = currentActiveQuiz.questions[currentQIndex];

  const handleTimeExpired = () => {
    alert('Time limit expired! Submitting your examination answers now.');
    handleSubmitQuiz();
  };

  const terminateCheating = () => {
    if (currentUser.rollNo) {
      const attempt: Attempt = {
        quizId: currentActiveQuiz.id,
        studentRoll: currentUser.rollNo,
        studentName: currentUser.name,
        score: 0,
        total: currentActiveQuiz.questions.length,
        status: 'auto_terminated',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' (Auto-Terminated)',
        answers: userAnswers,
      };
      submitAttempt(attempt);
    }
    finishQuiz();
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
      finishQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    currentActiveQuiz.questions.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.answer.trim().toLowerCase();
      if (userAns === correctAns) score++;
    });

    if (currentUser.rollNo || currentUser.role === 'student') {
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
      submitAttempt(attempt);
    }

    alert(`Examination Complete!\n\nYour Score: ${score} / ${currentActiveQuiz.questions.length}`);
    finishQuiz();
  };

  const formatMinSec = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
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
          {currentQuestion.type === 'mcq' && currentQuestion.choices && (
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

          {currentQuestion.type === 'tf' && (
            <div className="grid grid-cols-2 gap-4">
              {['True', 'False'].map((choice) => {
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

    </div>
  );
};
