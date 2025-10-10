import React from "react";

interface LoadingProps {
  message?: string;
  className?: string;
  size?: number; // svg size in px
}

const Loading: React.FC<LoadingProps> = ({
  message = "Please wait a second...",
  className = "",
  size = 10,
}) => {
  const sizeClass = `h-${size} w-${size}`;
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full bg-bg ${className}`}>
      <svg
        className={`animate-spin text-primary mb-4 ${sizeClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-title font-semibold text-lg">{message}</span>
    </div>
  );
};

export default Loading;
