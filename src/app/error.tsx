"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold font-mono text-gradient-teal mb-4">500</p>
        <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
        <p className="text-muted mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
