"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader, Sidebar, MessageList } from "@/app/components/dash";
import { Mailbox } from "@/app/components/dash/types";
import Loading from "../components/common/Loading";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mailbox, setMailbox] = useState<Mailbox>("INBOX");

  useEffect(() => {
    // Automatically set the user as 'masteroutlook101@gmail.com' for bypass login branch
    setUser("masteroutlook101@gmail.com");
  }, []);

  const logout = () => {
    setUser(null);
    router.replace("/auth");
  };

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center bg-bg">
        <Loading message="Loading Dashboard..." className="" size={20} />
      </main>
    );
  }

  return (
    <div className="relative font-sans h-screen flex flex-col overflow-hidden bg-bg">
      <div className="relative z-10 h-full flex flex-col">
        <AppHeader 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed}
          user={user}
          onLogout={logout}
        />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <Sidebar collapsed={sidebarCollapsed} mailbox={mailbox} setMailbox={setMailbox} />
          <MessageList mailbox={mailbox} />
        </div>
      </div>
    </div>
  );
}
