// frontend/webapp/app/components/EmailsClient.tsx
"use client"

import React, { useEffect, useState } from "react";

type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  preview: string;
  body?: string;
  category?: string;
};

const MessageList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [mailbox, setMailbox] = useState<'INBOX' | '[Gmail]/Spam' | '[Gmail]/Drafts' | '[Gmail]/Sent'>('INBOX');
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/emails?mailbox=${encodeURIComponent(mailbox)}`);
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[600px]">
      <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="text-blue-600 font-semibold text-lg">Please wait a second...</span>
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (!emails.length) return <div>No emails found</div>;

  return (
    <div className="flex max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-[600px]">
      <div className="w-1/2 border-r overflow-y-auto">
        <div className="flex gap-2 p-4 border-b bg-gray-50">
          <button
            className={`px-3 py-1 rounded font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${mailbox === 'INBOX' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setMailbox('INBOX'); setSelected(null); }}
          >Inbox</button>
          <button
            className={`px-3 py-1 rounded font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${mailbox === '[Gmail]/Sent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setMailbox('[Gmail]/Sent'); setSelected(null); }}
          >Sent</button>
          <button
            className={`px-3 py-1 rounded font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${mailbox === '[Gmail]/Spam' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setMailbox('[Gmail]/Spam'); setSelected(null); }}
          >Spam</button>
          <button
            className={`px-3 py-1 rounded font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${mailbox === '[Gmail]/Drafts' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setMailbox('[Gmail]/Drafts'); setSelected(null); }}
          >Drafts</button>
        </div>
        <ul className="divide-y divide-gray-100">
          {emails.map((e) => (
            <li
              key={e.id}
              className={`group cursor-pointer px-6 py-4 transition-all duration-150 flex flex-col gap-1 hover:bg-blue-50 ${selected === e.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelected(e.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(e.from || 'User')}&background=random`} alt="avatar" className="w-7 h-7 rounded-full border" />
                  <span className="font-semibold text-gray-900 group-hover:text-blue-700 truncate max-w-xs">{e.subject || "(no subject)"}</span>
                </div>
                <span className="text-xs text-gray-400 ml-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-7 4h4" /></svg>
                  {e.date}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate max-w-xs flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0" /></svg>
                {e.from}
              </div>
              <div className="text-sm text-gray-700 truncate max-w-xs flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" /></svg>
                {e.preview}
              </div>
              <span className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {e.category}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 bg-gray-50 p-8 overflow-y-auto flex flex-col">
        {selected ? (
          <>
            <button
              className="self-end mb-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0" /></svg>
              {emails.find(e => e.id === selected)?.subject}
            </h3>
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-7 4h4" /></svg>
              {emails.find(e => e.id === selected)?.date}
            </div>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emails.find(e => e.id === selected)?.from || 'User')}&background=random`} alt="avatar" className="w-6 h-6 rounded-full border" />
              {emails.find(e => e.id === selected)?.from}
            </div>
            <button
              className="mb-4 bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold hover:bg-blue-200 transition self-start"
              onClick={() => {
                const replyPanel = document.getElementById('reply-panel');
                if (replyPanel) replyPanel.scrollIntoView({ behavior: 'smooth' });
              }}
            >Reply</button>
            <div className="text-base text-gray-800 whitespace-pre-line mt-2 mb-6">{emails.find(e => e.id === selected)?.body || emails.find(e => e.id === selected)?.preview}</div>

            <div className="mt-auto" id="reply-panel">
              <textarea
                className="w-full border rounded p-2 mb-2 text-gray-800"
                rows={4}
                placeholder="Type your reply..."
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
                disabled={sending || !reply.trim()}
                onClick={() => {
                  setSending(true);
                  setTimeout(() => {
                    alert('Reply sent!');
                    setReply('');
                    setSending(false);
                  }, 1000);
                }}
              >{sending ? 'Sending...' : 'Send Reply'}</button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">Select an email to view its content</div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
