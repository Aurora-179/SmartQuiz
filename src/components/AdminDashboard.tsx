'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StudentAccount } from '@/types';
import {
  UserPlus,
  UserCheck,
  ShieldCheck,
  Printer,
  Ban,
  CheckCircle,
  FileText,
  Building,
  GraduationCap,
} from 'lucide-react';
import { AddStudentModal } from '@/components/Modals/AddStudentModal';
import { AddTeacherModal } from '@/components/Modals/AddTeacherModal';
import { CredentialSlipModal } from '@/components/Modals/CredentialSlipModal';

export const AdminDashboard: React.FC = () => {
  const { students, teachers, toggleStudentStatus, setCredentialSlipStudent } = useApp();

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);

  return (
    <div className="space-y-8 py-6">
      
      {/* Admin Header */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-sage">Admin Console</span>
            <span className="text-xs font-bold text-sage-600 dark:text-sage-400">System Control</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white">
            Admin Control Panel
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Manage student & teacher account records, assign department credentials, and dispatch printable registration slips.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAddTeacherOpen(true)}
            className="btn-outline-sage text-xs py-2 px-3 flex items-center gap-1.5 font-bold"
          >
            <Building className="w-4 h-4" /> Register Teacher
          </button>
          <button
            onClick={() => setAddStudentOpen(true)}
            className="btn-sage text-xs py-2 px-4 flex items-center gap-1.5 font-bold shadow-md"
          >
            <UserPlus className="w-4 h-4" /> Register Student
          </button>
        </div>
      </div>

      {/* Faculty Teachers Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 md:p-6 bg-stone-50/80 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
              <Building className="w-5 h-5 text-sage-600" />
              <span>Registered Faculty Teachers</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Assigned department faculty teachers authorized to host course examinations.
            </p>
          </div>
          <span className="badge-sage font-mono font-bold">
            {teachers.length} Teachers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 uppercase font-extrabold tracking-wider border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Teacher Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Assigned Department</th>
                <th className="py-3.5 px-4">Assigned Password</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {teachers.map((t) => (
                <tr key={t.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-900 dark:text-white">{t.name}</td>
                  <td className="py-4 px-4 font-mono">{t.email}</td>
                  <td className="py-4 px-4 font-semibold text-sage-700 dark:text-sage-300">{t.dept}</td>
                  <td className="py-4 px-4 font-mono text-stone-400">••••••••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Directory Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 md:p-6 bg-stone-50/80 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sage-600" />
              <span>Registered Student Accounts</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Authorized students with pre-enrolled scope & credentials.
            </p>
          </div>
          <span className="badge-sage font-mono font-bold">
            {students.length} Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 uppercase font-extrabold tracking-wider border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Academic Scope (Year - Major)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {students.map((std) => (
                <tr key={std.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-sage-700 dark:text-sage-300">{std.rollNo}</td>
                  <td className="py-4 px-4 font-bold text-stone-900 dark:text-white">{std.name}</td>
                  <td className="py-4 px-4 font-mono">{std.email}</td>
                  <td className="py-4 px-4 font-semibold">{std.year} ({std.major})</td>
                  <td className="py-4 px-4">
                    {std.status === 'approved' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold text-[10px] inline-flex items-center gap-1">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => setCredentialSlipStudent(std)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 font-bold inline-flex items-center gap-1 text-xs"
                      title="Print Credential Slip"
                    >
                      <Printer className="w-3.5 h-3.5" /> Slip
                    </button>
                    <button
                      onClick={() => toggleStudentStatus(std.id)}
                      className={`p-1.5 rounded-lg font-bold inline-flex items-center gap-1 text-xs ${
                        std.status === 'approved'
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {std.status === 'approved' ? 'Suspend' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddStudentModal isOpen={addStudentOpen} onClose={() => setAddStudentOpen(false)} />
      <AddTeacherModal isOpen={addTeacherOpen} onClose={() => setAddTeacherOpen(false)} />
      <CredentialSlipModal />

    </div>
  );
};
