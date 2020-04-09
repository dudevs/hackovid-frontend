import React, { Component } from 'react';
import hash from 'object-hash';
import SearchForm from '../SearchForm/SearchForm';
import StoresList from '../StoresList/StoresList';
import ProductsList from '../ProductsList/ProductsList';
import './App.css';

// COMPONENTS:
// buscador adreça
// boto supermercat
// TODO boto informacio/producte
// TODO timeline
// TODO boto per afegir valoracio

const storesURL = 'http://www.mocky.io/v2/5e8df4713100002d96429e6c';
// const storesURL = 'http://www.mocky.io/v2/5e8bdc832f00002b0088c584';
// const storesURL = 'http://www.mocky.io/v2/5e8be3192f0000720088c59a';

const productsURL = 'http://www.mocky.io/v2/5e8ce4253100002719429590';

const initialState = {
  input: '',
  currentLocation: {
    lat: '',
    lon: ''
  },
  nearStores: [],
  selectedStore: '',
  storeTimeline: []
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  geoFindMe = (e) => {
    e.preventDefault();
    const success = (position) => {
      const [ myLat, myLon ] = [ position.coords.latitude, position.coords.longitude ];
      this.setState({
        currentLocation: {
          lat: myLat,
          lon: myLon
        },
        selectedStore: '',
        storeTimeline: ''
      });
      this.searchStores();
    }

    const error = (err) => console.log(err);

    if(!navigator.geolocation) {
      alert('No tens activada la geolocalitzacio');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  findAddress = (e) => {
    e.preventDefault();
    if(!this.state.input) return;
    this.geoFindMe(e);
    // const newSearch = this.state.input.replace(' ', '+');
    // window.open(`https://www.google.com/maps/search/${newSearch}`)
  }

  searchStores = async () => {
    if (this.state.currentLocation.lat && this.state.currentLocation.lon) {
      const response = await fetch(storesURL);
      const stores = await response.json();
      const storesWithId = stores.map(store => {
        // const regex = /c\/|carrer|\s/gi
        // const address = store.address.replace(regex, '').toLowerCase().replace(/,/g, '_');
        store.id = hash(store.address);
        return store;
      })
      this.setState({ nearStores: storesWithId });
    }
  }

  selectStore = (e) => {
    this.setState({selectedStore : e.currentTarget.id})
    this.getTimeline();
  }

  getTimeline = async () => {
    const response = await fetch(productsURL);
    const timeline = await response.json();
    this.setState({ storeTimeline: timeline });
  }

  render() {
    return (
      <div className="App avenir">
        <SearchForm geoFindMe={this.geoFindMe} findAddress={this.findAddress} onInputChange={this.onInputChange}></SearchForm>
        <StoresList 
        nearStores={this.state.nearStores} 
        selectStore={this.selectStore}
        selectedStore={this.state.selectedStore}
        />
        <ProductsList 
          selectedStore={this.state.selectedStore}
          storeTimeline={this.state.storeTimeline}
        />
      </div>
    );
  }
}

export default App;