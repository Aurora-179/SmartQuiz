'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, UserPlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStudentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addStudent, setCredentialSlipStudent } = useApp();

  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('Third Year');
  const [major, setMajor] = useState('IST');
  const [pass, setPass] = useState('std123');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const created = await addStudent({
      rollNo: rollNo.trim(),
      name: name.trim(),
      email: email.trim(),
      year,
      major,
      pass: pass.trim(),
    });

    if (!created) {
      alert('Could not create the student account. Please check your admin session.');
      return;
    }
    alert(`Student account for "${created.name}" created successfully!`);
    setCredentialSlipStudent(created);
    onClose();
    setRollNo('');
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
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Create Student Account
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Assign Roll No, pre-enrolled year/major scope, and access credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Roll Number</label>
            <input
              type="text"
              required
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="e.g. 3IST-105"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Student Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Michael Chen"
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
              placeholder="e.g. michael@mail.com"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Major Scope</label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-semibold"
              >
                <option value="IST">IST</option>
                <option value="CE">CE</option>
                <option value="ECE">ECE</option>
                <option value="PrE">PrE</option>
                <option value="AME">AME</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Academic Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-semibold"
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Fourth Year">Fourth Year</option>
                <option value="Fifth Year">Fifth Year</option>
                <option value="Sixth Year">Sixth Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Initial Password</label>
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
            Create Student Account
          </button>
        </form>

      </div>
    </div>
  );
};
