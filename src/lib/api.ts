import { User, StudentAccount, TeacherAccount, Quiz, Attempt, ChatMessage, Role } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/SmartQuizJavaEE';

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchDashboardData(): Promise<{
  students?: StudentAccount[];
  teachers?: TeacherAccount[];
  quizzes?: Quiz[];
  chatMessages?: ChatMessage[];
} | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/DashboardDataController?format=json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;
    return {
      students: data.students || [],
      teachers: data.teachers || [],
      quizzes: data.quizzes || [],
      chatMessages: data.chatMessages || [],
    };
  } catch (error) {
    console.warn('Java Backend connection offline, utilizing client local state fallback:', error);
    return null;
  }
}

export async function loginUser(
  role: Role,
  credentials: { rollNo?: string; email?: string; pass?: string }
): Promise<User | null> {
  try {
    const params = new URLSearchParams({
      role: role,
      rollNo: credentials.rollNo || '',
      email: credentials.email || '',
      password: credentials.pass || '',
      format: 'json',
    });

    const res = await fetchWithTimeout(`${API_BASE_URL}/LoginController`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && data.user) {
      return {
        id: data.user.id,
        role: data.user.role as Role,
        name: data.user.name,
        email: data.user.email,
        year: data.user.year,
        major: data.user.major,
        rollNo: data.user.rollNo,
        dept: data.user.department,
      };
    }
    return null;
  } catch (error) {
    console.warn('Java Login API offline, fallback to local login check:', error);
    return null;
  }
}

export async function createQuiz(quiz: Omit<Quiz, 'id'>): Promise<Quiz | null> {
  try {
    const params = new URLSearchParams({
      title: quiz.title,
      category: quiz.isPublic ? 'public' : 'exam',
      year: quiz.year || 'All',
      major: quiz.major || 'Public Practice',
      subject: quiz.subject || 'General Practice',
      overallTime: String(quiz.overallTime),
      questionTime: String(quiz.questionTime),
      teacherName: quiz.teacherName || 'Faculty Instructor',
      format: 'json',
    });

    const res = await fetchWithTimeout(`${API_BASE_URL}/QuizCreateController`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && data.quiz) {
      return {
        id: data.quiz.id || Date.now(),
        title: data.quiz.title,
        year: data.quiz.year,
        major: data.quiz.major,
        subject: data.quiz.subject,
        code: data.quiz.code,
        overallTime: data.quiz.overallTime,
        questionTime: data.quiz.questionTime,
        isPublic: data.quiz.isPublic,
        teacherName: data.quiz.teacherName,
        questions: quiz.questions || [],
      };
    }
    return null;
  } catch (error) {
    console.warn('Java CreateQuiz API offline, saving to local state:', error);
    return null;
  }
}

export async function submitQuizAttempt(attempt: Attempt): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      quizId: String(attempt.quizId),
      studentRoll: attempt.studentRoll,
      studentName: attempt.studentName,
      score: String(attempt.score),
      total: String(attempt.total),
      format: 'json',
    });

    const res = await fetchWithTimeout(`${API_BASE_URL}/QuizSubmitController`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) return false;
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.warn('Java SubmitAttempt API offline:', error);
    return false;
  }
}

export async function sendChatMessageApi(
  senderName: string,
  senderRole: string,
  message: string,
  isAnnouncement = false
): Promise<ChatMessage | null> {
  try {
    const params = new URLSearchParams({
      senderName,
      senderRole,
      message,
      isAnnouncement: String(isAnnouncement),
      format: 'json',
    });

    const res = await fetchWithTimeout(`${API_BASE_URL}/ChatSendController`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && data.chatMessage) {
      return {
        id: data.chatMessage.id || Date.now(),
        senderName: data.chatMessage.senderName,
        role: data.chatMessage.senderRole as Role,
        message: data.chatMessage.message,
        timestamp: data.chatMessage.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAnnouncement: data.chatMessage.isAnnouncement,
        isPinned: false,
      };
    }
    return null;
  } catch (error) {
    console.warn('Java ChatSend API offline:', error);
    return null;
  }
}

export async function toggleStudentStatusApi(stdId: number, status: 'approved' | 'suspended'): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/UserStatusController?stdId=${stdId}&status=${status}&format=json`);
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.warn('Java UserStatus API offline:', error);
    return false;
  }
}

export async function changePasswordApi(userId: number, newPass: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      userId: String(userId),
      newPassword: newPass,
      format: 'json',
    });
    const res = await fetchWithTimeout(`${API_BASE_URL}/ChangePasswordController`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.warn('Java ChangePassword API offline:', error);
    return false;
  }
}
