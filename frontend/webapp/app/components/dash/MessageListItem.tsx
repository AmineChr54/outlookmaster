import React from "react";
import { Email } from "./types";
import { parseSender } from "../../utils/emailHelpers";
import EmailAvatar from "../common/EmailAvatar";

/**
 * Props interface for the MessageListItem component
 */
export interface MessageListItemProps {
  /** The email object containing all email data */
  email: Email;
  /** Whether this email item is currently selected */
  selected: boolean;
  /** Callback function triggered when the item is clicked */
  onClick: () => void;
}

/**
 * MessageListItem Component
 * 
 * Renders an individual email item in the email list with the following features:
 * - Avatar with fallback to initials when image fails to load
 * - Subject line with truncation for long subjects
 * - Sender name (parsed from email headers)
 * - Email preview/snippet
 * - Date display (truncated to 11 characters)
 * - Visual selection state with hover effects
 * - Responsive design with different truncation widths
 * 
 * The component uses theme colors from globals.css and provides smooth transitions
 * for user interactions. When selected, the item changes background and adds a
 * ring effect to the avatar.
 * 
 * @param props - MessageListItemProps containing email data and handlers
 * @returns JSX.Element representing the email list item
 */
const MessageListItem: React.FC<MessageListItemProps> = ({
  email,
  selected,
  onClick,
}) => {
  // Parse sender information for clean display
  const sender = parseSender(email.from || '');
  
  return (
    <li
      className={`group cursor-pointer px-3 py-2 transition-all duration-150 flex flex-col gap-1 hover:bg-accent ${selected ? 'bg-primary' : 'bg-bg'} font-main`}
      onClick={onClick}
      style={{ minWidth: 0 }} // Ensures proper truncation behavior
    >
      {/* Header row: Avatar, Subject, Date */}
      <div className="flex items-center justify-between min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Avatar with automatic initials fallback */}
          <EmailAvatar from={email.from || ''} size={32} selected={selected} />
          {/* Email subject with responsive truncation */}
          <span className="font-semibold text-sm text-title group-hover:text-accent truncate max-w-[10rem] sm:max-w-[14rem] md:max-w-[18rem]">
            {email.subject || "(no subject)"}
          </span>
        </div>
        {/* Date display (first 11 characters) */}
        <span className="text-xs text-date ml-2 flex items-center gap-1 shrink-0">
          {email.date.substring(0, 11)}
        </span>
      </div>
      
      {/* Sender name row */}
      <div className="flex items-center gap-1 min-w-0">
        <span className="text-xs text-emailsender truncate flex-1">{sender.name}</span>
      </div>
      
      {/* Email preview/snippet row */}
      <div className="flex items-center gap-1 min-w-0">
        <span className="text-xs text-main truncate flex-1">{email.preview}</span>
      </div>
    </li>
  );
};

export default MessageListItem;
