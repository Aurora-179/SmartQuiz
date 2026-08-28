export type Role = 'guest' | 'student' | 'teacher' | 'admin';

export interface User {
  id: number | null;
  role: Role;
  name: string;
  email: string | null;
  year?: string | null;
  major?: string | null;
  rollNo?: string | null;
  dept?: string | null;
}

export interface StudentAccount {
  id: number;
  rollNo: string;
  name: string;
  email: string;
  year: string;
  major: string;
  pass?: string;
  status: 'approved' | 'pending' | 'suspended';
}

export interface TeacherAccount {
  id: number;
  email: string;
  pass?: string;
  name: string;
  dept: string;
}

export interface AdminAccount {
  email: string;
  pass: string;
  name: string;
}

export interface Question {
  id: number;
  type: 'mcq' | 'tf' | 'blank';
  text: string;
  choices?: string[];
  answer: string;
}

export interface Quiz {
  id: number;
  title: string;
  year: string;
  major: string;
  subject: string;
  code: string | null;
  overallTime: number; // in minutes
  questionTime: number; // in seconds
  startTime?: string;
  endTime?: string;
  isPublic: boolean;
  teacherName: string;
  questions: Question[];
}

export interface Attempt {
  quizId: number;
  studentRoll: string;
  studentName: string;
  score: number;
  total: number;
  status: 'submitted' | 'auto_terminated';
  submittedAt: string;
  answers?: Record<number, string>;
}

export interface ChatMessage {
  id: number;
  senderName: string;
  role: Role;
  message: string;
  timestamp: string;
  isAnnouncement: boolean;
  isPinned: boolean;
}

export interface Notification {
  id: number;
  targetYear: string;
  targetMajor: string;
  quizId: number;
  title: string;
  message: string;
  date: string;
}

export type AcademicCurriculum = Record<string, Record<string, string[]>>;
