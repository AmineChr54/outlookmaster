import React from "react";
import { Email } from "../dash/types";
import ReplyButton from "./buttons/ReplyButton";
import SummaryButton from "./buttons/SummaryButton";
import ForwardButton from "./buttons/ForwardButton";
import EmailAvatar from "../common/EmailAvatar";
import { parseSender } from "../../utils/emailHelpers";

interface MessageContentProps {
  email: Email;
  onReplyClick: () => void;
  onSummaryClick: () => void;
  activeTab: null | 'reply' | 'summary';
}

const MessageContent: React.FC<MessageContentProps> = ({ email, onReplyClick, onSummaryClick, activeTab }) => {
  // Parse sender information for clean display
  const sender = parseSender(email.from || '');
  
  return (
    <div className="flex-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          {/* Subject and close button */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-title flex items-center gap-2 font-heading">
              {email.subject}
            </h3>
          </div>
          {/* Date */}
          <div className="text-xs text-date mb-1 flex items-center gap-1">
            {email.date}
          </div>
          {/* Sender info */}
          <div className="text-xs text-emailsender mb-2 flex items-center gap-1">
            <EmailAvatar from={email.from || ''} size={24} className="border" />
            {email.from}
          </div>
        </div>  
        {/* Action buttons */}
        <div className="flex flex-col gap-2 w-fit">
          <ReplyButton onClick={onReplyClick} isActive={activeTab === 'reply'} />
          <ForwardButton onClick={() => { /* Placeholder for forward functionality */ }} />
          <SummaryButton onClick={onSummaryClick} isActive={activeTab === 'summary'} />
        </div>
      </div>
      {/* Email body or preview, render HTML if available */}
      <div className="text-base text-main whitespace-pre-line mt-2 mb-6 font-body">
        {email.html ? (
          <div className="prose prose-invert max-w-none" style={{ color: 'var(--text-main)' }}>
            <style>{`* { color: var(--text-main) !important; }`}</style>
            <div dangerouslySetInnerHTML={{ __html: email.html }} />
          </div>
        ) : (
          email.body || email.preview
        )}
      </div>
    </div>
  );
};

export default MessageContent;
