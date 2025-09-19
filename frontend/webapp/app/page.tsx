"use client";

import React, { useState } from "react";
import Login from "./Login";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!loggedInUser) {
    return <Login onLogin={(email) => setLoggedInUser(email)} />;
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
        <span>Welcome, {loggedInUser}</span>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <p className="text-lg">✅ You are logged in with Google!</p>
      </main>
    </div>
  );
}
