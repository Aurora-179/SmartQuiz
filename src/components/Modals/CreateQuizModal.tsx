'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { academicCurriculum } from '@/lib/initialData';
import { Question } from '@/types';
import { ArrowLeft, X, Plus, Trash2, Key, HelpCircle, CheckCircle, Calendar } from 'lucide-react';

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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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

  const handleTypeChange = (qIndex: number, newType: 'mcq' | 'tf' | 'blank') => {
    setQuestions((prev) => {
      const updated = [...prev];
      const target = { ...updated[qIndex], type: newType };

      if (newType === 'mcq') {
        target.choices = ['Option A', 'Option B', 'Option C', 'Option D'];
        target.answer = target.choices[0];
      } else if (newType === 'tf') {
        target.choices = ['True', 'False'];
        target.answer = 'True';
      } else if (newType === 'blank') {
        target.choices = [];
        target.answer = '';
      }

      updated[qIndex] = target;
      return updated;
    });
  };

  const handleChoiceChange = (qIndex: number, choiceIndex: number, newValue: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const target = { ...updated[qIndex] };
      const newChoices = [...(target.choices || [])];
      const oldValue = newChoices[choiceIndex];

      newChoices[choiceIndex] = newValue;
      target.choices = newChoices;

      // If the answer was pointing to the old choice value, update answer to newValue
      if (target.answer === oldValue || !newChoices.includes(target.answer)) {
        target.answer = newValue;
      }

      updated[qIndex] = target;
      return updated;
    });
  };

  const handleAnswerSelect = (qIndex: number, answerValue: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex] = { ...updated[qIndex], answer: answerValue };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a valid Quiz Title.');
      return;
    }

    if (!isPublic) {
      if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
        alert('Please generate or enter a valid 6-digit numeric access code for graded exams.');
        return;
      }
    }

    if (questions.length === 0) {
      alert('Quiz must have at least 1 question.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        alert(`Question #${i + 1} statement cannot be empty.`);
        return;
      }

      if (q.type === 'mcq') {
        if (!q.choices || q.choices.length < 2) {
          alert(`Question #${i + 1} must have multiple choices.`);
          return;
        }
        if (q.choices.some((c) => !c.trim())) {
          alert(`Question #${i + 1} has empty choice fields. Please fill in all options.`);
          return;
        }
        if (!q.answer.trim() || !q.choices.includes(q.answer)) {
          alert(`Question #${i + 1} correct answer must match one of the choices.`);
          return;
        }
      } else if (q.type === 'tf') {
        if (q.answer !== 'True' && q.answer !== 'False') {
          alert(`Question #${i + 1} correct answer must be 'True' or 'False'.`);
          return;
        }
      } else if (q.type === 'blank') {
        if (!q.answer.trim()) {
          alert(`Question #${i + 1} requires an expected correct answer string.`);
          return;
        }
      }
    }

    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      alert('Schedule End Date & Time must be after Start Date & Time.');
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
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      isPublic,
      teacherName: currentUser.name || 'Faculty Instructor',
      questions,
    });

    if (!created) {
      alert('Could not publish the quiz. Please check your teacher/admin session.');
      return;
    }
    alert(isPublic
      ? 'Public practice quiz created successfully!'
      : `Private exam created successfully. Share this access code with eligible students: ${created.code}`);
    onClose();
    setTitle('');
    setCode('');
    setStartTime('');
    setEndTime('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:py-8 bg-stone-900/60 backdrop-blur-sm">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-3xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 space-y-6 relative shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-6 border-b border-stone-100 dark:border-stone-800 bg-white px-6 pt-6 pb-3 dark:bg-stone-900">
          <div className="pr-8">
            <button
              type="button"
              onClick={onClose}
              className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-sage-700 transition-colors hover:text-sage-900 dark:text-sage-300 dark:hover:text-sage-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Teacher Dashboard
            </button>
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
              Create New Quiz / Examination
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Configure scope restriction, 6-digit access code, dual timers, and question bank.
            </p>
          </div>
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
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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

          {/* Exam Schedule Window */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Exam Schedule Availability Window (Optional)</span>
            </h4>
            <p className="text-[11px] text-amber-700/80 dark:text-amber-400">
              Set the exact date & time window when students are allowed to attempt this quiz. Leave blank for immediate open access.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  End / Expiry Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
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

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sage-600">Question #{qIdx + 1}</span>
                      <select
                        value={q.type}
                        onChange={(e) => handleTypeChange(qIdx, e.target.value as any)}
                        className="px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="tf">True / False</option>
                        <option value="blank">Fill in Blank</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove Question"
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

                  {/* MCQ Options and Correct Answer Editor */}
                  {q.type === 'mcq' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          Options & Correct Answer Selection:
                        </label>
                        <span className="text-[10px] text-sage-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Select radio button for correct answer
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(q.choices || ['Option A', 'Option B', 'Option C', 'Option D']).map((choice, cIdx) => {
                          const isCorrect = q.answer === choice;
                          return (
                            <div
                              key={cIdx}
                              className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                                isCorrect
                                  ? 'bg-sage-50 border-sage-500 dark:bg-sage-950/60 dark:border-sage-600 ring-1 ring-sage-500'
                                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`correct_q_${qIdx}`}
                                checked={isCorrect}
                                onChange={() => handleAnswerSelect(qIdx, choice)}
                                className="w-4 h-4 accent-sage-600 cursor-pointer"
                                title="Mark this option as correct answer"
                              />
                              <span className="text-xs font-bold text-stone-400 w-4">
                                {String.fromCharCode(65 + cIdx)}.
                              </span>
                              <input
                                type="text"
                                required
                                value={choice}
                                onChange={(e) => handleChoiceChange(qIdx, cIdx, e.target.value)}
                                placeholder={`Option ${String.fromCharCode(65 + cIdx)}`}
                                className="w-full bg-transparent text-xs font-medium focus:outline-none"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* True / False Editor */}
                  {q.type === 'tf' && (
                    <div className="pt-1 space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Select Correct Statement Answer:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['True', 'False'].map((tfOption) => {
                          const isSelected = q.answer === tfOption;
                          return (
                            <button
                              key={tfOption}
                              type="button"
                              onClick={() => handleAnswerSelect(qIdx, tfOption)}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                isSelected
                                  ? 'bg-sage-600 text-white border-sage-700 shadow-sm'
                                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                              }`}
                            >
                              {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                              <span>{tfOption}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Fill in Blank Editor */}
                  {q.type === 'blank' && (
                    <div className="pt-1 space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Expected Exact Answer Text:
                      </label>
                      <input
                        type="text"
                        required
                        value={q.answer}
                        onChange={(e) => handleAnswerSelect(qIdx, e.target.value)}
                        placeholder="e.g. SELECT or Tokyo"
                        className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  )}
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
