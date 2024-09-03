// src/DateCircle.js
import React from 'react';
import './DateCircle.css';

function DateCircle({ date, onClick }) {
  return (
    <div className="date-circle" onClick={onClick}>
      {date}
    </div>
  );
}

export default DateCircle;
