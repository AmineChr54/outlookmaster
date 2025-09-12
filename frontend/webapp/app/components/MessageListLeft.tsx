import React from "react";
import MessageListItem from "./MessageListItem";
import { Email } from "./types";

interface MessageListLeftProps {
  emails: Email[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const MessageListLeft: React.FC<MessageListLeftProps> = ({ emails, selected, onSelect }) => (
  <div className="border-r border-yellow-900 bg-gray-900 overflow-y-auto" style={{ minWidth: 220, maxWidth: 600, width: '100%' }}>
    <ul className="divide-y divide-yellow-900">
      {emails.map((email) => (
        <MessageListItem
          key={email.id}
          email={email}
          selected={selected === email.id}
          onClick={() => onSelect(email.id)}
        />
      ))}
    </ul>
  </div>
);

export default MessageListLeft;
