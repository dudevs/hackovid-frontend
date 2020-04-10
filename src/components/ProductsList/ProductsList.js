import React from 'react';
import ProductTimeline from './ProductTimeline/ProductTimeline';
import { Fragment } from 'react';

const ProductsList = ({ storeTimeline }) => {

  let productTimeline;
  let comment;

  if(storeTimeline.length) {
    productTimeline = storeTimeline.map(product => <ProductTimeline product={ product }/>);
    comment = (<Fragment>
      <div>
        <p>Vota si has vist recentment el producte disponible</p>
      </div>
    </Fragment>);
  }

  return (
    <div className="products flex flex-column ma3">
      { comment }
      { productTimeline }
    </div>
  )
}

export default ProductsList;