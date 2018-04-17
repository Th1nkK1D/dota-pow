import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import HeroSelecter from './HeroSelecter/HeroSelecter';

class App extends Component {
  constructor() {
    super()

    this.state = {
      heroes: [],
      foes: [undefined,undefined,undefined,undefined,undefined],
      matchup: [undefined,undefined,undefined,undefined,undefined]
    };

    this.handleFoeChange = this.handleFoeChange.bind(this)
  }

  componentDidMount() {
    // Get heroes list
    axios.get("https://api.opendota.com/api/heroStats").then(res => {
      this.setState({ heroes: res.data })
    })
  }

  // Handle Foe change
  handleFoeChange(e) {
    const target = e.target

    // Get matchup data
    axios.get("https://api.opendota.com/api/heroes/"+target.value+"/matchups").then(res => {
      // Update state
      this.setState((prev) => {
        prev.foes[target.id] = parseInt(target.value,10)
        prev.matchup[target.id] = res.data

        console.log(prev)

        return {
          foes: prev.foes,
          matchup: prev.matchup
        }
      })
    })
  }
  
  render() {
    return (
      <div className="App">
        <ol>
        {
          this.state.foes.map((hero,index) => 
            <li key={index}>{hero}</li>
          )
        }
        </ol>
        {
          this.state.foes.map((hero, index) => 
            <HeroSelecter heroes={this.state.heroes} key={index} id={index} value={hero} onChange={this.handleFoeChange}></HeroSelecter>
          )
        }
      </div>
    );
  }
}

export default App;
