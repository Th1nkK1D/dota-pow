import React, { Component } from 'react';
import axios from 'axios';

import HeroSelecter from './HeroSelecter';
import HeroSuggest from './HeroSuggest';

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

  getSuggestions(matchup) {
    if (matchup.findIndex(m => m) >= 0) {
      let suggestions = this.state.heroes.map(h => ({id: h.id, sum: 0}))

      // Calculate suggestion
      let count = 0

      for (let h = 0; h < matchup.length; h++) {
        if (matchup[h] !== undefined) {
          for (let m = 0; m < matchup[h].length; m++) {
            let target = suggestions.findIndex(s => s.id === matchup[h][m].hero_id)

            if (target >= 0) {
              suggestions[target].sum += matchup[h][m].rating
            } else {
              suggestions[target].sum += 0.5
            }
          }

          count++
        }
      }

      return suggestions.map(s => ({id: s.id, avg: s.sum/count})).sort((a,b) => b.avg-a.avg).slice(0,8)
    } else {
      return []
    }
  
  }

  // Handle Foe change
  handleFoeChange(e) {
    const target = e.target

    if (target.value !== '-') {
      // Get matchup data
      axios.get("https://api.opendota.com/api/heroes/"+target.value+"/matchups").then(res => {
        // Filter, calculate rating and sort match up
        let matchup = res.data.filter(m => m.games_played >= 5)
          .map(m => {m.rating = 1-m.wins/m.games_played; return m})
          .sort((a,b) => b.rating-a.rating)


        // Update state
        this.setState(prev => {
          prev.foes[target.id] = parseInt(target.value,10)
          prev.matchups[target.id] = matchup

          return {
            foes: prev.foes,
            matchups: prev.matchups,
            suggestions: this.getSuggestions(prev.matchups)
          }
        })
      })
    } else {
      // remove data
      this.setState(prev => {
        prev.foes[target.id] = undefined
        prev.matchups[target.id] = undefined

        return {
          foes: prev.foes,
          matchups: prev.matchups,
          suggestions: this.getSuggestions(prev.matchups)
        }
      })
    }
  }
  
  render() {
    return (
      <div className="container mx-auto text-center flex flex-col justify-center">
        <div className="flex-1 py-4">
          <h1 className="text-red-light font-light" style={{fontSize: '5em'}}>DOTA^</h1>
          <h3 className="text-red-light text-sm">dota-pow : Dota 2 picking assistance</h3>
        </div>
        <div className="flex-1 py-2 flex flex-row justify-center">
          <div className="w-32 flex flex-col relative diag text-sm text-grey">
            <div className="absolute pin-t pin-r p-1">Enermy pick</div>
            <div className="absolute pin-b pin-l p-1">Suggestion</div>
          </div>
          {
            this.state.foes.map((hero, index) => 
              <HeroSelecter className="flex-1" heroes={this.state.heroes} key={index} id={index} value={hero} onChange={this.handleFoeChange}></HeroSelecter>
            )
          }
        </div>
        <div className="flex-1 flex flex-col m-auto" style={{width: '48rem'}}>
          {
            this.state.suggestions.map(hero => 
              <HeroSuggest 
                key={hero.id} 
                hero={this.state.heroes.find(h => h.id === hero.id)} 
                matchups={this.state.matchups.map(matchup => matchup ? matchup.find(m => m.hero_id === hero.id) : undefined)}
                overall={hero.avg}>
              </HeroSuggest>
            )
          }
          
        </div>
      </div>
    );
  }
}

export default App;
