"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import AppHeader from "./components/AppHeader";
import { Mailbox } from "./components/types";
export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mailbox, setMailbox] = useState<Mailbox>("INBOX");
  const [selected, setSelected] = useState<any>(null);
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
    </div>
  );
}


