import React from 'react';
import './NumberInput.css';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.debouncerID = null;
    this.state = { value: this.props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newValue = e.target.value;
    this.setState({ value: newValue });

    clearTimeout(this.debouncerID);
    this.debouncerID = setTimeout(() => {
      if (newValue < this.props.min) {
        this.setState({ value: this.props.min});
        this.props.onChange( this.props.min );
      } else if (newValue > this.props.max) {
        this.setState({ value: this.props.max});
        this.props.onChange( this.props.max );
      } else {
        this.props.onChange( e.target.value );
      }
    }, 1000);      
  }

  render() {
    return (
      <div className="number-input-container">
        <label>{this.props.label} <span>{this.props.units || ''}</span></label>
        <input type="number" 
          min={this.props.min} 
          max={this.props.max}
          value={this.state.value}
          onChange={this.handleChange}/>  
      </div>
    )
  }
}

export default NumberInput;
