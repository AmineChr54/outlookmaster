"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('loggedInUser') : null;
      if (stored) {
        router.replace('/dashboard');
      } else {
        router.replace('/dashboard');
      }
    } catch {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="flex items-center gap-3 text-main">
        <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span>Loading...</span>
      </div>
    </main>
  );
}