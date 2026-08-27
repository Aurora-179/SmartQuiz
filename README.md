# SmartQuiz - Next.js Modern Frontend Application

SmartQuiz ၏ Next.js 14 (React, TypeScript, Tailwind CSS) Frontend Web Application ဖြစ်ပါသည်။ 

---

## 🛠️ Prerequisites (လိုအပ်ချက်များ)

- **Node.js:** v18.0.0 သို့မဟုတ် ပိုသစ်သော Version
- **Package Manager:** npm (သို့မဟုတ် pnpm / yarn)

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

## 🔐 Default Demo Accounts (အကောင့်များ)

| Role | Roll No / Email | Password | Dashboard Link |
|---|---|---|---|
| **Student** | Roll: `3IST-101`, Email: `john@mail.com` | `std123` | `/student` |
| **Teacher** | Email: `teacher@smartquiz.com` | `teacher123` | `/teacher` |
| **Admin** | Email: `admin@smartquiz.com` | `admin123` | `/admin` |

---

## ⚡ Features (ပါဝင်သော စွမ်းဆောင်ရည်များ)

- **Role-based Authentication & Access Control:** (Student, Teacher, Admin, Guest)
- **Practice & Exam Mode:** တိုက်ရိုက် မေးခွန်းဖြေဆိုခြင်း၊ အချိန် limit၊ အမှတ်စာရင်းထုတ်ပေးခြင်း
- **Teacher Quiz Builder:** Graded Exam များနှင့် Practice Quizzes များ ဖန်တီးခြင်း
- **Admin Management:** Student/Teacher Accounts ထိန်းချုပ်ခြင်း၊ Status Toggle၊ Account Slip ပရင့်ထုတ်ခြင်း
- **Community Hub & Announcements:** real-time ကျောင်းသား/ဆရာ သတင်းလွှာနှင့် Chat စနစ်
- **Java EE Backend Integration & Offline Fallback:** Java Server မဖွင့်ထားပါကလည်း Local Storage / Mock Data ဖြင့် သာယာချောမွေ့စွာ အလုပ်လုပ်ပေးခြင်း
