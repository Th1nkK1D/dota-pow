import React, { Component } from 'react';

class HeroSuggest extends Component {

  render() {
    return (
      <div className="bg-black h-16 flex">
        <div className="w-32 bg-black bg-cover bg-center flex"
          style={{
            backgroundImage: this.props.hero ? 'url(https://api.opendota.com'+this.props.hero.img+')' : 'none',
            backgroundBlendMode: 'color-dodge'
          }}>
          <div className="self-end p-1">{this.props.hero.localized_name}</div>
        </div>
        {this.props.matchups.map(match => match !== undefined ? <div>{match.rating}</div> : <div>?</div>)}
      </div>
    );
  }
}

export default HeroSuggest;
