import React from "react";
import { Email } from "./types";

export interface MessageListItemProps {
  email: Email;
  selected: boolean;
  onClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ email, selected, onClick }) => (
  <li
    className={`group cursor-pointer px-3 py-2 transition-all duration-150 flex flex-col gap-1 hover:bg-yellow-900 ${selected ? 'bg-yellow-800' : ''}`}
    onClick={onClick}
    style={{ minWidth: 0 }}
  >
    <div className="flex items-center justify-between min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(email.from || 'User')}&background=random`}
          alt="avatar"
          className={`w-8 h-8 rounded-full shadow-md shrink-0 transition-all duration-200 ${selected ? 'ring-2 ring-yellow-400' : ''}`}
        />
        <span className="font-semibold text-sm text-white group-hover:text-yellow-400 truncate max-w-[10rem] sm:max-w-[14rem] md:max-w-[18rem]">{email.subject || "(no subject)"}</span>
      </div>
      <span className="text-xs text-white ml-2 flex items-center gap-1 shrink-0">
        {email.date.substring(0, 11)}
      </span>
    </div>
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-xs text-white truncate flex-1">{email.from}</span>
    </div>
    <div className="flex items-center gap-1 min-w-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" /></svg>
      <span className="text-xs text-white truncate flex-1">{email.preview}</span>
    </div>
  </li>
);

export default MessageListItem;
