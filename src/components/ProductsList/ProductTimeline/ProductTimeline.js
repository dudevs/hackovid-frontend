import React from 'react';
import { baby_food, canned_food, eggs, flour, fruit, hand_soap, milk, oil, pasta, rice, toilet_paper, vegetables, water } from '../../../assets/images';
import TimePiece from './TimePiece/TimePiece';
import { fromUnixTime, getUnixTime, startOfMinute, subMinutes } from 'date-fns';
import { apiCall, handleError } from "../../../lib/utils";

const images = {
  baby_food: baby_food,
  canned_food: canned_food,
  eggs: eggs,
  flour: flour,
  fruit: fruit,
  hand_soap: hand_soap,
  milk: milk,
  oil: oil,
  pasta: pasta,
  rice: rice,
  toilet_paper: toilet_paper,
  vegetables: vegetables,
  water: water
}

const ProductTimeline = ({ baseProduct, dbProduct, state, getTimeline, BASE_ENDPOINT }) => {

  const { TIMELINE_SPLIT_COUNT, MINUTES_PER_PIECE } = state.options;

  // convert epoch time to an array with [hour, minute]
  const epochToHourMinute = time => {
    const addZero = i => i<10 ? '0'+i : i.toString();
    const hours = addZero(fromUnixTime(time).getHours());
    const mins = addZero(fromUnixTime(time).getMinutes());
    return [hours, mins];
  };

  // get the date of the last block of time used for the timeline divisions
  const lastExactMinute = () => {
    const lastMin = startOfMinute(Date.now());
    return subMinutes(lastMin, lastMin.getMinutes() % MINUTES_PER_PIECE);
  }
  
  let timePiece = lastExactMinute();

  // create an array with each of the timeline pieces
  // check if we have votes in our database from that exact timestamp, if not leave it empty
  let myTimeline = [];

  [...Array(TIMELINE_SPLIT_COUNT)].forEach(() => {
    const obj = {};
    obj.timestamp = getUnixTime(timePiece);
    let doWeHaveIt = false;
    if(dbProduct) {
      [ doWeHaveIt ] = dbProduct.timeline.filter(stamp => {
        return stamp.timestamp === obj.timestamp;
      });
    }
    if(doWeHaveIt) {
      obj.upvote = doWeHaveIt.upvote;
      obj.downvote = doWeHaveIt.downvote;
    } else {
      obj.upvote = 0;
      obj.downvote = 0;
    }
    timePiece = subMinutes(timePiece, MINUTES_PER_PIECE);
    myTimeline.unshift(obj);
  });

  // create each TimePiece component that forms the timeline for the current product
  const timeline = myTimeline.map(period => {
    const [hour, min] = epochToHourMinute(period.timestamp)
    const votesCount = period.upvote - period.downvote;
    return <TimePiece hour={hour} min={min} votes={votesCount} key={hour+min}/>
  })

  // send the vote to the database, refresh the timeline with the new data
  const handleVote = async (e) => {
    const { product, vote } = e.currentTarget.dataset;
    const url = `${BASE_ENDPOINT}/supermarket/${state.selectedStore}/basicgood/${product}?status=${vote}`;
    try{
      await apiCall(url, "POST").catch(handleError);
      getTimeline().catch(handleError);
    }
    catch(err){
      handleError(err);
    };
  }

  return (
    <div id={baseProduct.item} className="product">
      <img className="product-image" src={ images[baseProduct.item] } alt={baseProduct.item} />
      <div className="product-timeline">
        { timeline }
      </div>
      <div className="vote">
        <button 
          data-product={baseProduct.item}
          data-vote="true"
          onClick={ handleVote }
        >SI</button>
        <button 
          data-product={baseProduct.item}
          data-vote="false"
          onClick={ handleVote }
        >NO</button>
      </div>
    </div>
  );
}

export default ProductTimeline;