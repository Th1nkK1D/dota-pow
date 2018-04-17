import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import HeroSelecter from './HeroSelecter/HeroSelecter';

class App extends Component {
  constructor() {
    super()

    this.state = {
      heroes: [],
      allies: [undefined,undefined,undefined,undefined,undefined]
    };

    this.handleHeroChange = this.handleHeroChange.bind(this)
  }

  componentDidMount() {
    axios.get("https://api.opendota.com/api/heroStats").then(res => {
      this.setState({ heroes: res.data });
    })
  }

  handleHeroChange(e) {
    const target = e.target
    this.setState((prev) => {
      prev.allies[target.id] = parseInt(target.value,10)
      return prev 
    })
  }
  
  render() {
    return (
      <div className="App">
        <ol>
        {this.state.allies.map((value,index) => 
         <li key={index}>{value}</li>
        )}
        </ol>
        {this.state.allies.map((value, index) => 
          <HeroSelecter heroes={this.state.heroes} key={index} id={index} value={value} onChange={this.handleHeroChange}></HeroSelecter>
        )}
      </div>
    );
  }
}

export default App;
