# SmartQuiz - Next.js Modern Frontend Application

SmartQuiz ၏ Next.js 14 (React, TypeScript, Tailwind CSS) Frontend Web Application ၏ Setup နှင့် Developer Guideline ဖြစ်ပါသည်။ 

---

## 🛠️ Prerequisites (လိုအပ်ချက်များ)

- **Node.js:** v18.0.0 သို့မဟုတ် ပိုသစ်သော Version
- **Package Manager:** `npm` (သို့မဟုတ် `pnpm` / `yarn`)

---

## 🚀 Quick Start Guide (စတင် Run နည်း)

### 1. Install Dependencies
Project root directory ထဲသို့ သွား၍ Package များကို Install လုပ်ပါ:
```bash
npm install
```

### 2. Environment Setup (Optional)
- Backend URL မူလအတိုင်း `http://localhost:8080/SmartQuizJavaEE` ကို သုံးထားပါသည်။
- ပြောင်းလဲလိုပါက `.env.example` ဖိုင်ကို `.env.local` ဟု ကူးယူပြီး `NEXT_PUBLIC_API_BASE_URL` ပြင်ဆင်နိုင်ပါသည်။

### 3. Run Development Server
Development Server ကို စတင် Run ရန်:
```bash
npm run dev
```
- Browser တွင် **`http://localhost:3000`** ကို ဖွင့်၍ အသုံးပြုနိုင်ပါပြီ။

### 4. Build Production App
Production bundle တည်ဆောက်ရန်:
```bash
npm run build
```

---

## 📁 Project Architecture & Folder Structure (ဖိုင်လမ်းကြောင်း လမ်းညွှန်)

```text
SmartQuiz/
├── src/
│   ├── app/                    # Next.js 14 App Router Pages
│   │   ├── page.tsx            # Home Page (Welcome & General Practice Quizzes)
│   │   ├── community/          # Community Hub (Global Chat & Announcements)
│   │   ├── practice/           # Student Practice Quizzes Page
│   │   ├── quiz/[id]/          # Quiz Exam Taking Interface (Timer, Question Navigation)
│   │   ├── student/            # Student Dashboard & Practice History
│   │   ├── teacher/            # Teacher Dashboard & Quiz Creation Form
│   │   └── admin/              # Admin Dashboard & Student/Teacher Approval & Slip Printing
│   ├── components/             # Reusable UI Components
│   │   ├── Navbar.tsx          # Navigation Header & Role Quick Switch
│   │   ├── Modals/             # Login Modal, Create Account Modal, Credential Slip Modal
│   │   └── Cards/              # Quiz Cards, Stat Widgets
│   ├── context/
│   │   └── AppContext.tsx      # Global State Management (User, Quizzes, Attempts, Chat)
│   ├── lib/
│   │   ├── api.ts              # Java Backend API Client Layer (Fetch API Wrapper)
│   │   └── initialData.ts     # Mock Data & Local Fallback Datasets
│   └── types/
│       └── index.ts            # TypeScript Types & Interfaces (User, Quiz, Attempt, Chat)
├── .env.example                # Sample Environment Variables
├── next.config.js              # Next.js Configuration
└── tailwind.config.ts          # Tailwind CSS Configuration & Theme Design System
```

---

## 💡 State Management & Backend Integration (အလုပ်လုပ်ပုံ)

1. **Global State (`AppContext.tsx`):**
   - App တစ်ခုလုံး၏ User Auth State, Theme (Light/Dark), Quizzes List, Students, Teachers, Chat Messages များကို `useApp()` Hook မှတစ်ဆင့် နေရာမရွေး ရယူသုံးစွဲနိုင်ပါသည်။

2. **Backend API Sync (`lib/api.ts`):**
   - Next.js App စတင်ချိန်တွင် Java EE Backend (`http://localhost:8080/SmartQuizJavaEE/DashboardDataController`) မှ ရလဒ်များကို လှမ်းယူပြီး State ကို Auto Update လုပ်ပေးပါသည်။
   - User Login, Quiz ဖန်တီးခြင်း၊ Exam ဖြေဆိုခြင်း၊ Chat ပို့ခြင်းများတွင် Java Backend API သို့ သွားရောက် သိမ်းဆည်းပါသည်။

3. **Offline Fallback:**
   - Java Server မဖွင့်ထားပါကလည်း `AppContext.tsx` က Browser ၏ `localStorage` နှင့် `initialData.ts` ကို သုံး၍ အလိုအလျောက် Seamless သုံးစွဲနိုင်အောင် ပြုလုပ်ထားပါသည်။

---

## 🔐 Default Demo Accounts (အကောင့်များ)

| Role | Roll No / Email | Password | Dashboard Link |
|---|---|---|---|
| **Student** | Roll: `3IST-101`, Email: `john@mail.com` | `std123` | `/student` |
| **Teacher** | Email: `teacher@smartquiz.com` | `teacher123` | `/teacher` |
| **Admin** | Email: `admin@smartquiz.com` | `admin123` | `/admin` |

---

## ⚡ Key Features (ပါဝင်သော စွမ်းဆောင်ရည်များ)

- **Role-based Authentication & Access Control:** (Student, Teacher, Admin, Guest)
- **Practice & Exam Mode:** တိုက်ရိုက် မေးခွန်းဖြေဆိုခြင်း၊ အချိန် limit၊ အမှတ်စာရင်းထုတ်ပေးခြင်း
- **Teacher Quiz Builder:** Graded Exam များနှင့် Practice Quizzes များ ဖန်တီးခြင်း
- **Admin Management:** Student/Teacher Accounts ထိန်းချုပ်ခြင်း၊ Status Toggle၊ Account Slip ပရင့်ထုတ်ခြင်း
- **Community Hub & Announcements:** real-time ကျောင်းသား/ဆရာ သတင်းလွှာနှင့် Chat စနစ်
- **Java EE Backend Integration & Offline Fallback:** Java Server မဖွင့်ထားပါကလည်း Local Storage / Mock Data ဖြင့် သာယာချောမွေ့စွာ အလုပ်လုပ်ပေးခြင်း
