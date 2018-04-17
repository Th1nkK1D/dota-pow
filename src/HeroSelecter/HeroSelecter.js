import React, { Component } from 'react';
import './HeroSelecter.css';

class HeroSelecter extends Component {
  state = {
    selectedHero: undefined,
  }

  render() {
    return (
      <div className="hero-selecter">
        {/* {this.props.value && this.props.heroes.find(h => h.id === this.props.value).localized_name}
        <br/> */}
        <select name="herolist" id={this.props.id} onChange={this.props.onChange}>
          <option value={undefined}>-</option>
          {this.props.heroes.map(hero => <option key={hero.id} value={hero.id}>{hero.localized_name}</option>)}
        </select>
      </div>
    );
  }
}

export default HeroSelecter;
