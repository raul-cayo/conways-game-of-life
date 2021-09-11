import React from 'react';
import Cell from './Cell';

class Grid extends React.Component {
  render() {
    const rows = this.props.generation.map((row, rowIndex) => {
      const cells = row.map((cellState, cellIndex) =>
        <Cell
          key={cellIndex}
          isOn={cellState}
          onColor={this.props.onColor}
          offColor={this.props.offColor}
          size={this.props.cellSize + 'px'}
          onClick={() => this.props.cellClickHandler(cellIndex, rowIndex)}/>
      );
      return <div className="grid-row" key={rowIndex}>{cells}</div>;
    });

    return <div className="grid">{rows}</div>;
  }
}

export default Grid;