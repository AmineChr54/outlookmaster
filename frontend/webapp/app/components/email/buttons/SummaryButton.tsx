import React from "react";

interface SummaryButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

const SummaryButton: React.FC<SummaryButtonProps> = ({ onClick, isActive = false }) => (
  <button
    className={`flex items-center cursor-pointer gap-1.5 px-2 py-1 rounded text-xs hover:bg-accent transition-colors w-20 justify-center ${
      isActive 
        ? 'bg-toggled text-bg font-semibold' 
        : 'bg-primary text-text-muted hover:text-main'
    }`}
    onClick={onClick}
    type="button"
    aria-label="Summarize email"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    Summary
  </button>
);

export default SummaryButton;
