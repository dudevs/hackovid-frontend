import React from 'react';
import StoreButton from './StoreButton/StoreButton';
import './StoresList.css';

const StoresList = ({ selectStore, nearStores, selectedStore }) => {
  const store = nearStores.find(store => store.id === selectedStore);
  let storeButton;
  if (selectedStore) {
    storeButton = <StoreButton store={store} selectStore={selectStore}/>
  } else {
    storeButton = nearStores.map(store => <StoreButton store={store} selectStore={selectStore}/>);
  }

  return (
    <div className="stores flex flex-column items-center w-100">
      { storeButton }
    </div>
  );
}

export default StoresList;