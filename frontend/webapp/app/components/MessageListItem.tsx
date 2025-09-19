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
    className={`group cursor-pointer px-6 py-4 transition-all duration-150 flex flex-col gap-1 hover:bg-blue-50 ${
      selected ? "bg-blue-100" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            email.from || "User"
          )}&background=random`}
          alt="avatar"
          className="w-7 h-7 rounded-full border"
        />
        <span className="font-semibold text-gray-900 group-hover:text-blue-700 truncate max-w-xs">
          {email.subject || "(no subject)"}
        </span>
      </div>
      <span className="text-xs text-gray-400 ml-2 flex items-center gap-1">
        {email.date.substring(0, 11)}
      </span>
    </div>
    <div className="text-xs text-gray-500 truncate gap-1 flex items-center">
      {email.from}
    </div>
    <div className="text-sm text-gray-700 truncate flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 inline-block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4h16v16H4V4z"
        />
      </svg>
      {email.preview}
    </div>
  </li>
);

export default MessageListItem;

