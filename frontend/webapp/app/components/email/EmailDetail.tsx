import React, { useState } from "react";
import { Email } from "../dash/types";
import MessageContent from "./MessageContent";
import MessageReplyContainer from "./containers/MessageReplyContainer";
import EmailSummaryContainer from "./containers/EmailSummaryContainer";
import PromptField from "./PromptField";

interface EmailDetailProps {
  email: Email;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  const [activeTab, setActiveTab] = useState<null | 'reply' | 'summary'>(null);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("medium");

  const handleReplyClick = () => {
    setActiveTab(activeTab === 'reply' ? null : 'reply');
  };

  const handleSummaryClick = async () => {
    setActiveTab('summary');
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
            {activeTab === 'reply' && <MessageReplyContainer emailText={email.body || email.preview || email.subject || ''} promptText={prompt} emailSender={email.from} emailDate={email.date} emailSubject={email.subject} emailTone={tone} emailLength={length} />}
            {activeTab === 'summary' && <EmailSummaryContainer emailText={email.body || email.preview || email.subject || ''} />}
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
