import React from 'react';
import ProductTimeline from './ProductTimeline/ProductTimeline';

const ProductsList = ({ selectedStore, storeTimeline }) => {

  let productTimeline;

  if(storeTimeline.length) {
    productTimeline = storeTimeline.map(product => <ProductTimeline product={ product }/>);
  }

  return (
    <div className="products flex flex-column ma3">
      {
        storeTimeline.length ? 
          <div>
            <p>Vota si has vist recentment el producte disponible</p>
          </div>
          : null
      }
      { productTimeline }
    </div>
  )
}

export default ProductsList;