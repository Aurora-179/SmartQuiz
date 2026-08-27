import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="p-4 bg-sage-100 dark:bg-sage-900/60 text-sage-600 rounded-full">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
        404 - Page Not Found
      </h2>
      <p className="text-xs text-stone-500 max-w-sm">
        The requested page does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-sage text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
