import React, { Component } from 'react';

class HeroSelecter extends Component {
  state = {
    selectedHero: undefined,
  }

  render() {
    return (
      <div className="bg-black bg-cover bg-center h-16 flex shadow"
        style={{
          backgroundImage: this.props.value ? 'url(https://api.opendota.com'+this.props.heroes.find(h => h.id === this.props.value).img+')' : 'none',
          backgroundBlendMode: 'color-dodge'
        }}>      
        <select className="bg-transparent text-white flex-1 self-end w-32" name="herolist" id={this.props.id} onChange={this.props.onChange}>
          <option value={undefined}>-</option>
          {this.props.heroes.map(hero => <option key={hero.id} value={hero.id}>{hero.localized_name}</option>)}
        </select>
      </div>
    );
  }
}

export default HeroSelecter;
