import React from 'react';
import ProductTimeline from './ProductTimeline/ProductTimeline';
import { Fragment } from 'react';
import './ProductsList.css';

const ProductsList = ({ state, getTimeline }) => {

  let productTimeline;
  let comment;

  if(state.storeTimeline.length) {
    productTimeline = state.storeTimeline.map(product => <ProductTimeline key={product.item} product={ product } state={ state } getTimeline={getTimeline}/>);
    comment = (<Fragment>
      <div className="comment">
        <p>Vota si has vist recentment el producte disponible</p>
      </div>
    </Fragment>);
  }

  return (
    <div className="product-list">
      { comment }
      { productTimeline }
    </div>
  )
}

export default ProductsList;