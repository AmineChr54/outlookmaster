import React from "react";
import EmailDetail from "../email/EmailDetail";
import { Email } from "./types";

interface MessageListRightProps {
  selectedEmail: Email | null;
}

const MessageListRight: React.FC<MessageListRightProps> = ({
  selectedEmail,
}) => (
  <div className="flex-1 min-w-0 bg-bg p-8 overflow-y-auto flex flex-col text-main">
    {selectedEmail ? (
      <EmailDetail email={selectedEmail} />
    ) : (
      <div className="flex items-center justify-center h-full text-muted">
        Select an email to view its content
      </div>
    )}
  </div>
);

export default MessageListRight;
