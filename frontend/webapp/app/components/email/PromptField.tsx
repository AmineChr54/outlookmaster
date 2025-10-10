import React from "react";
import ToneSelect from "./selectors/ToneSelect";
import LengthSelect from "./selectors/LengthSelect";
import PromptSubmit from "./buttons/PromptSubmit";

interface PromptFieldProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onPromptSubmit: () => void;
  tone: string;
  onToneChange: (value: string) => void;
  length: string;
  onLengthChange: (value: string) => void;
}

const PromptField: React.FC<PromptFieldProps> = ({
  prompt,
  onPromptChange,
  onPromptSubmit,
  tone,
  onToneChange,
  length,
  onLengthChange,
}) => (
  <div className="flex flex-col gap-3 p-3 rounded-lg bg-field border border-border focus-within:border-primary transition-colors">
    <textarea
      className="w-full bg-transparent resize-none outline-none text-main placeholder:text-text-muted font-body"
      rows={1}
      placeholder="Type your prompt to reply..."
      value={prompt}
      onChange={(e) => onPromptChange(e.target.value)}
    />
    <div className="flex items-center gap-2">
      {/* Left-aligned controls */}
      <ToneSelect value={tone} onChange={onToneChange} />
      <LengthSelect value={length} onChange={onLengthChange} />
      
      {/* Icon buttons for actions */}
      <button className="flex items-center cursor-pointer gap-1.5 bg-secondary text-text-muted hover:text-main px-2 py-1 rounded text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>
        Knowledge Base
      </button>
      <button className="flex items-center cursor-pointer gap-1.5 bg-secondary text-text-muted hover:text-main px-2 py-1 rounded text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Preferences
      </button>

      {/* Spacer */}
      <div className="flex-grow" />
      
      {/* Submit Button */}
      <PromptSubmit onClick={onPromptSubmit} disabled={!prompt.trim()} />
    </div>
  </div>
);

export default PromptField;
