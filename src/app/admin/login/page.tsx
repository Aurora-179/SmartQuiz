'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, KeyRound, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const { currentUser, login } = useApp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser.role === 'admin') {
      router.push('/admin');
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login('admin', {
        email: email.trim(),
        pass: password.trim(),
      });

      if (success) {
        router.push('/admin');
      } else {
        setErrorMessage('Invalid administrative credentials or unauthorized access privilege.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-8 sm:p-10 shadow-2xl border border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 relative overflow-hidden rounded-3xl">
        
        {/* Subtle Background Badge Glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-sage-500/10 dark:bg-sage-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-3 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Admin Control Panel Login
          </h1>

          <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed max-w-xs mx-auto">
            Authorized administrative personnel login for teacher & student account creation, management, and system auditing.
          </p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5 relative z-10">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sage-600" />
                <span>Admin Email Address</span>
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@smartquiz.com"
                className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sage-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-sage-600" />
                <span>Master Password</span>
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sage-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-sage w-full py-3 px-4 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isLoading ? 'Authenticating Admin...' : 'Authenticate & Enter Admin Panel'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
