'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Key } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { changeUserPassword } = useApp();

  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      alert('Passwords do not match!');
      return;
    }

    const success = await changeUserPassword(newPass.trim());
    if (success) {
      alert('Password changed successfully!');
      onClose();
      setNewPass('');
      setConfirmPass('');
    } else {
      alert('Could not update password for current account.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-sm w-full p-6 space-y-6 relative shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="p-3 bg-sage-100 dark:bg-sage-900/60 text-sage-600 rounded-2xl w-fit mx-auto">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Change Account Password
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Update your secret login password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="btn-sage w-full py-2.5 font-bold text-xs shadow-md mt-3"
          >
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
};
