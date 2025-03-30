import React from "react";

const CircularProgress = ({ percentage }) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Stroke width
  const circumference = 2 * Math.PI * radius; // Full circumference
  const offset = circumference - (percentage / 100) * circumference; // Stroke offset for progress

  return (
    <svg width="60" height="60" viewBox="0 0 120 120">
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#007bff"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)" // Rotate to start from top
      />
      {/* Percentage Text */}
      <text x="50%" y="50%" textAnchor="middle" dy="8" fontSize="20" fill="#000">
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
