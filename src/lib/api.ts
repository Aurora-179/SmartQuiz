import { Attempt, ChatMessage, Question, Quiz, Role, StudentAccount, TeacherAccount, User } from '@/types';

export const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (typeof window === 'undefined') {
    return 'http://localhost:8081/SmartQuizJavaEE';
  }
  return '/SmartQuizJavaEE';
};

type BackendUser = {
  id: number;
  rollNo?: string | null;
  name: string;
  email: string;
  role: Role;
  year?: string | null;
  major?: string | null;
  department?: string | null;
  status?: 'approved' | 'pending' | 'suspended' | null;
};

const toUser = (user: BackendUser): User => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  year: user.year,
  major: user.major,
  rollNo: user.rollNo,
  dept: user.department,
});

const toStudent = (user: BackendUser): StudentAccount => ({
  id: user.id,
  rollNo: user.rollNo || '',
  name: user.name,
  email: user.email,
  year: user.year || '',
  major: user.major || '',
  status: user.status || 'pending',
});

const toTeacher = (user: BackendUser): TeacherAccount => ({
  id: user.id,
  name: user.name,
  email: user.email,
  dept: user.department || '',
});

const toQuestion = (question: any): Question => {
  let choices: string[] = [];
  if (Array.isArray(question.choices)) {
    choices = question.choices;
  } else if (Array.isArray(question.choicesJson)) {
    choices = question.choicesJson;
  } else if (typeof question.choicesJson === 'string' && question.choicesJson.trim()) {
    try {
      const parsed = JSON.parse(question.choicesJson);
      choices = Array.isArray(parsed) ? parsed : [];
    } catch {
      choices = [];
    }
  } else if (typeof question.choices === 'string' && question.choices.trim()) {
    try {
      const parsed = JSON.parse(question.choices);
      choices = Array.isArray(parsed) ? parsed : [];
    } catch {
      choices = [];
    }
  }

  const qType = (question.type || 'mcq').toLowerCase() as 'mcq' | 'tf' | 'blank';
  if (qType === 'tf' && choices.length === 0) {
    choices = ['True', 'False'];
  }

  return {
    id: Number(question.id),
    type: qType,
    text: question.text || question.questionText || '',
    choices,
    answer: question.answer || question.correctAnswer || '',
  };
};

const toQuiz = (quiz: any): Quiz => ({
  id: quiz.id,
  title: quiz.title,
  year: quiz.year,
  major: quiz.major,
  subject: quiz.subject,
  code: quiz.code,
  overallTime: quiz.overallTime,
  questionTime: quiz.questionTime,
  startTime: quiz.startTime,
  endTime: quiz.endTime,
  isPublic: quiz.isPublic,
  teacherName: quiz.teacherName,
  questions: (quiz.questions || []).map(toQuestion),
});

const toChatMessage = (message: any): ChatMessage => ({
  id: message.id,
  senderName: message.senderName,
  role: message.senderRole as Role,
  message: message.message,
  timestamp: message.timestamp || '',
  isAnnouncement: message.isAnnouncement,
  isPinned: message.isPinned,
});

const toAttempt = (attempt: any): Attempt => ({
  quizId: attempt.quizId,
  studentRoll: attempt.studentRoll,
  studentName: attempt.studentName,
  score: attempt.score,
  total: attempt.total,
  status: attempt.status,
  submittedAt: attempt.submittedAt || '',
});

async function request(path: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`);
  return data;
}

const form = (values: Record<string, string>) => new URLSearchParams(values).toString();

export async function fetchDashboardData(user: User | null) {
  const [quizzesData, chatData] = await Promise.all([
    request('/api/quizzes').catch((err) => {
      console.error('Failed to fetch quizzes:', err);
      return { quizzes: [] };
    }),
    request('/api/chat/messages').catch((err) => {
      console.error('Failed to fetch chat messages:', err);
      return { messages: [] };
    }),
  ]);

  const adminData = user?.role === 'admin'
    ? await Promise.all([
      request('/api/admin/students').catch(() => ({ students: [] })),
      request('/api/admin/teachers').catch(() => ({ teachers: [] })),
      request('/api/admin/attempts').catch(() => ({ attempts: [] })),
    ])
    : null;

  return {
    students: (adminData?.[0]?.students || []).map(toStudent),
    teachers: (adminData?.[1]?.teachers || []).map(toTeacher),
    quizzes: (quizzesData?.quizzes || []).map(toQuiz),
    attempts: (adminData?.[2]?.attempts || []).map(toAttempt),
    chatMessages: (chatData?.messages || []).map(toChatMessage),
  };
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const data = await request('/api/auth/me');
    return data.user ? toUser(data.user) : null;
  } catch { return null; }
}

export async function loginUser(role: Role, credentials: { rollNo?: string; email?: string; pass?: string }) {
  const data = await request('/LoginController', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form({ role, rollNo: credentials.rollNo || '', email: credentials.email || '', password: credentials.pass || '' }),
  });
  return toUser(data.user);
}

export const logoutUser = () => request('/LogoutController', { method: 'POST' });

export async function createQuiz(quiz: Omit<Quiz, 'id'>) {
  const values: Record<string, string> = {
    title: quiz.title, category: quiz.isPublic ? 'public' : 'exam', year: quiz.year,
    major: quiz.major, subject: quiz.subject, overallTime: String(quiz.overallTime),
    questionTime: String(quiz.questionTime), teacherName: quiz.teacherName, code: quiz.code || '',
    startTime: quiz.startTime || '', endTime: quiz.endTime || '',
    questionCount: String(quiz.questions.length),
  };
  quiz.questions.forEach((question, index) => {
    values[`question_${index}_type`] = question.type;
    values[`question_${index}_text`] = question.text;
    values[`question_${index}_answer`] = question.answer;
    values[`question_${index}_choices`] = JSON.stringify(question.choices || []);
  });
  const data = await request('/QuizCreateController', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form(values),
  });
  return toQuiz(data.quiz);
}

export const deleteQuizApi = (id: number) => request(`/QuizDeleteController?quizId=${id}`, { method: 'DELETE' });

export async function createStudentApi(student: Omit<StudentAccount, 'id' | 'status'>) {
  const data = await request('/AdminStudentController', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form({ rollNo: student.rollNo, name: student.name, email: student.email, year: student.year, major: student.major, password: student.pass || '' }),
  });
  return { ...toStudent(data.student), pass: student.pass };
}

export async function createTeacherApi(teacher: Omit<TeacherAccount, 'id'>) {
  const data = await request('/AdminTeacherController', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form({ name: teacher.name, email: teacher.email, department: teacher.dept, password: teacher.pass || '' }),
  });
  return { ...toTeacher(data.teacher), pass: teacher.pass };
}

export const toggleStudentStatusApi = (id: number, status: 'approved' | 'suspended') =>
  request(`/UserStatusController?stdId=${id}&status=${status}`, { method: 'PUT' });

export async function submitQuizAttempt(attempt: Attempt) {
  return request('/QuizSubmitController', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form({ quizId: String(attempt.quizId), studentRoll: attempt.studentRoll, studentName: attempt.studentName, score: String(attempt.score), total: String(attempt.total) }),
  });
}

export async function sendChatMessageApi(senderName: string, senderRole: Role, message: string, isAnnouncement = false) {
  const data = await request('/ChatSendController', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form({ senderName, senderRole, message, isAnnouncement: String(isAnnouncement) }),
  });
  return toChatMessage(data.chatMessage);
}

export const pinChatMessageApi = (id: number) => request(`/ChatPinController?msgId=${id}`, { method: 'POST' });
export const changePasswordApi = (newPassword: string) => request('/ChangePasswordController', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form({ newPassword }),
});
