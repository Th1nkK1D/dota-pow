import React, { Component } from 'react';
import MatchupChart from './MatchupChart';

class HeroSuggest extends Component {

  render() {
    return (
      <div className="bg-black h-16 my-1 flex shadow">
        <div className="w-32 bg-black bg-cover bg-center relative"
          style={{
            backgroundImage: this.props.hero ? 'url(https://api.opendota.com'+this.props.hero.img+')' : 'none',
            backgroundBlendMode: 'color-dodge'
          }}>
          <div className="absolute p-1">{Math.round(this.props.overall*100)}%</div>
          <div className="absolute pin-b p-1 truncate">{this.props.hero.localized_name}</div>
        </div>
        {this.props.matchups.map(match => match !== undefined ? <MatchupChart match={match}></MatchupChart> : <div className="h-16 w-32"></div>)}
      </div>
    );
  }
}

export default HeroSuggest;
