import React from 'react';
import ProductTimeline from './ProductTimeline/ProductTimeline';
import { Fragment } from 'react';
import './ProductsList.css';
import { baseProducts } from './baseProducts';


const ProductsList = ({ state, getTimeline, BASE_ENDPOINT }) => {

  let productTimeline;
  let comment;

  if(state.selectedStore && state.storeTimeline.length) {
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