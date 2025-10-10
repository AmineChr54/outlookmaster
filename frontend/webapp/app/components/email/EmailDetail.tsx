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
  const [draftReply, setDraftReply] = useState("");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("medium");
  const [submitKey, setSubmitKey] = useState(0);

  const handleReplyClick = () => {
    // Toggle reply tab; generation happens when container mounts or when submitKey changes
    setActiveTab(activeTab === 'reply' ? null : 'reply');
    // If opening reply, trigger generation immediately using current prompt and context
    if (activeTab !== 'reply') {
      setSubmitKey((k) => k + 1);
    }
  };

  const handleSummaryClick = async () => {
    setActiveTab('summary');
  };

  const handlePromptSubmit = () => {
    // Ensure Reply tab is visible
    if (activeTab !== 'reply') setActiveTab('reply');
    // Trigger regeneration with current prompt/tone/length and email context
    setSubmitKey((k) => k + 1);
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
            {activeTab === 'reply' && (
              <MessageReplyContainer
                emailText={email.body || email.preview || email.subject || ''}
                promptText={prompt}
                emailSender={email.from}
                emailDate={email.date}
                emailSubject={email.subject}
                emailTone={tone}
                emailLength={length}
                draft={draftReply}
                onDraftChange={setDraftReply}
                submitKey={submitKey}
                onPromptConsumed={() => setPrompt("")}
              />
            )}
            {activeTab === 'summary' && <EmailSummaryContainer emailText={email.body || email.preview || email.subject || ''} />}
          </div>
        )}
      </div>
      <PromptField
        prompt={prompt}
        onPromptChange={setPrompt}
        onPromptSubmit={handlePromptSubmit}
        tone={tone}
        onToneChange={setTone}
        length={length}
        onLengthChange={setLength}
      />
    </section>
  );
};

export default EmailDetail;
