import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import HeroSelecter from './HeroSelecter/HeroSelecter';

class App extends Component {
  state = {
    heroes: []
  };

  componentDidMount() {
    axios.get("https://api.opendota.com/api/heroStats").then(res => {
      this.setState({ heroes: res.data });
    })
  }
  
  render() {
    return (
      <div className="App">
        <HeroSelecter></HeroSelecter>
      </div>
    );
  }
}

export default App;
