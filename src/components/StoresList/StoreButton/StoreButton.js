import React from 'react';

const StoreButton = ({ store, selectStore }) => {
  return (
    <div className="store" key={store.id} id={store.id} onClick={ selectStore }>
      <h1>{store.name}</h1>
      <h3>{store.address} <span>{store.distance}m</span></h3>
    </div>
  );
}

export default StoreButton;