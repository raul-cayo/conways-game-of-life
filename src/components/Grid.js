import React from 'react';
import Cell from './Cell';

class Grid extends React.Component {
  render() {
    const rows = this.props.generation.map((row) => {
      const cells = row.map((cellState) =>
        <Cell
          isOn={cellState}
          onColor={this.props.onColor}
          offColor={this.props.offColor}
          size={this.props.cellSize}/>
      );
      return <div className="grid-row">{cells}</div>;
    });

    return <div className="grid">{rows}</div>;
  }
}

export default Grid;