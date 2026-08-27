'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Role } from '@/types';
import { Lock, X, GraduationCap, Building, ShieldAlert } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, login } = useApp();

  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!loginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Ensure selectedRole is only student or teacher in modal
    const targetRole = selectedRole === 'admin' ? 'student' : selectedRole;

    const success = login(targetRole, {
      rollNo: rollNo.trim(),
      email: email.trim(),
      pass: password.trim(),
    });

    if (success) {
      setLoginModalOpen(false);
      setRollNo('');
      setEmail('');
      setPassword('');
    } else {
      setErrorMessage('Invalid account credentials or unauthorized status!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-md w-full p-6 space-y-6 relative shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="p-3 bg-sage-100 dark:bg-sage-900/60 text-sage-600 dark:text-sage-300 rounded-2xl w-fit mx-auto border border-sage-300 dark:border-sage-700/50">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Sign In to Portal
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Select your role and enter credentials to access your portal
          </p>
        </div>

        {/* Role Selector Tabs — Student and Teacher only */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setSelectedRole('student'); setErrorMessage(''); }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'student'
                ? 'bg-white dark:bg-stone-900 text-sage-700 dark:text-sage-300 shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student Portal
          </button>

          <button
            type="button"
            onClick={() => { setSelectedRole('teacher'); setErrorMessage(''); }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'teacher'
                ? 'bg-white dark:bg-stone-900 text-sage-700 dark:text-sage-300 shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Building className="w-4 h-4" /> Teacher Portal
          </button>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          
          {selectedRole === 'student' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-sage-700 dark:text-sage-400 mb-1">
                  1. Roll Number
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. 3IST-101"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-sage-700 dark:text-sage-400 mb-1">
                  2. Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@mail.com"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-sage-700 dark:text-sage-400 mb-1">
                  3. Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Teacher Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. teacher@smartquiz.com"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn-sage w-full py-2.5 font-bold text-xs shadow-md mt-4"
          >
            Sign In to {selectedRole === 'student' ? 'Student' : 'Teacher'} Portal
          </button>
        </form>

        {/* Dedicated Admin Portal Link at Modal Footer */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
          <Link
            href="/admin/login"
            onClick={() => setLoginModalOpen(false)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>System Administrator? Access Admin Portal →</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
