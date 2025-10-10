import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import MessageReply from "../MessageReply";

interface EmailReplyContainerProps {
  emailText: string;
  promptText: string;
  emailSender: string;
  emailDate: string;
  emailSubject: string;
  emailTone: string;
  emailLength: string;
  // Controlled draft from parent
  draft: string;
  onDraftChange: (value: string) => void;
  // Optional key to force refetch on submit clicks even if prompt text is unchanged
  submitKey?: number;
  // Optional callback to clear prompt in parent after successful generation
  onPromptConsumed?: () => void;
}

const EmailReplyContainer: React.FC<EmailReplyContainerProps> = ({ emailText, promptText, emailSender, emailDate, emailSubject, emailTone, emailLength, draft, onDraftChange, submitKey, onPromptConsumed }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!emailText) {
        onDraftChange("");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/ai/generate_reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailText, prompt: promptText, from: emailSender, date: emailDate, subject: emailSubject, tone: emailTone, length: emailLength }),
        });
        if (!response.ok) throw new Error("Failed to fetch reply");
        const data = await response.json();
        if (!aborted) {
          onDraftChange(data.reply || "");
          if (onPromptConsumed) onPromptConsumed();
        }
      } catch (err) {
        if (!aborted) {
          setError((err as Error).message || "Unknown error");
          onDraftChange("");
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    run();
    return () => {
      aborted = true;
    };
  }, [submitKey]);

  return (
    <div className="mt-4">
      {loading && <Loading message="Generating reply..." size={6} />}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && <MessageReply draft={draft} onDraftChange={onDraftChange} initialReceiver={emailSender} />}
    </div>
  );
};

export default EmailReplyContainer;
