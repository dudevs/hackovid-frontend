import React from 'react';
import { Fragment } from 'react';

const TimePiece = ({ hour, min, votes }) => {

  // select the color of the TimePiece matching the result of the votes
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

  // add the time text every half hour
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