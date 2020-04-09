import React from 'react';

const SearchForm = ({ geoFindMe, findAddress, onInputChange }) => {



  return (
    <form className="search-form pa3 flex flex-column items-center">
      <input
        className="h2 br3 bw1 pa2 w-100"
        type="text" 
        placeholder="Adreça"
        onChange={ onInputChange }
        onSubmit={ findAddress }
      ></input>
      <div className="w-100">
        <button
          className="bw0 br2 bg-blue pv2 white fw1 ttu mv2 w-40 mh2"
          onClick={ findAddress }
        >Buscar adreça</button>
        <button
          className="bw0 br2 bg-blue pv2 white fw1 ttu mv2 w-40 mh2"
          onClick={ geoFindMe }
        >Localitza'm</button>
        <input type="submit" onSubmit={ findAddress } hidden/>
      </div>
      

    </form>
  );
}

export default SearchForm;