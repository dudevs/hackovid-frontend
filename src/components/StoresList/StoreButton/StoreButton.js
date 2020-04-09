import React from 'react';

const StoreButton = ({ store, selectStore }) => {
  return (
    <div className="store ba br-pill w-90 mv2" key={store.id} id={store.id} onClick={ selectStore }>
      <h1 className="mv2">{store.name}</h1>
      <p className="mv2">{store.address} - {store.distance}m</p>
    </div>
  );
}

export default StoreButton;