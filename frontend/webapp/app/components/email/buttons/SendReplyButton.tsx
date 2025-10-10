import React from "react";

interface SendReplyButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const SendReplyButton: React.FC<SendReplyButtonProps> = ({ onClick, disabled = false }) => (
  <button
    className="bg-primary cursor-pointer text-bg px-4 py-2 rounded font-semibold hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
    onClick={onClick}
    disabled={disabled}
    type="button"
    aria-label="Send reply"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
    Send Reply
  </button>
);

export default SendReplyButton;