import React from 'react';
import './SearchForm.css';

const SearchForm = ({ geoFindMe, findAddress, onInputChange }) => {



  return (
    <form className="search-form">
      <input
        className="search-input"
        type="text" 
        placeholder="Adreça"
        onChange={ onInputChange }
        onSubmit={ findAddress }
      ></input>
      <div className="w-100">
        <button
          className="search-button"
          onClick={ findAddress }
        >Buscar adreça</button>
        <button
          className="search-button"
          onClick={ geoFindMe }
        >Localitza'm</button>
        <input type="submit" onSubmit={ findAddress } hidden/>
      </div>
      

    </form>
  );
}

export default SearchForm;