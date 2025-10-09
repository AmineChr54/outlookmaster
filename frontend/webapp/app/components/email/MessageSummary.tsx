import React from "react";

interface MessageSummaryProps {
  summary: string;
}

const MessageSummary: React.FC<MessageSummaryProps> = ({ summary }) => (
  <div className="p-4 border-l border-border">
    <p className="text-main">{summary}</p>
  </div>
);

export default MessageSummary;
