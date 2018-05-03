import React, { Component } from 'react';

class MatchupChart extends Component {

  render() {
    return (
      <div className="bg-black h-16 w-32 flex flex-col relative">
        {this.props.match.rating < 1 && <div className="bg-red-dark border-2 border-solid border-red-light opacity-50" style={{height: 100-this.props.match.rating*100+'%'}}></div>}

        <div className="bg-green-dark border-2 border-solid border-green-light opacity-50" style={{height: this.props.match.rating*100+'%'}}></div>

        <div className="absolute pin-b pin-r p-1">
          {Math.round(this.props.match.rating*100)+'%'}
        </div>
      </div>
    );
  }
}

export default MatchupChart;
