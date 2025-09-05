"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import { Mailbox } from "./components/types";
export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mailbox, setMailbox] = useState<Mailbox>("INBOX");
  const [selected, setSelected] = useState<any>(null);
  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
        {/* Main menu button */}
        <button
          className="mr-2 p-2 rounded hover:bg-blue-800 focus:outline-none cursor-pointer"
          aria-label="Toggle sidebar"
          onClick={() => setSidebarCollapsed((c) => !c)}
        >
          {/* Hamburger icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span>OutlookMaster</span>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} mailbox={mailbox} setMailbox={(mb) => { setMailbox(mb); setSelected(null); }} />
        <MessageList mailbox={mailbox} />
      </div>
    </div>
  );
}


