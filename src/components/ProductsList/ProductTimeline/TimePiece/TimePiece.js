import React from 'react';

const TimePiece = ({ hour, min, color }) => {
  return (
    <div className={`hour flex justify-center items-center flex-grow-1 bg-${color} h-100`}>
      <span>{hour}</span> : <span>{min}</span>
    </div>
  );
}

export default TimePiece;