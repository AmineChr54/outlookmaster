"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader, Sidebar } from "@/app/components/email";

interface Email {
  id: string;
  subject: string | null;
  from: string | null;
  snippet: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [mailbox, setMailbox] = useState("INBOX");

  useEffect(() => {
    // Automatically set the user as 'masteroutlook101@gmail.com' for bypass login branch
    setUser("masteroutlook101@gmail.com");
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchRawEmails = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/emails/fetch_raw");
        if (!res.ok) throw new Error("Failed to fetch emails");
        const data = await res.json();
        setEmails(data);
      } catch (err) {
        console.error("Error loading emails:", err);
      }
    };

    fetchRawEmails();
  }, [user]);

  const logout = () => {
    setUser(null);
    router.replace("/auth");
  };

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center">
        <div className="flex items-center gap-3 text-main">
          <svg
            className="animate-spin h-6 w-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Loading dashboard...</span>
        </div>
      </main>
    );
  }

  return (
    <div className="relative font-sans min-h-screen flex flex-col">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_lamp.jpg')" }}
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
        <AppHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
          <span>Welcome, {user}</span>
          <button onClick={logout} className="ml-auto bg-primary text-bg px-3 py-1 rounded cursor-pointer hover:bg-accent">
            Logout
          </button>
        </header>
        <div className="flex flex-1 overflow-hidden bg-transparent">
          <Sidebar collapsed={sidebarCollapsed} mailbox={mailbox} setMailbox={setMailbox} />
          <div className="flex-1 p-4 bg-white rounded shadow overflow-auto">
            <h2 className="text-xl mb-4">Emails</h2>
            {emails.length === 0 ? (
              <p>No emails available.</p>
            ) : (
              <ul className="space-y-2">
                {emails.map((email) => (
                  <li key={email.id} className="border border-gray-300 rounded p-3 hover:bg-gray-50 cursor-pointer">
                    <strong>Subject:</strong> {email.subject || "(no subject)"}
                    <br />
                    <strong>From:</strong> {email.from || "(unknown)"}
                    <br />
                    <p className="truncate max-w-xl">{email.snippet}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
