import React from 'react';
import { Fragment } from 'react';
import './Loader.css';

const Loader = ({ loading }) => {

  let myLoader;

  if(loading) {
    myLoader = <Fragment>
    <div className="my-loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    </Fragment>;
  }

  return (
    <div>
      { myLoader }
    </div>
  );
}

export default Loader;