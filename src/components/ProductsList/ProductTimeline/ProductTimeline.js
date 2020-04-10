import React from 'react';
import { toilet_paper, pasta, rice, vegetables } from '../../../images';
import TimePiece from './TimePiece/TimePiece';
import { fromUnixTime, getUnixTime, startOfMinute, subMinutes } from 'date-fns';

const images = {
  toilet_paper: toilet_paper,
  pasta: pasta,
  rice: rice,
  vegetables: vegetables
}


const hardCodedDate = 1586485054; // Thu Apr 09 2020 19:17:34

const epochToHourMinute = time => [fromUnixTime(time).getHours(), fromUnixTime(time).getMinutes()];

const lastFiveMinute = () => {
  let lastMinute = startOfMinute(Date.now()); // Date.now()
  while(lastMinute.getMinutes()%5){
    lastMinute = subMinutes(lastMinute, 1);
  }
  return lastMinute;
}

const ProductTimeline = ({ product }) => {

  let timePiece = lastFiveMinute();
  let myTimeline = [];
  [...Array(48)].forEach(() => {
    const obj = {};
    obj.timestamp = getUnixTime(timePiece)
    const [ doWeHaveIt ] = product.timeline.filter(stamp => stamp.timestamp === obj.timestamp);
    if(doWeHaveIt) {
      obj.upvote = doWeHaveIt.upvote;
      obj.downvote = doWeHaveIt.downvote;
    } else {
      obj.upvote = 0;
      obj.downvote = 0;
    }
    timePiece = subMinutes(timePiece, 5);
    myTimeline.unshift(obj);
  });


  const productsList = myTimeline.map(period => {
    const [hour, min] = epochToHourMinute(period.timestamp)
    const votesCount = period.upvote - period.downvote;
    let color;
    if (votesCount === 0) {
      color = 'light-gray';
    } else if (votesCount > 0) {
      color = 'green';
    } else {
      color = 'red'
    };
    return <TimePiece hour={hour} min={min} color={color} />
  })

  return (
    <div className="product flex items-center ma2">
      <img className="product-image w-10" src={ images[product.item] } alt="toilet_paper" />
      <div className="product-timeline flex flex-grow-1 h3">
        { productsList }
      </div>
      <div className="vote flex flex-column ml2">
        <button className="f6 link dim ba ph3 pv2 mb2 dib black">SI</button>
        <button className="f6 link dim ba ph3 pv2 mb2 dib black">NO</button>
      </div>
    </div>
  );
}

export default ProductTimeline;