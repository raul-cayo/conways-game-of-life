import React from 'react';
import Cell from './Cell';

class Grid extends React.Component {
  render() {
    return this.props.generation.map((cellState) => 
      <Cell
        isOn={cellState}
        onColor={this.props.onColor}
        offColor={this.props.offColor}
        size={this.props.cellSize}/>
    );
  }
}

export default Grid;