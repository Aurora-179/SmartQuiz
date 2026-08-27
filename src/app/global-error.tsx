'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Application Global Error</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg font-bold"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
