import React from 'react';
import { toilet_paper, pasta, rice, vegetables } from '../../../images';
import TimePiece from './TimePiece/TimePiece';

const images = {
  toilet_paper: toilet_paper,
  pasta: pasta,
  rice: rice,
  vegetables: vegetables
}

const ProductTimeline = ({ product }) => {
  const productsList = product.timeline.map(period => {
    const epoch = period.timestamp;
    const data = new Date(0);
    data.setUTCSeconds(epoch);
    const hour = data.getHours();
    const min = data.getMinutes();
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