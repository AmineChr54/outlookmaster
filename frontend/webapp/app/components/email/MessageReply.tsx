import React, { useEffect, useState } from "react";
import SendReplyButton from "./buttons/SendReplyButton";
interface MessageReplyProps {
  draft: string;
  onDraftChange: (value: string) => void;
  initialReceiver?: string;
}

const MessageReply: React.FC<MessageReplyProps> = ({draft, onDraftChange, initialReceiver}) => {
  const [receiver, setReceiver] = useState(initialReceiver || "");
  const [subject, setSubject] = useState("");
  const [replyText, setReplyText] = useState("");
  useEffect(() => {
    setReplyText(draft || "");
  }, [draft]);
  useEffect(() => {
    setReceiver(initialReceiver || "");
  }, [initialReceiver]);
  const [sending, setSending] = useState(false);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
    onDraftChange(e.target.value);
  }

  const handleSendReply = () => {
    // Implement actual send logic here
    const to = receiver?.trim();
    const subj = subject?.trim();
    const body = replyText?.trim();

    if (!to || !subj || !body) {
      alert("Please fill in To, Subject, and Body before sending.");
      return;
    }

    setSending(true);
    fetch("http://localhost:5000/api/emails/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient: to, subject: subj, body: body }),
    })
      .then(async (res) => {
        if (!res.ok) {
          let errMsg = `Failed to send email (status ${res.status})`;
          try {
            const data = await res.json();
            if (data?.error) errMsg = data.error;
          } catch (e) {
            // ignore JSON parse error
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then(() => {
        alert("Email sent successfully.");
        setReplyText("");
        onDraftChange("");
      })
      .catch((err) => {
        alert(`Error sending email: ${err.message || err}`);
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg bg-field border border-border focus-within:border-primary transition-colors">
 <div className="flex gap-1">
        <label className="text-sm text-date font-semibold" htmlFor="receiver">
          To:
        </label>
        <input
          id="receiver"
          type="text"
          className="w-full bg-transparent border-b border-border focus:border-primary text-emailsender outline-none font-body transition-colors"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
      <div className="flex gap-1">
        <label className="text-sm text-date" htmlFor="subject">
          Subject:
        </label>
        <input
          id="subject"
          type="text"
          className="w-full bg-transparent border-b border-border focus:border-primary text-title outline-none font-body transition-colors"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <textarea
        className="w-full bg-transparent resize-none outline-none text-main placeholder:text-text-muted font-body"
        rows={6}
        placeholder="Type your reply..."
        value={replyText}
        onChange={handleReplyChange}
      />
      <SendReplyButton 
        onClick={handleSendReply}
        disabled={sending || !replyText.trim() || !subject.trim() || !receiver.trim()}
      />
    </div>
  );
};

export default MessageReply;
