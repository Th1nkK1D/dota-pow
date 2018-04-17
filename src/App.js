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
      matchups: [undefined,undefined,undefined,undefined,undefined],
      suggestions: []
    };

    this.handleFoeChange = this.handleFoeChange.bind(this)
  }

  componentDidMount() {
    // Get heroes list
    axios.get("https://api.opendota.com/api/heroStats").then(res => {
      this.setState({ heroes: res.data.sort((a,b) => a.localized_name.localeCompare(b.localized_name)) })
    })
  }

  // Handle Foe change
  handleFoeChange(e) {
    const target = e.target

    // Get matchup data
    axios.get("https://api.opendota.com/api/heroes/"+target.value+"/matchups").then(res => {
      // Filter, calculate rating and sort match up
      let matchup = res.data.filter(m => m.games_played >= 5)
        .map(m => {m.rating = 1-m.wins/m.games_played; return m})
        .sort((a,b) => b.rating-a.rating)

      let suggestions = this.state.heroes.map(h => ({id: h.id, sum: 0}))

      // Update state
      this.setState((prev) => {
        prev.foes[target.id] = parseInt(target.value,10)
        prev.matchups[target.id] = matchup

        // Calculate suggestion
        let count = 0

        for (let h = 0; h < this.state.matchups.length; h++) {
          if (this.state.matchups[h] !== undefined) {
            for (let m = 0; m < this.state.matchups[h].length; m++) {
              let target = suggestions.findIndex(s => s.id === this.state.matchups[h][m].hero_id)

              if (target >= 0) {
                suggestions[target].sum += this.state.matchups[h][m].rating
              } else {
                suggestions[target].sum += 0.5
              }
            }

            count++
          }
        }

        return {
          foes: prev.foes,
          matchups: prev.matchups,
          suggestions: suggestions.map(s => ({id: s.id, avg: s.sum/count})).sort((a,b) => b.avg-a.avg).slice(0,5)
        }
      })
    })
  }
  
  render() {
    return (
      <div className="App">
      <h1>Dota^</h1>
      <h3>Opponent Heroes:</h3>
        {
          this.state.foes.map((hero, index) => 
            <HeroSelecter heroes={this.state.heroes} key={index} id={index} value={hero} onChange={this.handleFoeChange}></HeroSelecter>
          )
        }
        <h3>Suggestions:</h3>
        <ol>
        {
          this.state.suggestions.map((hero,hi) => 
            <li key={hero.id}>
              {this.state.heroes.find(h => h.id === hero.id).localized_name} | 
              {this.state.matchups.map((matchup, mi) => 
                <span key={mi}> {
                  matchup !== undefined 
                    ? (matchup.findIndex(m => m.hero_id === hero.id) >= 0
                      ? matchup.find(m => m.hero_id === hero.id).rating
                      : "?"
                    ) 
                    : " "
                } | </span>
              )}
              overall: {hero.avg}
            </li>
          )
        }
        </ol>
      </div>
    );
  }
}

export default App;
