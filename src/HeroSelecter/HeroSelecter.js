import React, { Component } from 'react';
import './HeroSelecter.css';

class HeroSelecter extends Component {
  state = {
    selectedHero: undefined,
  }

  render() {
    return (
      <div className="hero-selecter bg-black bg-cover h-24 flex"
        style={{
          'background-image': this.props.value ? 'url(https://api.opendota.com'+this.props.heroes.find(h => h.id === this.props.value).img+')' : 'none',
          'background-blend-mode': 'color-dodge'
        }}>      
        <select className="bg-transparent text-white flex-1 self-end" name="herolist" id={this.props.id} onChange={this.props.onChange}>
          <option value={undefined}>-</option>
          {this.props.heroes.map(hero => <option key={hero.id} value={hero.id}>{hero.localized_name}</option>)}
        </select>
      </div>
    );
  }
}

export default HeroSelecter;
