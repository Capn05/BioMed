// src/CircularRing.js
import React from 'react';
import './CircularRing.css'; // Import CSS for styling

const CircularRing = ({ percentage, radius = 50, strokeWidth = 10 }) => {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Adjust viewBox to account for stroke width
  const viewBoxSize = (radius + strokeWidth) * 2;

  return (
    <svg
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="circular-ring"
    >
      <circle
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        stroke="#4CAF50"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
            <text
        x="50%"
        y="50%"
        dy=".3em" // Adjusts vertical alignment of the text
        textAnchor="middle"
        fill="white"
        fontSize={`${radius / 3}px`} // Adjust font size relative to the radius
        fontFamily="Arial, sans-serif" // Adjust font family as needed
      >
        {percentage/10}
      </text>
    </svg>
  );
};

export default CircularRing;
