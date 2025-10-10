import React from "react";

interface ForwardButtonProps {
  onClick: () => void;
}

const ForwardButton: React.FC<ForwardButtonProps> = ({ onClick }) => (
  <button
    className="flex items-center cursor-pointer gap-1.5 bg-primary text-text-muted px-2 py-1 rounded text-xs hover:bg-accent transition-colors w-20 justify-center"
    onClick={onClick}
    type="button"
    aria-label="Forward email"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
    Forward
  </button>
);

export default ForwardButton;