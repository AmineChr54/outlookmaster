import React from "react";

interface ReplyButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick, isActive = false }) => (
  <button
    className={`flex cursor-pointer items-center gap-1.5 px-2 py-1 rounded text-xs hover:bg-accent transition-colors w-20 justify-center ${
      isActive 
        ? 'bg-toggled text-bg font-semibold' 
        : 'bg-primary text-text-muted hover:text-main'
    }`}
    onClick={onClick}
    type="button"
    aria-label="Reply to email"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l4-4m-4 4l4 4" /></svg>
    Reply
  </button>
);

export default ReplyButton;
