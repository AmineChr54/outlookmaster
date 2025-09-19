"use client";

import React, { useState } from "react";
import { Email } from "./types";
import MessageListItem from "./MessageListItem";
import MessageDetail from "./MessageDetail";

interface MessageListProps {
  emails: Email[];
}

const MessageList: React.FC<MessageListProps> = ({ emails }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  if (!emails.length) return <div>No emails found</div>;

  const selectedEmail = emails.find((e) => e.id === selected) || null;

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full" style={{ height: 'calc(100vh - 15 * 0.25rem)' }}>
      <div className="flex-1 min-w-0 border-r overflow-y-auto" style={{ maxWidth: '30vw' }}>
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
