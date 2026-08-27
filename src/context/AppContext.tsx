'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  User,
  StudentAccount,
  TeacherAccount,
  Quiz,
  Attempt,
  Notification,
  ChatMessage,
  Role,
} from '@/types';
import {
  adminAccounts,
  initialTeachers,
  initialStudents,
  initialQuizzes,
  initialAttempts,
  initialNotifications,
  initialChatMessages,
} from '@/lib/initialData';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeView: 'home' | 'community' | 'dashboard' | 'quiz';
  setActiveView: (view: 'home' | 'community' | 'dashboard' | 'quiz') => void;
  currentUser: User;
  login: (role: Role, credentials: { rollNo?: string; email?: string; pass?: string }) => boolean;
  logout: () => void;
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => Quiz;
  deleteQuiz: (id: number) => void;
  students: StudentAccount[];
  addStudent: (student: Omit<StudentAccount, 'id' | 'status'>) => StudentAccount;
  toggleStudentStatus: (id: number) => void;
  teachers: TeacherAccount[];
  addTeacher: (teacher: Omit<TeacherAccount, 'id'>) => TeacherAccount;
  attempts: Attempt[];
  submitAttempt: (attempt: Attempt) => void;
  notifications: Notification[];
  chatMessages: ChatMessage[];
  sendChatMessage: (message: string, isAnnouncement?: boolean) => void;
  pinChatMessage: (id: number) => void;
  currentActiveQuiz: Quiz | null;
  startQuiz: (quiz: Quiz) => void;
  finishQuiz: () => void;
  reviewQuizId: number | null;
  setReviewQuizId: (id: number | null) => void;
  credentialSlipStudent: StudentAccount | null;
  setCredentialSlipStudent: (student: StudentAccount | null) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  changeUserPassword: (newPass: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUser] = useState<User>({
    id: null,
    role: 'guest',
    name: 'Guest User',
    email: null,
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [students, setStudents] = useState<StudentAccount[]>(initialStudents);
  const [teachers, setTeachers] = useState<TeacherAccount[]>(initialTeachers);
  const [attempts, setAttempts] = useState<Attempt[]>(initialAttempts);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  const [currentActiveQuiz, setCurrentActiveQuiz] = useState<Quiz | null>(null);
  const [reviewQuizId, setReviewQuizId] = useState<number | null>(null);
  const [credentialSlipStudent, setCredentialSlipStudent] = useState<StudentAccount | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Sync state with LocalStorage on client side
  useEffect(() => {
    const storedTheme = (localStorage.getItem('sq_theme') as 'light' | 'dark') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');

    const savedUser = localStorage.getItem('sq_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }

    const savedQuizzes = localStorage.getItem('sq_quizzes');
    if (savedQuizzes) setQuizzes(JSON.parse(savedQuizzes));

    const savedStudents = localStorage.getItem('sq_students');
    if (savedStudents) setStudents(JSON.parse(savedStudents));

    const savedTeachers = localStorage.getItem('sq_teachers');
    if (savedTeachers) setTeachers(JSON.parse(savedTeachers));

    const savedAttempts = localStorage.getItem('sq_attempts');
    if (savedAttempts) setAttempts(JSON.parse(savedAttempts));

    const savedChat = localStorage.getItem('sq_chat');
    if (savedChat) setChatMessages(JSON.parse(savedChat));

    const savedActiveQuiz = localStorage.getItem('sq_active_quiz');
    if (savedActiveQuiz) {
      try {
        setCurrentActiveQuiz(JSON.parse(savedActiveQuiz));
      } catch (e) {
        console.error('Failed to parse saved active quiz', e);
      }
    }
  }, []);

  // Compute activeView from current pathname
  const activeView: 'home' | 'community' | 'dashboard' | 'quiz' = React.useMemo(() => {
    if (!pathname) return 'home';
    if (pathname.startsWith('/quiz')) return 'quiz';
    if (pathname === '/community') return 'community';
    if (pathname === '/student' || pathname === '/teacher' || pathname === '/admin') return 'dashboard';
    return 'home';
  }, [pathname]);

  const setActiveView = (view: 'home' | 'community' | 'dashboard' | 'quiz') => {
    if (view === 'home') {
      router.push('/');
    } else if (view === 'community') {
      router.push('/community');
    } else if (view === 'dashboard') {
      if (currentUser.role === 'student') router.push('/student');
      else if (currentUser.role === 'teacher') router.push('/teacher');
      else if (currentUser.role === 'admin') router.push('/admin');
      else setLoginModalOpen(true);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('sq_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const login = (role: Role, { rollNo, email, pass }: { rollNo?: string; email?: string; pass?: string }) => {
    let loggedUser: User | null = null;

    if (role === 'student') {
      const found = students.find(s => s.rollNo === rollNo && s.email === email && s.pass === pass);
      if (found) {
        if (found.status !== 'approved') {
          alert('Your registration is pending Admin approval or suspended!');
          return false;
        }
        loggedUser = {
          id: found.id,
          role: 'student',
          name: found.name,
          email: found.email,
          year: found.year,
          major: found.major,
          rollNo: found.rollNo,
        };
      }
    } else if (role === 'teacher') {
      const found = teachers.find(t => t.email === email && t.pass === pass);
      if (found) {
        loggedUser = {
          id: found.id,
          role: 'teacher',
          name: found.name,
          email: found.email,
          dept: found.dept,
        };
      }
    } else if (role === 'admin') {
      const found = adminAccounts.find(a => a.email === email && a.pass === pass);
      if (found) {
        loggedUser = {
          id: 100,
          role: 'admin',
          name: found.name,
          email: found.email,
        };
      }
    }

    if (loggedUser) {
      setCurrentUser(loggedUser);
      localStorage.setItem('sq_user', JSON.stringify(loggedUser));
      setLoginModalOpen(false);

      if (loggedUser.role === 'student') router.push('/student');
      else if (loggedUser.role === 'teacher') router.push('/teacher');
      else if (loggedUser.role === 'admin') router.push('/admin');

      return true;
    }

    return false;
  };

  const logout = () => {
    const guestUser: User = {
      id: null,
      role: 'guest',
      name: 'Guest User',
      email: null,
    };
    setCurrentUser(guestUser);
    localStorage.removeItem('sq_user');
    router.push('/');
  };

  const changeUserPassword = (newPass: string) => {
    if (currentUser.role === 'student' && currentUser.id) {
      setStudents(prev => {
        const next = prev.map(s => s.id === currentUser.id ? { ...s, pass: newPass } : s);
        localStorage.setItem('sq_students', JSON.stringify(next));
        return next;
      });
      return true;
    }
    if (currentUser.role === 'teacher' && currentUser.id) {
      setTeachers(prev => {
        const next = prev.map(t => t.id === currentUser.id ? { ...t, pass: newPass } : t);
        localStorage.setItem('sq_teachers', JSON.stringify(next));
        return next;
      });
      return true;
    }
    return false;
  };

  const addQuiz = (quizData: Omit<Quiz, 'id'>) => {
    const newId = Date.now();
    const newQuiz: Quiz = { ...quizData, id: newId };
    setQuizzes(prev => {
      const next = [newQuiz, ...prev];
      localStorage.setItem('sq_quizzes', JSON.stringify(next));
      return next;
    });

    if (!newQuiz.isPublic && newQuiz.code) {
      const newNotif: Notification = {
        id: Date.now(),
        targetYear: newQuiz.year,
        targetMajor: newQuiz.major,
        quizId: newId,
        title: `${newQuiz.year} ${newQuiz.major}: ${newQuiz.subject} Exam Published!`,
        message: `${newQuiz.teacherName} uploaded ${newQuiz.title}. Access Code: ${newQuiz.code}.`,
        date: new Date().toISOString().split('T')[0],
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
    return newQuiz;
  };

  const deleteQuiz = (id: number) => {
    setQuizzes(prev => {
      const next = prev.filter(q => q.id !== id);
      localStorage.setItem('sq_quizzes', JSON.stringify(next));
      return next;
    });
  };

  const addStudent = (studentData: Omit<StudentAccount, 'id' | 'status'>) => {
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: StudentAccount = { ...studentData, id: newId, status: 'approved' };
    setStudents(prev => {
      const next = [...prev, newStudent];
      localStorage.setItem('sq_students', JSON.stringify(next));
      return next;
    });
    return newStudent;
  };

  const toggleStudentStatus = (id: number) => {
    setStudents(prev => {
      const next: StudentAccount[] = prev.map(s => {
        if (s.id !== id) return s;
        const newStatus: StudentAccount['status'] = s.status === 'approved' ? 'suspended' : 'approved';
        return { ...s, status: newStatus };
      });
      localStorage.setItem('sq_students', JSON.stringify(next));
      return next;
    });
  };

  const addTeacher = (teacherData: Omit<TeacherAccount, 'id'>) => {
    const newId = teachers.length ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    const newTeacher: TeacherAccount = { ...teacherData, id: newId };
    setTeachers(prev => {
      const next = [...prev, newTeacher];
      localStorage.setItem('sq_teachers', JSON.stringify(next));
      return next;
    });
    return newTeacher;
  };

  const submitAttempt = (newAttempt: Attempt) => {
    setAttempts(prev => {
      const filtered = prev.filter(a => !(a.quizId === newAttempt.quizId && a.studentRoll === newAttempt.studentRoll));
      const next = [newAttempt, ...filtered];
      localStorage.setItem('sq_attempts', JSON.stringify(next));
      return next;
    });
  };

  const sendChatMessage = (messageText: string, isAnnouncement = false) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: Date.now(),
      senderName: currentUser.name,
      role: currentUser.role,
      message: messageText,
      timestamp: timeStr,
      isAnnouncement: isAnnouncement && (currentUser.role === 'admin' || currentUser.role === 'teacher'),
      isPinned: false,
    };
    setChatMessages(prev => {
      const next = [...prev, newMsg];
      localStorage.setItem('sq_chat', JSON.stringify(next));
      return next;
    });
  };

  const pinChatMessage = (id: number) => {
    setChatMessages(prev => {
      const next = prev.map(m => ({ ...m, isPinned: m.id === id }));
      localStorage.setItem('sq_chat', JSON.stringify(next));
      return next;
    });
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentActiveQuiz(quiz);
    localStorage.setItem('sq_active_quiz', JSON.stringify(quiz));
    router.push(`/quiz/${quiz.id}`);
  };

  const finishQuiz = () => {
    setCurrentActiveQuiz(null);
    localStorage.removeItem('sq_active_quiz');
    if (currentUser.role === 'student') router.push('/student');
    else if (currentUser.role === 'teacher') router.push('/teacher');
    else if (currentUser.role === 'admin') router.push('/admin');
    else router.push('/');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeView,
        setActiveView,
        currentUser,
        login,
        logout,
        quizzes,
        addQuiz,
        deleteQuiz,
        students,
        addStudent,
        toggleStudentStatus,
        teachers,
        addTeacher,
        attempts,
        submitAttempt,
        notifications,
        chatMessages,
        sendChatMessage,
        pinChatMessage,
        currentActiveQuiz,
        startQuiz,
        finishQuiz,
        reviewQuizId,
        setReviewQuizId,
        credentialSlipStudent,
        setCredentialSlipStudent,
        loginModalOpen,
        setLoginModalOpen,
        changeUserPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
