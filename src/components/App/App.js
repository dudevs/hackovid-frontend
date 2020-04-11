import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import StoresList from '../StoresList/StoresList';
import ProductsList from '../ProductsList/ProductsList';
import Loader from '../Loader/Loader';
import { apiCall, handleError } from "../../lib/utils";
import './App.css';

/* eslint-disable */
const storesURLold = 'http://www.mocky.io/v2/5e8df4713100002d96429e6c';
const storesURL = 'http://www.mocky.io/v2/5e915f363300009200e9ce67';
const storesURLSlow = 'http://www.mocky.io/v2/5e8df4713100002d96429e6c?mocky-delay=2500ms';
const productsURLold = 'http://www.mocky.io/v2/5e8ffe94330000541827d3f4';
const productsURL = 'http://www.mocky.io/v2/5e916ba83300001455e9ce8c';
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
      const baseEndpoint = 'https://localhost:5001/api/supermarket/bylocation?';
      const url = `${baseEndpoint}lat=${myLat}&lon=${myLon}`;
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
    const baseEndpoint = 'https://localhost:5001/api/supermarket/byaddress?address=';
    const url = `${baseEndpoint}${encodeURI(this.state.input)}`;
    this.searchStores(url).catch(handleError);
  }

  searchStores = async (url) => {
    console.log(url);
    try{
      this.setState({loading: true})
      const stores = await apiCall(storesURL); // canviar per url
      this.setState({ nearStores: stores, loading: false });
    } catch(err){
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

  selectStore = async (e) => {
    await this.setState({selectedStore : e.currentTarget.id});
    this.getTimeline(productsURL);
  }

  getTimeline = async (caca) => {
    const baseEndpoint = "https://localhost:5001/api/supermarket/";
    const url = `${baseEndpoint}${this.state.selectedStore}`;
    console.log(url);
    try{
      this.setState({ loading: true })
      const timeline = await apiCall(caca);
      this.setState({ storeTimeline: timeline, loading: false });
    } catch(err){
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
    };
  }

  fesho = () => {
    this.setState({loading: true});
  }

  render() {
    return (
      <div className="App">
        {/* <button onClick={this.fesho} >fesho</button> */}
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
        />
      </div>
    );
  }
}

export default App;