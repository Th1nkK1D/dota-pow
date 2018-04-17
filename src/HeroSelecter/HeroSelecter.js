import React, { Component } from 'react';
import './HeroSelecter.css';

class HeroSelecter extends Component {
  state = {
    selectedHero: undefined,
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({selectedHero: e.target.value})
  }

  render() {
    return (
      <div className="hero-selecter">
        {this.state.selectedHero && this.state.selectedHero}
        <br/>
        <select name="herolist" onChange={this.handleChange}>
          {this.props.heroes.map(hero => <option key={hero.id} value={hero.id}>{hero.localized_name}</option>)}
        </select>
      </div>
    );
  }
}

export default HeroSelecter;
