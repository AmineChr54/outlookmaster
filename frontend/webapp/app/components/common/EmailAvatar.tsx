import React from "react";
import { parseSender } from "../../utils/emailHelpers";

interface EmailAvatarProps {
  /** The raw sender string from email headers */
  from: string;
  /** Size of the avatar in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether this avatar is selected (adds ring effect) */
  selected?: boolean;
}

/**
 * EmailAvatar Component
 * 
 * Displays an avatar for an email sender with automatic fallback to initials.
 * Uses the parseSender utility to extract name and initials from email headers.
 * 
 * @param props - EmailAvatarProps
 * @returns JSX.Element representing the avatar with image/initials fallback
 */
const EmailAvatar: React.FC<EmailAvatarProps> = ({ 
  from, 
  size = 32, 
  className = "", 
  selected = false 
}) => {
  const sender = parseSender(from);
  
  return (
    <div 
      className={`rounded-full shadow-md shrink-0 transition-all duration-200 ${selected ? 'ring-2 ring-primary' : ''} bg-primary text-bg flex items-center justify-center text-xs font-semibold ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Primary avatar image from API */}
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(sender.name)}&background=random`}
        alt="Avatar"
        className="w-full h-full rounded-full object-cover"
        onError={(e) => {
          // Fallback: Hide image and show initials when image fails to load
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.nextSibling) {
            (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
      {/* Initials fallback (hidden by default) */}
      <span className="hidden">{sender.initials}</span>
    </div>
  );
};

export default EmailAvatar;