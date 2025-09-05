"use client";

import React, { useEffect, useState } from "react";
import { Email, Mailbox } from "./types";
import MessageListItem from "./MessageListItem";
import MessageDetail from "./MessageDetail";

// Mailboxes are now managed in Sidebar

interface MessageListProps {
  mailbox: Mailbox;
}

const MessageList: React.FC<MessageListProps> = ({ mailbox }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <svg
          className="animate-spin h-12 w-12 text-blue-500 mb-4"
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
        <span className="text-blue-600 font-semibold text-lg">
          Please wait a second...
        </span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!emails.length) return <div>No emails found</div>;

  const selectedEmail = emails.find((e) => e.id === selected) || null;

  return (
    <div
      className="flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full"
      style={{ height: 'calc(100vh - 15 * 0.25rem)' }} // 15 * 0.25rem is the header height
    >
      {/* Left column: mailbox buttons and email list */}
      <div className="flex-1 min-w-0 border-r overflow-y-auto" style={{ maxWidth: '30vw' }}>
        {/* Sidebar now handles mailbox selection */}
        <ul className="divide-y divide-gray-100">
          {emails.map((email) => (
            <MessageListItem
              key={email.id}
              email={email}
              selected={selected === email.id}
              onClick={() => setSelected(email.id)}
            />
          ))}
        </ul>
      </div>
      {/* Right column: email details and reply panel */}
      <div className="flex-1 min-w-0 bg-gray-50 p-8 overflow-y-auto flex flex-col">
        {selectedEmail ? (
          <MessageDetail
            email={selectedEmail}
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select an email to view its content
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;

