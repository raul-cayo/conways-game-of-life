import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      speed: 1000,
      currentTimer: null
    };

    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
    const timerID = setTimeout(
      () => this.nextGeneration(),
      this.state.speed
    );

    this.setState({
      currentTimer: timerID
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerID);
  }

  // ----- App Methods ----- //
  nextGeneration() {
    const timerID = setTimeout(
      () => this.nextGeneration(),
      this.state.speed
    );

    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      speed: prevState.speed,
      currentTimer: timerID
    }));
  }

  handleSpeedChange(e) {
    this.setState({speed: e.target.value});
  }

  // ----- Render ----- //
  render() {
    return (
      <div className="app-container">
        <p>Building Conway's Game Of Life</p>
        <p>{this.state.counter}</p>
        <p>Speed:</p>
        <input type="number"
          value={this.state.speed}
          onChange={this.handleSpeedChange}
        />
      </div>
    );
  }
}

export default App;
