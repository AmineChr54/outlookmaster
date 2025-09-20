"use client";

import React, { useEffect, useState, useRef } from "react";
import { Email, Mailbox } from "./types";
import MessageListLeft from "./MessageListLeft";
import MessageListRight from "./MessageListRight";

interface MessageListProps {
  emails: Email[];
}

const MessageList: React.FC<MessageListProps> = ({ emails }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  // Resizable panel state
  const [panelWidth, setPanelWidth] = useState<number>(340); // px
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/emails?mailbox=${encodeURIComponent(mailbox)}`
        );
        if (!res.ok) throw new Error("Failed to fetch emails");
        const data = await res.json();
        setEmails(data);
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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-bg">
        <svg
          className="animate-spin h-12 w-12 text-primary mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
        <span className="text-title font-semibold text-lg">
          Please wait a second...
        </span>
      </div>
    );
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
        reply={reply}
        sending={sending}
        setReply={setReply}
        onClose={() => setSelected(null)}
        onSend={() => {
          setSending(true);
          setTimeout(() => {
            alert("Reply sent!");
            setReply("");
            setSending(false);
          }, 1000);
        }}
      />
    </div>
  );
};

export default MessageList;
