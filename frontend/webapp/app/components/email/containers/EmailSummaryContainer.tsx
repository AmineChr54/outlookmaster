import React, { useState } from "react";
import SummaryButton from "../buttons/SummaryButton";
import MessageSummary from "../selectors/MessageSummary";

interface EmailSummaryContainerProps {
  emailText: string;
}

const EmailSummaryContainer: React.FC<EmailSummaryContainerProps> = ({ emailText }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummaryClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError((err as Error).message || "Unknown error");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SummaryButton onClick={handleSummaryClick} isActive={loading} />
      <div className="mt-4">
        {loading && <p>Loading summary...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {summary && <MessageSummary summary={summary} />}
        {!summary && !loading && !error && (
          <MessageSummary summary="This is a placeholder for the email summary." />
        )}
      </div>
    </div>
  );
};

export default EmailSummaryContainer;
