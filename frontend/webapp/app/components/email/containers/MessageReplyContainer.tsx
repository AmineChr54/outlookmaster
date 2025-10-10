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
}

const EmailReplyContainer: React.FC<EmailReplyContainerProps> = ({ emailText, promptText, emailSender, emailDate, emailSubject, emailTone, emailLength }) => {
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!emailText) {
        setReply(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/ai/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailText, prompt: promptText, from: emailSender, date: emailDate, subject: emailSubject, tone: emailTone, length: emailLength }),
        });
        if (!response.ok) throw new Error("Failed to fetch reply");
        const data = await response.json();
        if (!aborted) setReply(data.reply || "");
      } catch (err) {
        if (!aborted) {
          setError((err as Error).message || "Unknown error");
          setReply(null);
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    run();
    return () => {
      aborted = true;
    };
  }, [emailText]);

  return (
    <div className="mt-4">
      {loading && <Loading />}
      {error && <p className="text-red-600">Error: {error}</p>}
      {reply && <MessageReply reply={reply} />}
      {!reply && !loading && !error && (
        <MessageReply reply="This is a placeholder for the email reply." />
      )}
    </div>
  );
};

export default EmailReplyContainer;
