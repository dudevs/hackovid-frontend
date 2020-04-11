import React from 'react';

import { baby_food, canned_food, eggs, flour, fruit, hand_soap, milk, oil, pasta, rice, toilet_paper, vegetables, water } from '../../../images';
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

/* eslint-disable*/
const hardCodedDate = fromUnixTime(1586485054); // FORMAT DATE Thu Apr 09 2020 19:17:34
const hardCodedDateLater = fromUnixTime(1586496274); // FORMAT DATE Thu Apr 09 2020 22:24:34
const currentDate = Math.floor(Date.now()/1000); // FORMAT EPOCH IN SECONDS
/* eslint-enable */

const ProductTimeline = ({ product, state, getTimeline }) => {

  const { TIMELINE_SPLIT_COUNT, MINUTES_PER_PIECE } = state.options;

  const epochToHourMinute = time => { // TAKES EPOCH, RETURNS HOUR,MIN
    const addZero = i => i<10 ? '0'+i : i.toString();
    const hours = addZero(fromUnixTime(time).getHours());
    const mins = addZero(fromUnixTime(time).getMinutes());
    return [hours, mins];
  };

  const lastExactMinute = () => {
    const lastMin = startOfMinute(hardCodedDateLater);
    return subMinutes(lastMin, lastMin.getMinutes() % MINUTES_PER_PIECE);
  }
  
  let timePiece = lastExactMinute();
  let myTimeline = [];
  [...Array(TIMELINE_SPLIT_COUNT)].forEach(() => {
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
    timePiece = subMinutes(timePiece, MINUTES_PER_PIECE);
    myTimeline.unshift(obj);
  });


  const productsList = myTimeline.map(period => {
    const [hour, min] = epochToHourMinute(period.timestamp)
    const votesCount = period.upvote - period.downvote;
    return <TimePiece hour={hour} min={min} votes={votesCount} key={hour+min}/>
  })

  const handleVote = async (e) => {
    const { product, vote } = e.currentTarget.dataset;
    const baseEndpoint = `https://localhost:5001/api/supermarket`;
    const url = `${baseEndpoint}/${state.selectedStore}/basicgood/${product}?status=${vote}`;
    console.log(url);
    try{
      await apiCall('http://www.mocky.io/v2/5e9097eb330000016e27d8f3', {method: 'POST'}).catch(handleError);
      const newProducts = 'http://www.mocky.io/v2/5e916be53300001455e9ce8d';
      getTimeline(newProducts);
    }
    catch(err){
      switch(err) {
        case "400":
          console.log('Error ' + err);
          alert('Hi ha hagut un error, prova-ho més tard');
          break;
        case "500":    
        console.log('Error ' + err);
        alert('El servei no està disponible');
          break;
        default:
          console.log('Error ' + err);
      }
    };
  }

  return (
    <div id={product.item} className="product">
      <img className="product-image" src={ images[product.item] } alt={product.item} />
      <div className="product-timeline">
        { productsList }
      </div>
      <div className="vote">
        <button 
          data-product={product.item}
          data-vote="true"
          onClick={ handleVote }
        >SI</button>
        <button 
          data-product={product.item}
          data-vote="false"
          onClick={ handleVote }
        >NO</button>
      </div>
    </div>
  );
}

export default ProductTimeline;