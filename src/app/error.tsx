'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="p-4 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-full">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
        Something went wrong!
      </h2>
      <p className="text-xs text-stone-500 max-w-sm">
        An unhandled application error occurred. You can retry loading the component.
      </p>
      <button
        onClick={() => reset()}
        className="btn-sage text-xs py-2.5 px-5 font-bold flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" /> Try Again
      </button>
    </div>
  );
}
