import React, { useEffect, useState } from "react";
import MessageSummary from "../MessageSummary";
import Loading from "../../common/Loading";

interface EmailSummaryContainerProps {
  emailText: string;
}

const EmailSummaryContainer: React.FC<EmailSummaryContainerProps> = ({ emailText }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch summary when emailText changes or on mount
  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!emailText) {
        setSummary(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailText }),
        });
        if (!response.ok) throw new Error("Failed to fetch summary");
        const data = await response.json();
        if (!aborted) setSummary(data.summary || "");
      } catch (err) {
        if (!aborted) {
          setError((err as Error).message || "Unknown error");
          setSummary(null);
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
      {summary && <MessageSummary summary={summary} />}
      {!summary && !loading && !error && (
        <MessageSummary summary="This is a placeholder for the email summary." />
      )}
    </div>
  );
};

export default EmailSummaryContainer;
