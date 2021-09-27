import React from 'react';

class Cell extends React.Component {
  render() {
    const cellStyle = {
      height: this.props.size,
      width: this.props.size
    };

    return (
      <div className={this.props.isOn ? 'cell cell-on' : 'cell cell-off'}
        onClick={this.props.onClick}
        style={cellStyle}></div>
    );
  }
}

export default Cell;
