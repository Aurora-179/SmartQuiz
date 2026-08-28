'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { academicCurriculum } from '@/lib/initialData';
import { Question } from '@/types';
import { X, Plus, Trash2, Key, HelpCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateQuizModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser, addQuiz } = useApp();

  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [year, setYear] = useState('Third Year');
  const [major, setMajor] = useState('IST');
  const [subject, setSubject] = useState('Database Management System');
  const [code, setCode] = useState('');
  const [overallTime, setOverallTime] = useState(10);
  const [questionTime, setQuestionTime] = useState(30);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: 'mcq',
      text: 'What is the primary function of SQL?',
      choices: ['Querying Database', 'Compiling Code', 'Drawing Graphics', 'Routing Traffic'],
      answer: 'Querying Database',
    },
  ]);

  // Sync available subjects dropdown when year/major changes
  const availableSubjects = academicCurriculum[major]?.[year] || ['Core Major Subject'];

  useEffect(() => {
    if (availableSubjects.length > 0) {
      setSubject(availableSubjects[0]);
    }
  }, [year, major]);

  if (!isOpen) return null;

  const generateRandomCode = () => {
    const random6Digits = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(random6Digits);
  };

  const handleAddQuestion = () => {
    const newQ: Question = {
      id: Date.now(),
      type: 'mcq',
      text: '',
      choices: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length === 1) {
      alert('Quiz must have at least 1 question!');
      return;
    }
    setQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPublic && !code) {
      alert('Please generate or enter a 6-digit access code for graded exams.');
      return;
    }

    const created = await addQuiz({
      title: title.trim(),
      year: isPublic ? 'All' : year,
      major: isPublic ? 'Public Practice' : major,
      subject,
      code: isPublic ? null : code,
      overallTime,
      questionTime,
      isPublic,
      teacherName: currentUser.name || 'Faculty Instructor',
      questions,
    });

    alert('Quiz created successfully!');
    if (!created) {
      alert('Could not publish the quiz. Please check your teacher/admin session.');
      return;
    }
    onClose();
    setTitle('');
    setCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-3xl w-full p-6 space-y-6 relative my-8 shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Create New Quiz / Examination
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Configure scope restriction, 6-digit access code, dual timers, and question bank.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Quiz Basic Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DBMS Midterm Exam"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sage-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Quiz Access Category
              </label>
              <select
                value={isPublic ? 'public' : 'graded'}
                onChange={(e) => {
                  const pub = e.target.value === 'public';
                  setIsPublic(pub);
                  if (pub) setCode('');
                }}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-sage-700 dark:text-sage-300 focus:ring-2 focus:ring-sage-500 focus:outline-none"
              >
                <option value="graded">Graded Official Exam (6-Digit Access Code Required)</option>
                <option value="public">Public Practice Quiz (Free Open Access)</option>
              </select>
            </div>
          </div>

          {/* Scope Selection */}
          {!isPublic && (
            <div className="p-4 rounded-2xl bg-sage-50/50 dark:bg-sage-950/40 border border-sage-200 dark:border-sage-800 space-y-4">
              <h4 className="text-xs font-bold text-sage-800 dark:text-sage-300 uppercase tracking-wider">
                Strict Pre-Enrolled Scope Restriction
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Target Major</label>
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="IST">IST Department</option>
                    <option value="CE">CE Department</option>
                    <option value="ECE">ECE Department</option>
                    <option value="PrE">PrE Department</option>
                    <option value="AME">AME Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Target Academic Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                    <option value="Fifth Year">Fifth Year</option>
                    <option value="Sixth Year">Sixth Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Curriculum Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    {availableSubjects.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Access Code Input */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">6-Digit Secret Access Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. 849201"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-sm font-bold tracking-widest text-sage-600 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="btn-outline-sage text-xs py-2 px-3 self-end font-bold flex items-center gap-1"
                >
                  <Key className="w-3.5 h-3.5" /> Auto Generate
                </button>
              </div>
            </div>
          )}

          {/* Timers Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Overall Quiz Limit (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={180}
                value={overallTime}
                onChange={(e) => setOverallTime(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Per-Question Limit (Seconds)
              </label>
              <input
                type="number"
                min={5}
                max={300}
                value={questionTime}
                onChange={(e) => setQuestionTime(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Questions Builder */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
              <h4 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sage-600" />
                <span>Question Bank ({questions.length} Questions)</span>
              </h4>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="btn-sage text-xs py-1 px-3 flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
              {questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sage-600">Question #{qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    value={q.text}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[qIdx].text = e.target.value;
                      setQuestions(updated);
                    }}
                    placeholder="Enter question statement..."
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-0.5">Type</label>
                      <select
                        value={q.type}
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[qIdx].type = e.target.value as any;
                          setQuestions(updated);
                        }}
                        className="w-full px-2 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs"
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="tf">True / False</option>
                        <option value="blank">Fill in Blank</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-0.5">Correct Answer</label>
                      <input
                        type="text"
                        required
                        value={q.answer}
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[qIdx].answer = e.target.value;
                          setQuestions(updated);
                        }}
                        placeholder="Exact correct answer"
                        className="w-full px-2 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-sage w-full py-2.5 font-bold text-xs shadow-md"
          >
            Publish Quiz Examination
          </button>
        </form>

      </div>
    </div>
  );
};
