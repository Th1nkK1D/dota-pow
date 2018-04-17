import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
        <ol>
          { this.state.heroes.map( hero => <li key={hero.id}>{hero.localized_name}</li>)}
        </ol>
      </div>
    );
  }
}

export default App;
