'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, Printer, ShieldCheck, GraduationCap } from 'lucide-react';

export const CredentialSlipModal: React.FC = () => {
  const { credentialSlipStudent, setCredentialSlipStudent } = useApp();

  if (!credentialSlipStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="glass-card bg-white dark:bg-stone-900 max-w-md w-full p-6 space-y-6 relative shadow-2xl border-2 border-emerald-500">
        
        <button
          onClick={() => setCredentialSlipStudent(null)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 dark:hover:text-white no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Slip Branding */}
        <div className="text-center border-b border-stone-200 dark:border-stone-800 pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-extrabold text-lg">
            <GraduationCap className="w-6 h-6" />
            <span>Smart Quiz System</span>
          </div>
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-stone-500">
            Official Student Credential & Access Slip
          </h3>
        </div>

        {/* Credentials Details */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3 text-xs">
          <div className="flex justify-between border-b border-stone-200 dark:border-stone-700/60 pb-2">
            <span className="text-stone-500">Roll Number:</span>
            <span className="font-mono font-bold text-stone-900 dark:text-white">{credentialSlipStudent.rollNo}</span>
          </div>

          <div className="flex justify-between border-b border-stone-200 dark:border-stone-700/60 pb-2">
            <span className="text-stone-500">Student Name:</span>
            <span className="font-bold text-stone-900 dark:text-white">{credentialSlipStudent.name}</span>
          </div>

          <div className="flex justify-between border-b border-stone-200 dark:border-stone-700/60 pb-2">
            <span className="text-stone-500">Account Email:</span>
            <span className="font-mono font-bold text-stone-900 dark:text-white">{credentialSlipStudent.email}</span>
          </div>

          <div className="flex justify-between border-b border-stone-200 dark:border-stone-700/60 pb-2">
            <span className="text-stone-500">Academic Scope:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {credentialSlipStudent.year} ({credentialSlipStudent.major})
            </span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-stone-500">Portal Password:</span>
            <span className="font-mono font-bold text-red-600 dark:text-red-400">{credentialSlipStudent.pass}</span>
          </div>
        </div>

        <p className="text-[10px] text-stone-400 text-center leading-relaxed">
          Please keep this official slip safe. Use your Roll Number, Email, and Password for Student Portal sign-in.
        </p>

        <div className="flex justify-end gap-2 pt-2 no-print">
          <button
            onClick={() => setCredentialSlipStudent(null)}
            className="btn-outline-sage text-xs py-2 px-4"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="btn-sage text-xs py-2 px-5 font-bold flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" /> Print Slip
          </button>
        </div>

      </div>
    </div>
  );
};
