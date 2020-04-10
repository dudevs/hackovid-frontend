import React, { Component } from 'react';
import hash from 'object-hash';
import SearchForm from '../SearchForm/SearchForm';
import StoresList from '../StoresList/StoresList';
import ProductsList from '../ProductsList/ProductsList';
import Loader from '../Loader/Loader';
import { apiCall, handleError } from "../../lib/utils";
import './App.css';

/* eslint-disable */
const storesURL = 'http://www.mocky.io/v2/5e8df4713100002d96429e6c';
const storesURLSlow = 'http://www.mocky.io/v2/5e8df4713100002d96429e6c?mocky-delay=2500ms';
const productsURL = 'http://www.mocky.io/v2/5e8ffe94330000541827d3f4';
const errorFour = 'http://www.mocky.io/v2/5e8fa377330000b31727d286';
const errorFive = 'http://www.mocky.io/v2/5e8f8d16330000741327d22d';
/* eslint-enable */

const initialState = {
  loading: false,
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
    this.setState(initialState);
    const success = (position) => {
      const [ myLat, myLon ] = [ position.coords.latitude, position.coords.longitude ];
      this.setState({
        currentLocation: {
          lat: myLat,
          lon: myLon
        }
      });
      this.searchStores().catch(handleError);
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
  }

  searchStores = async () => {
    if (this.state.currentLocation.lat && this.state.currentLocation.lon) {
      try{
        this.setState({loading: true})
        const stores = await apiCall(storesURLSlow);
        const storesWithId = stores.map(store => {
          store.id = hash(store.address);
          return store;
        })
        this.setState({ nearStores: storesWithId, loading: false });
      }
      catch(err){
        this.setState({ loading: false })
        switch(err) {
          case "400":
            console.log('Error ' + err);
            alert('Hi ha hagut un error, prova-ho més tard');
            break;
          case "500":    
          console.log('Error ' + err);
          alert('El servei no està disponible');
            break;
          default:
            console.log('Error ' + err);
        }
      }
    }
  }

  selectStore = (e) => {
    this.setState({selectedStore : e.currentTarget.id})
    this.getTimeline();
  }

  getTimeline = async () => {
    // const response = await fetch(productsURL);
    // const timeline = await response.json();
    this.setState({ loading: true })
    const timeline = await apiCall(productsURL);
    this.setState({ storeTimeline: timeline, loading: false });
  }

  render() {
    return (
      <div className="App avenir">
        <SearchForm
          geoFindMe={this.geoFindMe} 
          findAddress={this.findAddress} 
          onInputChange={this.onInputChange}
        />
        <Loader loading={this.state.loading}/>
        <StoresList 
          nearStores={this.state.nearStores} 
          selectStore={this.selectStore}
          selectedStore={this.state.selectedStore}
        />
        <ProductsList 
          storeTimeline={this.state.storeTimeline}
        />
      </div>
    );
  }
}

export default App;