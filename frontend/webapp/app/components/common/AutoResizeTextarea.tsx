import React, { useEffect, useRef } from "react";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
  minRows?: number; // default 1
  maxRows?: number; // default 5
  placeholder?: string;
  className?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  minRows = 1,
  maxRows = 5,
  placeholder,
  className,
}) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset height to measure scrollHeight accurately
    el.style.height = "auto";

    // Compute desired height within rows constraints
    const lineHeight = parseFloat(
      window.getComputedStyle(el).lineHeight || "20"
    );
    const minHeight = minRows * lineHeight;
    const maxHeight = maxRows * lineHeight;
    const newHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);

    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > newHeight ? "auto" : "hidden";
  }, [value, minRows, maxRows]);

  return (
    <textarea
      ref={ref}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={minRows}
    />
  );
};

export default AutoResizeTextarea;
