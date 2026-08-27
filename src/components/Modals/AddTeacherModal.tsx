'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Building } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTeacherModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addTeacher } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('IST Department');
  const [pass, setPass] = useState('teacher123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = addTeacher({
      name: name.trim(),
      email: email.trim(),
      dept,
      pass: pass.trim(),
    });

    alert(`Faculty Teacher "${created.name}" registered successfully!`);
    onClose();
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-md w-full p-6 space-y-6 relative shadow-2xl border border-stone-200 dark:border-stone-800">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="p-3 bg-sage-100 dark:bg-sage-900/60 text-sage-600 rounded-2xl w-fit mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Register Faculty Teacher
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Authorize department faculty teacher accounts for hosting examinations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Teacher Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Prof. Daw Hla"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dawhla@smartquiz.com"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-semibold"
            >
              <option value="IST Department">IST Department</option>
              <option value="CE Department">CE Department</option>
              <option value="ECE Department">ECE Department</option>
              <option value="PrE Department">PrE Department</option>
              <option value="AME Department">AME Department</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Assigned Password</label>
            <input
              type="text"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
            />
          </div>

          <button
            type="submit"
            className="btn-sage w-full py-2.5 font-bold text-xs shadow-md mt-3"
          >
            Create Teacher Account
          </button>
        </form>

      </div>
    </div>
  );
};
