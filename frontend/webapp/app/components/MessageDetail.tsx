
import React from "react";
import { Email } from "./types";

/**
 * Props for MessageDetail component
 */
export interface MessageDetailProps {
  email: Email;
  reply: string;
  sending: boolean;
  setReply: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}

/**
 * Renders the details of a selected email and reply panel
 * @param props MessageDetailProps
 */
const MessageDetail: React.FC<MessageDetailProps> = ({ email, reply, sending, setReply, onClose, onSend }) => (
  <section aria-label="Email details" className="flex flex-col h-full">
    {/* Subject and close button */}
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0" /></svg>
        {email.subject}
      </h3>
      <button
        className="text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
        onClick={onClose}
        aria-label="Close email details"
        type="button"
      >
        &times;
      </button>
    </div>
    {/* Date */}
    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-7 4h4" /></svg>
      {email.date}
    </div>
    {/* Sender info */}
    <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(email.from || 'User')}&background=random`} alt="avatar" className="w-6 h-6 rounded-full border" />
      {email.from}
    </div>
    {/* Email body or preview */}
    <div className="text-base text-gray-800 whitespace-pre-line mt-2 mb-6">{email.body || email.preview}</div>
    {/* Reply button scrolls to reply panel */}
    <button
      className="mb-4 cursor-pointer bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold hover:bg-blue-200 transition self-start"
      onClick={() => {
        const replyPanel = document.getElementById('reply-panel');
        if (replyPanel) replyPanel.scrollIntoView({ behavior: 'smooth' });
      }}
      type="button"
      aria-label="Scroll to reply"
    >Reply</button>
    {/* Reply panel: textarea and send button */}
    <form className="mt-auto" id="reply-panel" onSubmit={e => { e.preventDefault(); onSend(); }} aria-label="Reply to email">
      <label htmlFor="reply-textarea" className="sr-only">Reply</label>
      <textarea
        id="reply-textarea"
        className="w-full border rounded p-2 mb-2 text-gray-800"
        rows={4}
        placeholder="Type your reply..."
        value={reply}
        onChange={e => setReply(e.target.value)}
        aria-label="Reply message"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
        disabled={sending || !reply.trim()}
        type="submit"
        aria-busy={sending}
      >{sending ? 'Sending...' : 'Send Reply'}</button>
    </form>
  </section>
);

export default MessageDetail;
