import React from 'react';
import { Fragment } from 'react';

const TimePiece = ({ hour, min, votes }) => {

  let color;
  if (votes === 0) {
    color = 'gray';
  };
  if (votes > 0) {
    color = 'green';
  };
  if (votes < 0) {
    color = 'red';
  };

  let timeText = '';
  if (min === "00" || min === "30") {
    timeText = (<Fragment>
      <p>{hour}:{min}</p>
    </Fragment>)
  }

  return (
    <div className={`time-piece ${color}`}>
      { timeText }
    </div>
  );
}

export default TimePiece;