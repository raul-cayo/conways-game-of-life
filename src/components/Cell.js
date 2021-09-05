import React from 'react';

class Cell extends React.Component {
  render() {
    const cellStyle = {
      backgroundColor: this.props.isOn ? this.props.onColor : this.props.offColor,
      height: this.props.size,
      width: this.props.size
    };

    return <div style={cellStyle}></div>;
  }
}

export default Cell;