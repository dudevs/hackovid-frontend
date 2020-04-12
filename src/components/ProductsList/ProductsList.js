import React from 'react';
import ProductTimeline from './ProductTimeline/ProductTimeline';
import { Fragment } from 'react';
import './ProductsList.css';
import { baseProducts } from '../../lib/baseProducts';


const ProductsList = ({ state, getTimeline, BASE_ENDPOINT }) => {

  let productTimeline;
  let comment;

  // check if there is a selected store and a timeline received from the database
  if(state.selectedStore) {

    // create a ProductTimeline component for each of our products using an empty timeline from src/lib/baseProducts.js
    productTimeline = baseProducts.map(baseProduct => {
      const [ dbProduct ] = state.storeTimeline.filter(store => store.item === baseProduct.item);

      return <ProductTimeline
      key={baseProduct.item}
      baseProduct={ baseProduct }
      dbProduct={ dbProduct }
      state={ state }
      getTimeline={getTimeline}
      BASE_ENDPOINT={BASE_ENDPOINT}
      />
    });

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