import React from 'react';
import './ShapeSwitch.css';

class ShapeSwitch extends React.Component {
  constructor(props) {
    super(props);
    const root = document.documentElement;
    root.style.setProperty('--cell-border-radius', '50%');
  }

  handleClickSquare() {
    const circle = document.querySelector('.shape.circle');
    const square = document.querySelector('.shape.square');
    const root = document.documentElement;

    circle.classList.remove('shape-selected');
    square.classList.add('shape-selected');
    root.style.setProperty('--cell-border-radius', 0);

  }

  handleClickCircle() {
    const circle = document.querySelector('.shape.circle');
    const square = document.querySelector('.shape.square');
    const root = document.documentElement;

    square.classList.remove('shape-selected');
    circle.classList.add('shape-selected');
    root.style.setProperty('--cell-border-radius', '50%');
  }

  render() {
    return (
      <div className="shape-switch-container">
        <div className="shape square shape-selected" onClick={this.handleClickSquare}></div>
        <div className="shape circle" onClick={this.handleClickCircle}></div>
      </div>
    )
  }
}

export default ShapeSwitch;