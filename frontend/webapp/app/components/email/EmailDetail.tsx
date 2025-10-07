import React, { useState } from "react";
import { Email } from "../dash/types";
import MessageContent from "./MessageContent";
import MessageReply from "./MessageReply";
import MessageSummary from "./MessageSummary";
import PromptField from "./PromptField";

interface EmailDetailProps {
  email: Email;
}

const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-bg">
    <svg
      className="animate-spin h-12 w-12 text-primary mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span className="text-title font-semibold text-lg">
      Please wait a second...
    </span>
  </div>
);

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  const [activeTab, setActiveTab] = useState<null | 'reply' | 'summary'>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("medium");

  const handleReplyClick = () => {
    setActiveTab(activeTab === 'reply' ? null : 'reply');
  };

  const handleSummaryClick = () => {
    if (activeTab === 'summary') {
      setIsSummaryLoading(true);
      // Simulate a re-fetch
      setTimeout(() => setIsSummaryLoading(false), 1000);
    } else {
      setActiveTab('summary');
    }
  };

  return (
    <section className="flex flex-col h-full">
      <div className="flex gap-4 flex-1">
        <MessageContent
          email={email}
          onReplyClick={handleReplyClick}
          onSummaryClick={handleSummaryClick}
          activeTab={activeTab}
        />
        {activeTab && (
          <div className="flex-1">
            {activeTab === 'reply' && <MessageReply  />}
            {activeTab === 'summary' && (isSummaryLoading ? <LoadingAnimation /> : <MessageSummary />)}
          </div>
        )}
      </div>
      <PromptField
        prompt={prompt}
        onPromptChange={setPrompt}
        tone={tone}
        onToneChange={setTone}
        length={length}
        onLengthChange={setLength}
      />
    </section>
  );
};

export default EmailDetail;
