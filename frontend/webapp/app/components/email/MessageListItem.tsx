import React from "react";
import { Email } from "./types";

export interface MessageListItemProps {
  email: Email;
  selected: boolean;
  onClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  email,
  selected,
  onClick,
}) => (
  <li
    className={`group cursor-pointer px-3 py-2 transition-all duration-150 flex flex-col gap-1 hover:bg-accent ${selected ? 'bg-primary' : 'bg-bg'} font-main`}

    onClick={onClick}
    style={{ minWidth: 0 }}
  >
    <div className="flex items-center justify-between min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(email.from || 'User')}&background=random`}
          alt="Foenem"
          className={`w-8 h-8 rounded-full shadow-md shrink-0 transition-all duration-200 ${selected ? 'ring-2 ring-primary' : ''}`}
        />
        <span className="font-semibold text-sm text-title group-hover:text-accent truncate max-w-[10rem] sm:max-w-[14rem] md:max-w-[18rem]">{email.subject || "(no subject)"}</span>
      </div>
      <span className="text-xs text-date ml-2 flex items-center gap-1 shrink-0">
        {email.date.substring(0, 11)}
      </span>
    </div>
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-xs text-emailsender truncate flex-1">{email.from}</span>
    </div>
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-xs text-main truncate flex-1">{email.preview}</span>
    </div>
  </li>
);

export default MessageListItem;
