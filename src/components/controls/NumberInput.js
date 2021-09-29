import React from 'react';
import './NumberInput.css';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.debouncerID = null;
    this.state = { value: this.props.value };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
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

  handlePlus() {
    this.setState((prevState) => {
      let newValue = prevState.value + this.props.step;
      if (prevState.value + this.props.step > this.props.max) {
        newValue = this.props.max;
      }
      return { value: newValue };
    });

    clearTimeout(this.debouncerID);
    this.debouncerID = setTimeout(() => {
        this.props.onChange( this.state.value );
    }, 500); 
  }

  handleMinus() {
    this.setState((prevState) => {
      let newValue = prevState.value - this.props.step;
      if (prevState.value - this.props.step < this.props.min) {
        newValue = this.props.min;
      }
      return { value: newValue };
    });

    clearTimeout(this.debouncerID);
    this.debouncerID = setTimeout(() => {
        this.props.onChange( this.state.value );
    }, 500); 
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
        <button className="number-input-btn plus-btn"
          onClick={this.handlePlus}
          disabled={this.state.value >= this.props.max}>
          <span className="material-icons">add</span>
        </button>
        <button className="number-input-btn minus-btn"
          onClick={this.handleMinus}
          disabled={this.state.value <= this.props.min}>
          <span className="material-icons">remove</span>
        </button>
      </div>
    )
  }
}

export default NumberInput;
