'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Attempt, ChatMessage, Notification, Quiz, Role, StudentAccount, TeacherAccount, User } from '@/types';
import {
  changePasswordApi, createQuiz, createStudentApi, createTeacherApi, deleteQuizApi,
  fetchDashboardData, getCurrentUser, loginUser, logoutUser, pinChatMessageApi,
  sendChatMessageApi, submitQuizAttempt, toggleStudentStatusApi,
} from '@/lib/api';

interface AppContextType {
  isMounted: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeView: 'home' | 'community' | 'dashboard' | 'quiz';
  setActiveView: (view: 'home' | 'community' | 'dashboard' | 'quiz') => void;
  currentUser: User;
  login: (role: Role, credentials: { rollNo?: string; email?: string; pass?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => Promise<Quiz | null>;
  deleteQuiz: (id: number) => Promise<void>;
  students: StudentAccount[];
  addStudent: (student: Omit<StudentAccount, 'id' | 'status'>) => Promise<StudentAccount | null>;
  toggleStudentStatus: (id: number) => Promise<void>;
  teachers: TeacherAccount[];
  addTeacher: (teacher: Omit<TeacherAccount, 'id'>) => Promise<TeacherAccount | null>;
  attempts: Attempt[];
  submitAttempt: (attempt: Attempt) => Promise<boolean>;
  notifications: Notification[];
  chatMessages: ChatMessage[];
  sendChatMessage: (message: string, isAnnouncement?: boolean) => Promise<boolean>;
  pinChatMessage: (id: number) => Promise<void>;
  currentActiveQuiz: Quiz | null;
  startQuiz: (quiz: Quiz) => void;
  finishQuiz: (targetRoute?: string) => void;
  reviewQuizId: number | null;
  setReviewQuizId: (id: number | null) => void;
  credentialSlipStudent: StudentAccount | null;
  setCredentialSlipStudent: (student: StudentAccount | null) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  changeUserPassword: (newPass: string) => Promise<boolean>;
}

const guestUser: User = { id: null, role: 'guest', name: 'Guest User', email: null };
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUser] = useState<User>(guestUser);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [students, setStudents] = useState<StudentAccount[]>([]);
  const [teachers, setTeachers] = useState<TeacherAccount[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentActiveQuiz, setCurrentActiveQuiz] = useState<Quiz | null>(null);
  const [reviewQuizId, setReviewQuizId] = useState<number | null>(null);
  const [credentialSlipStudent, setCredentialSlipStudent] = useState<StudentAccount | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hydrate = async (knownUser?: User | null) => {
    try {
      const user = knownUser === undefined ? await getCurrentUser() : knownUser;
      const dashboard = await fetchDashboardData(user);
      setQuizzes(dashboard.quizzes);
      setStudents(dashboard.students);
      setTeachers(dashboard.teachers);
      setAttempts(dashboard.attempts);
      setChatMessages(dashboard.chatMessages);
      setCurrentUser(user || guestUser);
    } catch {
      setCurrentUser(guestUser);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = (localStorage.getItem('sq_theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    hydrate();
  }, []);

  const activeView = useMemo<'home' | 'community' | 'dashboard' | 'quiz'>(() => {
    if (pathname?.startsWith('/quiz')) return 'quiz';
    if (pathname?.includes('community')) return 'community';
    if (pathname === '/student' || pathname === '/teacher' || pathname === '/admin') return 'dashboard';
    return 'home';
  }, [pathname]);

  const setActiveView = (view: 'home' | 'community' | 'dashboard' | 'quiz') => {
    if (view === 'home') router.push('/');
    else if (view === 'community') router.push('/community');
    else if (view === 'dashboard') {
      if (currentUser.role === 'student') router.push('/student');
      else if (currentUser.role === 'teacher') router.push('/teacher');
      else if (currentUser.role === 'admin') router.push('/admin');
      else setLoginModalOpen(true);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next); localStorage.setItem('sq_theme', next); document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const login = async (role: Role, credentials: { rollNo?: string; email?: string; pass?: string }) => {
    try {
      const user = await loginUser(role, credentials);
      await hydrate(user);
      setLoginModalOpen(false);
      if (user.role === 'student') router.push('/student');
      else if (user.role === 'teacher') router.push('/teacher');
      else if (user.role === 'admin') router.push('/admin');
      return true;
    } catch { return false; }
  };

  const logout = async () => { try { await logoutUser(); } finally { setCurrentUser(guestUser); router.push('/'); } };
  const addQuiz = async (quiz: Omit<Quiz, 'id'>) => { try { const created = await createQuiz(quiz); setQuizzes(prev => [created, ...prev]); return created; } catch { return null; } };
  const deleteQuiz = async (id: number) => { await deleteQuizApi(id); setQuizzes(prev => prev.filter(q => q.id !== id)); };
  const addStudent = async (student: Omit<StudentAccount, 'id' | 'status'>) => { try { const created = await createStudentApi(student); setStudents(prev => [...prev, created]); return created; } catch { return null; } };
  const addTeacher = async (teacher: Omit<TeacherAccount, 'id'>) => { try { const created = await createTeacherApi(teacher); setTeachers(prev => [...prev, created]); return created; } catch { return null; } };
  const toggleStudentStatus = async (id: number) => {
    const student = students.find(item => item.id === id); if (!student) return;
    const status = student.status === 'approved' ? 'suspended' : 'approved';
    await toggleStudentStatusApi(id, status); setStudents(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };
  const submitAttempt = async (attempt: Attempt) => { try { await submitQuizAttempt(attempt); setAttempts(prev => [attempt, ...prev.filter(item => !(item.quizId === attempt.quizId && item.studentRoll === attempt.studentRoll))]); return true; } catch { return false; } };
  const sendChatMessage = async (message: string, isAnnouncement = false) => {
    try { const created = await sendChatMessageApi(currentUser.name, currentUser.role, message, isAnnouncement && currentUser.role === 'admin'); setChatMessages(prev => [...prev, created]); return true; } catch { return false; }
  };
  const pinChatMessage = async (id: number) => { await pinChatMessageApi(id); setChatMessages(prev => prev.map(item => ({ ...item, isPinned: item.id === id ? !item.isPinned : false }))); };
  const changeUserPassword = async (newPass: string) => { try { await changePasswordApi(newPass); return true; } catch { return false; } };
  const startQuiz = (quiz: Quiz) => { setCurrentActiveQuiz(quiz); router.push(`/quiz/${quiz.id}`); };
  const finishQuiz = (targetRoute?: string) => { setCurrentActiveQuiz(null); router.push(targetRoute || (currentUser.role === 'student' ? '/student/practice' : '/')); };

  return <AppContext.Provider value={{ isMounted, isLoading, theme, toggleTheme, activeView, setActiveView, currentUser, login, logout, quizzes, addQuiz, deleteQuiz, students, addStudent, toggleStudentStatus, teachers, addTeacher, attempts, submitAttempt, notifications: [], chatMessages, sendChatMessage, pinChatMessage, currentActiveQuiz, startQuiz, finishQuiz, reviewQuizId, setReviewQuizId, credentialSlipStudent, setCredentialSlipStudent, loginModalOpen, setLoginModalOpen, changeUserPassword }}>{children}</AppContext.Provider>;
};

export const useApp = () => { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used within AppProvider'); return context; };
