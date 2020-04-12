import React from 'react';
import './SearchForm.css';

const SearchForm = ({ geoFindMe, findAddress, onInputChange }) => {



  return (
    <form className="search-form">
      <div className="search-address">
        <input
          type="text" 
          placeholder="Adreça"
          onChange={ onInputChange }
          onSubmit={ findAddress }
        ></input>
        <button
          className="address"
          onClick={ findAddress }
        >Buscar</button>
        <input type="submit" onSubmit={ findAddress } hidden/>
      </div>
      <button
        className="locate"
        onClick={ geoFindMe }
      >Localitza'm</button>
    </form>
  );
}

export default SearchForm;