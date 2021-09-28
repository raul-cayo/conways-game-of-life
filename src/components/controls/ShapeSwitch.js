import React from 'react';
import { withTranslation } from 'react-i18next';
import './ShapeSwitch.css';

class ShapeSwitch extends React.Component {
  constructor(props) {
    super(props);
    const root = document.documentElement;
    root.style.setProperty('--cell-border-radius', 0);
  }

  handleClickSquare() {
    const circles = document.querySelectorAll('.shape.circle');
    const squares = document.querySelectorAll('.shape.square');
    const root = document.documentElement;

    for (const circle of circles) {
      circle.classList.remove('shape-selected');
    }
    for (const square of squares) {
      square.classList.add('shape-selected');
    }
    root.style.setProperty('--cell-border-radius', 0);
  }

  handleClickCircle() {
    const circles = document.querySelectorAll('.shape.circle');
    const squares = document.querySelectorAll('.shape.square');
    const root = document.documentElement;

    for (const circle of circles) {
      circle.classList.add('shape-selected');
    }
    for (const square of squares) {
      square.classList.remove('shape-selected');
    }
    root.style.setProperty('--cell-border-radius', '50%');
  }

  render() {
    const { t } = this.props;
    return (
      <div className="shape-switch-container">
        <div className="shape square shape-selected" 
          onClick={this.handleClickSquare}
          title={t("controls.tooltips.square_shape")}>
        </div>
        <div className="shape circle"
          onClick={this.handleClickCircle}
          title={t("controls.tooltips.circle_shape")}>
        </div>
      </div>
    )
  }
}

export default withTranslation()(ShapeSwitch);