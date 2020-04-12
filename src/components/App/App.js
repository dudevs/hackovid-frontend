import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import StoresList from '../StoresList/StoresList';
import ProductsList from '../ProductsList/ProductsList';
import Loader from '../Loader/Loader';
import { apiCall, handleError } from "../../lib/utils";
import './App.css';

const BASE_ENDPOINT = 'http://dispocat.sytes.net:4001/api';

const initialState = {
  loading: false,
  input: '',
  currentLocation: {
    lat: '',
    lon: ''
  },
  nearStores: [],
  selectedStore: '',
  storeTimeline: [],
  options: {
    TIMELINE_SPLIT_COUNT: 48,
    MINUTES_PER_PIECE: 5
  }
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
      const url = `${BASE_ENDPOINT}/supermarket/bylocation?lat=${myLat}&lon=${myLon}`;
      this.searchStores(url).catch(handleError);
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
    const search = document.querySelector('.search-input');
    search.value = '';
    if(!this.state.input) return;
    if(this.state.input === 'rickroll') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      return;
    };
    const url = `${BASE_ENDPOINT}/supermarket/byaddress?address=${encodeURI(this.state.input)}`;
    this.searchStores(url).catch(handleError);
  }

  searchStores = async (url) => {
    try{
      this.setState({loading: true})
      const stores = await apiCall(url, "GET");
      this.setState({ nearStores: stores, loading: false });
    } catch(err){
      this.setState({ loading: false })
      handleError(err);
    }
  }

  selectStore = async (e) => {
    await this.setState({selectedStore : e.currentTarget.id});
    this.getTimeline().catch(handleError);
  }

  getTimeline = async () => {
    const url = `${BASE_ENDPOINT}/supermarket/${this.state.selectedStore}`;
    try{
      this.setState({ loading: true })
      const timeline = await apiCall(url, "GET");
      this.setState({ storeTimeline: timeline, loading: false });
    } catch(err){
      this.setState({ loading: false })
      handleError(err);
    };
  }

  render() {
    return (
      <div className="App">
        <div className="limit-width">
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
            state={this.state}
            getTimeline={this.getTimeline}
            BASE_ENDPOINT={BASE_ENDPOINT}
          />
        </div>
      </div>
    );
  }
}

export default App;