import React from "react";

interface LengthSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const LengthSelect: React.FC<LengthSelectProps> = ({ value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-secondary text-text-muted hover:text-main pl-2 pr-6 py-1 rounded text-xs transition-colors cursor-pointer focus:outline-none"
    >
      <option value="short">Short</option>
      <option value="medium">Medium</option>
      <option value="long">Long</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
      <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

export default LengthSelect;
