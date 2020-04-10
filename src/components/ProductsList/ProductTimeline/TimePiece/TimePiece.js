import React from 'react';

const TimePiece = ({ hour, min, color }) => {
  let oclock = false;
  let half = false;
  if(!min) {
    oclock = true;
  } else if(min === 30) {
    half = true;
  }
  return (
    <div className={`hour flex justify-center items-center flex-grow-1 bg-${color} h-100`}>
      {
        oclock ? <p className="fixed f6">{hour}:00</p> : null
      }
      {
        half ? <p className="fixed f6">{hour}:{min}</p> : null
      }
      {/* <span>{hour}</span> : <span>{min}</span> */}
    </div>
  );
}

export default TimePiece;