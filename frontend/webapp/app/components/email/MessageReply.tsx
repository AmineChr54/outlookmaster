import React, { useState } from "react";
import SendReplyButton from "./buttons/SendReplyButton";

const MessageReply = () => {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    setSending(true);
    // Simulate sending reply
    setTimeout(() => {
      alert("Reply sent!");
      setReplyText("");
      setSending(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg bg-field border border-border focus-within:border-primary transition-colors">
      <textarea
        className="w-full bg-transparent resize-none outline-none text-main placeholder:text-text-muted font-body"
        rows={6}
        placeholder="Type your reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <SendReplyButton 
        onClick={handleSendReply}
        disabled={sending || !replyText.trim()}
      />
    </div>
  );
};

export default MessageReply;
