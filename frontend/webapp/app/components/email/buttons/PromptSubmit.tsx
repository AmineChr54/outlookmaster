import React from "react";

interface PromptSubmitProps {
  onClick: () => void;
  disabled: boolean;
}

const PromptSubmit: React.FC<PromptSubmitProps> = ({ onClick, disabled }) => (
  <button
    className="bg-primary text-bg p-1.5 rounded-full cursor-pointer font-semibold hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={disabled}
    onClick={onClick}
    type="submit"
    aria-label="Submit prompt"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
  </button>
);

export default PromptSubmit;

