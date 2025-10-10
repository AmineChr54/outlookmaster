"use client";

import React, { useEffect, useState, useRef } from "react";
import { Email, Mailbox } from "./types";
import MessageListLeft from "./MessageListLeft";
import MessageListRight from "./MessageListRight";
import Loading from "../common/Loading";

interface MessageListProps {
  mailbox: Mailbox;
}

const MessageList: React.FC<MessageListProps> = ({ mailbox }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  // Resizable panel state
  const [panelWidth, setPanelWidth] = useState<number>(340); // px
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/emails/fetch_raw");
        if (!res.ok) throw new Error("Failed to fetch emails");
        const rawData = await res.json();
        
        // Transform the data to match our Email type
        const transformedEmails: Email[] = rawData.map((email: any) => ({
          id: email.id,
          subject: email.subject || "(no subject)",
          from: email.from || "(unknown)",
          date: email.date || new Date().toISOString(), // Use backend date or fallback to current date
          preview: email.body ? email.body.substring(0, 200) + "..." : "", // Create preview from body
          body: email.body || "", // Use the full body content
          html: undefined,
          category: undefined
        }));
        
        setEmails(transformedEmails);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mailbox]);

  // Mouse event handlers for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const minWidth = 220;
      const maxWidth = 600;
      let newWidth = e.clientX - (panelRef.current?.getBoundingClientRect().left || 0);
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      setPanelWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (loading) return <Loading message="Loading emails..." className="" size={20} />;
  if (error) return <div className="text-error">Error: {error}</div>;
  if (!emails.length) return <div className="text-muted">No emails found</div>;

  const selectedEmail = emails.find((e) => e.id === selected) || null;

  return (
    <div
      className="flex bg-bg rounded-lg shadow-md overflow-hidden border border-bg w-full font-main"
      style={{ height: 'calc(100vh - 15 * 0.25rem)' }}
      ref={panelRef}
    >
      {/* Left column: mailbox buttons and email list */}
      <div
        style={{ width: panelWidth, minWidth: 220, maxWidth: 600 }}
        className="h-full"
      >
        <MessageListLeft
          emails={emails}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
      {/* Resizer */}
      <div
        className={`w-px cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors duration-150 ${isResizing ? 'bg-blue-400' : ''}`}
        onMouseDown={() => setIsResizing(true)}
        style={{ zIndex: 10 }}
        title="Drag to resize"
      />
      {/* Right column: email details and reply panel */}
      <MessageListRight
        selectedEmail={selectedEmail}
      />
    </div>
  );
};

export default MessageList;
