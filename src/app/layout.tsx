import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { LoginModal } from '@/components/Modals/LoginModal';

export const metadata: Metadata = {
  title: 'Smart Quiz Management System',
  description: 'Academic examination, anti-cheating, practice quizzes, and campus community system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <LoginModal />
        </AppProvider>
      </body>
    </html>
  );
}
