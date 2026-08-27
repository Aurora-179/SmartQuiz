'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Building2,
  Mail,
  MapPin,
  PhoneCall,
  LogIn,
  Award,
  ArrowRight,
  Laptop,
} from 'lucide-react';

const DEPARTMENTS = [
  {
    code: 'IST',
    title: 'Information Science & Tech',
    desc: 'Software development, algorithms, web engineering & data science.',
    icon: Laptop,
    color: 'sage',
  },
  {
    code: 'CE',
    title: 'Computer Engineering',
    desc: 'Computer architecture, embedded systems, microprocessors & networking.',
    icon: Building2,
    color: 'indigo',
  },
  {
    code: 'ECE',
    title: 'Electronic Communication Eng.',
    desc: 'Signals, digital electronics, wireless communications & IoT systems.',
    icon: Sparkles,
    color: 'emerald',
  },
  {
    code: 'PrE',
    title: 'Process Engineering',
    desc: 'Industrial process control, automation, thermodynamics & chemical systems.',
    icon: Award,
    color: 'amber',
  },
  {
    code: 'AME',
    title: 'Aerospace & Mechanical Eng.',
    desc: 'Thermodynamics, mechanical design, fluid dynamics & robotics.',
    icon: GraduationCap,
    color: 'purple',
  },
];

export const PublicHome: React.FC = () => {
  const { currentUser, setLoginModalOpen } = useApp();
  const router = useRouter();

  const handlePracticeClick = () => {
    if (currentUser.role === 'guest') {
      setLoginModalOpen(true);
    } else {
      router.push('/practice');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-6">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl hero-gradient p-6 sm:p-10 md:p-14 border border-sage-200 dark:border-sage-800 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-sage-100 dark:bg-sage-900/80 text-sage-800 dark:text-sage-200 text-[11px] sm:text-xs font-bold border border-sage-300 dark:border-sage-700">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sage-600 dark:text-sage-300" />
            <span>Academic Examination & Learning Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white leading-tight">
            Smart Quiz <span className="text-sage-600 dark:text-sage-400">Management System</span>
          </h1>

          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed">
            A secure university platform for official proctored examinations, anti-cheating monitoring, course scope restriction, and open practice modules for technological engineering departments.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={handlePracticeClick}
              className="btn-sage flex items-center justify-center gap-2 text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 shadow-md font-bold"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Practice Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setLoginModalOpen(true)}
              className="btn-outline-sage flex items-center justify-center gap-2 text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>Portal Sign In</span>
            </button>
          </div>
        </div>

        {/* Hero Illustration Background */}
        <div className="hidden lg:block absolute right-8 bottom-4 opacity-15 dark:opacity-20 text-sage-700 pointer-events-none">
          <GraduationCap className="w-80 h-80 lg:w-96 lg:h-96" />
        </div>
      </section>

      {/* Specialization Departments Explorer */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto px-2">
          <span className="badge-sage">Academic Scope</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Specialized Major Departments
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
            Curriculum quizzes and exams are tailored to pre-enrolled major courses from 1st Year to 6th Year.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.code}
                className="glass-card p-5 sm:p-6 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-sage-100 dark:bg-sage-900/60 text-sage-800 dark:text-sage-200 border border-sage-300 dark:border-sage-700">
                      {dept.code}
                    </span>
                    <Icon className="w-5 h-5 text-sage-600 dark:text-sage-400" />
                  </div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-base">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {dept.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={handlePracticeClick}
                    className="text-xs font-bold text-sage-600 dark:text-sage-400 hover:underline flex items-center gap-1"
                  >
                    <span>Browse {dept.code} Modules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrated Professional Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 pt-10 sm:pt-12 pb-6 text-xs text-stone-500 dark:text-stone-400 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center gap-2 font-bold text-base text-stone-900 dark:text-white">
              <GraduationCap className="w-5 h-5 text-sage-600" />
              <span>Smart Quiz System</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Empowering technological education across Information Science, Computer Engineering, Electronics, Process, and Mechanical disciplines.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 dark:text-white text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-sage-600">Home Landing</Link>
              </li>
              <li>
                <button onClick={handlePracticeClick} className="hover:text-sage-600 text-left">Practice Catalog</button>
              </li>
              <li>
                <button onClick={handlePracticeClick} className="hover:text-sage-600 text-left">Campus Community Hub</button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 dark:text-white text-xs uppercase tracking-wider">Contact & Support</h4>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" /> Faculty of Information Science & Tech</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" /> support@smartquiz.edu.mm</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" /> +95 9 123 456 789</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-800 pt-6 text-center text-stone-400">
          © {new Date().getFullYear()} Smart Quiz System. All rights reserved.
        </div>
      </footer>

    </div>
  );
};
