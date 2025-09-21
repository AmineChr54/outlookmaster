
"use client";
// Refactored for clarity and structure, removed duplicate login block, fixed background image path, and organized state. _mahdi
// Added sidebarCollapsed, mailbox, and selected state for better state management. _mahdi
// Show login if not authenticated. _mahdi
// Main app layout with background and header. _mahdi
// Background image path fixed for Next.js public assets. _mahdi
// AppHeader and Welcome message moved to main content. _mahdi
// Reset selected message when mailbox changes. _mahdi


import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import AppHeader from "./components/AppHeader";
import { Mailbox } from "./components/types";
import Login from "./Login";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [selected, setSelected] = useState(null);

  if (!loggedInUser) {
    return <Login onLogin={setLoggedInUser} />;
  }

  return (
    <div className="relative font-sans min-h-screen flex flex-col">
      {/* Background image layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_lamp.jpg')" }}
        aria-hidden="true"
      />
      {/* Foreground app content */}
      <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
        <AppHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
          <span>Welcome, {loggedInUser}</span>
        </header>
        <div className="flex flex-1 overflow-hidden bg-transparent">
          {/* Always render Sidebar and MessageList after login, even if mailbox is null. _mahdi */}
          <Sidebar
            collapsed={sidebarCollapsed}
            mailbox={mailbox}
            setMailbox={(mb) => {
              setMailbox(mb);
              setSelected(null);
            }}
          />
          <MessageList mailbox={mailbox} />
        </div>
        {/* Removed 'You are logged in with Google!' message after login. _mahdi */}
      </div>
    </div>
  );
}
