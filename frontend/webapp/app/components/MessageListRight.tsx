import React from "react";
import MessageDetail from "./MessageDetail";
import { Email } from "./types";

interface MessageListRightProps {
  selectedEmail: Email | null;
  reply: string;
  sending: boolean;
  setReply: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}

const MessageListRight: React.FC<MessageListRightProps> = ({
  selectedEmail,
  reply,
  sending,
  setReply,
  onClose,
  onSend,
}) => (
  <div className="flex-1 min-w-0 bg-bg p-8 overflow-y-auto flex flex-col text-main">
    {selectedEmail ? (
      <MessageDetail
        email={selectedEmail}
        reply={reply}
        sending={sending}
        setReply={setReply}
        onClose={onClose}
        onSend={onSend}
      />
    ) : (
      <div className="flex items-center justify-center h-full text-muted">
        Select an email to view its content
      </div>
    )}
  </div>
);

export default MessageListRight;
