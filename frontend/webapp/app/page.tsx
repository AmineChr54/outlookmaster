"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import AppHeader from "./components/AppHeader";
import { Mailbox } from "./components/types";
import Login from "./Login";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!loggedInUser) {
    return <Login onLogin={(email) => setLoggedInUser(email)} />;
  }

  return (
    <div className="relative font-sans min-h-screen flex flex-col">
      {/* Background image layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/public/images/background_lamp.jpg')" }}
        aria-hidden="true"
      />
      {/* Foreground app content */}
      <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
        <AppHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <div className="flex flex-1 overflow-hidden bg-transparent">
          <Sidebar collapsed={sidebarCollapsed} mailbox={mailbox} setMailbox={(mb) => { setMailbox(mb); setSelected(null); }} />
          <MessageList mailbox={mailbox} />
        </div>
      </div>
    {/* Login Page */}
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
        <span>Welcome, {loggedInUser}</span>
      </div>
      <main className="flex-1 flex items-center justify-center">
        <p className="text-lg">✅ You are logged in with Google!</p>
      </div>
    </div>
  );
}
