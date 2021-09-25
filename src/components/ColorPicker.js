import React from 'react';
import './ColorPicker.css';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.debouncerID = null;
    const root = document.documentElement;
    root.style.setProperty(this.props.cssVar, this.props.color);

    this.state = { color: this.props.color };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(e) {
    const newValue = e.target.value;
    this.setState({ color: newValue });

    clearTimeout(this.debouncerID);
    this.debouncerID = setTimeout(() => {
      const root = document.documentElement;
      root.style.setProperty(this.props.cssVar, newValue);
    }, 1200);      
  }

  render() {
    return (
      <div className="color-picker">
        <input type="color"
          onChange={this.handleColorChange}
          value={this.state.color}
          title={this.props.title}/> 
      </div>
    )
  }
}

export default ColorPicker;
