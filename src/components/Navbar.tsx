'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  MessageSquare,
  BookOpen,
  LayoutDashboard,
  Home as HomeIcon,
  Menu,
  X,
  Key,
  ChevronDown,
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/Modals/ChangePasswordModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    currentUser,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide standard header when user is taking an active proctored quiz
  if (pathname?.startsWith('/quiz')) {
    return null;
  }

  const isLoggedIn = currentUser.role !== 'guest';

  // Role-specific home brand target link
  const brandHomeLink =
    currentUser.role === 'teacher'
      ? '/teacher'
      : currentUser.role === 'student'
      ? '/student'
      : currentUser.role === 'admin'
      ? '/admin'
      : '/';

  // Role-specific community route link
  const communityLink =
    currentUser.role === 'teacher'
      ? '/teacher/community'
      : currentUser.role === 'student'
      ? '/student/community'
      : currentUser.role === 'admin'
      ? '/admin/community'
      : '/community';

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href={brandHomeLink} className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="p-1.5 sm:p-2 bg-sage-100 dark:bg-sage-900/60 rounded-xl text-sage-600 dark:text-sage-300 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 dark:text-white">
              Smart Quiz <span className="text-sage-600 dark:text-sage-400">System</span>
            </span>
          </Link>

          {/* Desktop Navigation Links — Customized per Role */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
              
              {/* Show Home & Practice Catalog ONLY for Students */}
              {currentUser.role === 'student' && (
                <>
                  <Link
                    href="/"
                    className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                      pathname === '/'
                        ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <HomeIcon className="w-4 h-4 text-sage-600" />
                    Home
                  </Link>

                  <Link
                    href="/practice"
                    className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                      pathname === '/practice'
                        ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-sage-600" />
                    Practice Catalog
                  </Link>
                </>
              )}

              {/* Role-scoped Community Hub Link */}
              <Link
                href={communityLink}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  pathname === communityLink || pathname === '/community'
                    ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-sage-600" />
                Community Hub
              </Link>

              {/* Role Dashboard Link */}
              {currentUser.role === 'teacher' && (
                <Link
                  href="/teacher"
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    pathname === '/teacher'
                      ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sage-600" />
                  Teacher Dashboard
                </Link>
              )}

              {currentUser.role === 'student' && (
                <Link
                  href="/student"
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    pathname === '/student'
                      ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sage-600" />
                  Student Dashboard
                </Link>
              )}

              {currentUser.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    pathname === '/admin'
                      ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 dark:text-sage-300 font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sage-600" />
                  Admin Dashboard
                </Link>
              )}
            </div>
          )}

          {/* Right Action Controls: Theme Toggle & User Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Logged-In User Profile Dropdown Pill */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-sage-500 dark:hover:border-sage-500 transition-all text-xs focus:outline-none"
                >
                  <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sage-600" />
                  <span className="font-bold text-stone-800 dark:text-stone-200 text-xs truncate max-w-[100px] sm:max-w-none">
                    {currentUser.name}
                  </span>
                  <span className="hidden sm:inline-block bg-sage-600 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                    {currentUser.role}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl rounded-2xl p-2 z-50 animate-fade-in space-y-1">
                    <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                      <p className="font-bold text-xs text-stone-900 dark:text-white truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-stone-400 capitalize">
                        {currentUser.role} Account {currentUser.dept ? `• ${currentUser.dept}` : ''}
                      </p>
                    </div>

                    {(currentUser.role === 'student' || currentUser.role === 'teacher') && (
                      <button
                        onClick={() => {
                          setChangePassOpen(true);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Key className="w-4 h-4 text-sage-600" />
                        <span>Change Password</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Trigger (Only if logged in) */}
            {isLoggedIn && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Logged in users only) */}
      {isLoggedIn && mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-2 pb-4 space-y-1 text-sm font-medium animate-fade-in">
          {currentUser.role === 'student' && (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                  pathname === '/' ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
                }`}
              >
                <HomeIcon className="w-4 h-4 text-sage-600" />
                Home
              </Link>
              <Link
                href="/practice"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                  pathname === '/practice' ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-sage-600" />
                Practice Catalog
              </Link>
            </>
          )}

          <Link
            href={communityLink}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
              pathname === communityLink ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-sage-600" />
            Community Hub
          </Link>

          {currentUser.role === 'teacher' && (
            <Link
              href="/teacher"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                pathname === '/teacher' ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-sage-600" />
              Teacher Dashboard
            </Link>
          )}

          {currentUser.role === 'student' && (
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                pathname === '/student' ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-sage-600" />
              Student Dashboard
            </Link>
          )}

          {currentUser.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                pathname === '/admin' ? 'bg-sage-50 text-sage-700 dark:bg-sage-950 font-bold' : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-sage-600" />
              Admin Dashboard
            </Link>
          )}
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal isOpen={changePassOpen} onClose={() => setChangePassOpen(false)} />

    </nav>
  );
};
