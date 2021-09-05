import React from 'react';
import './App.css';
import Grid from './components/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      speed: 1000,
      generation: [0, 1, 0, 1, 1, 0],
      onColor: 'indianred',
      offColor: 'black',
      cellSize: '70px',
      currentTimer: null
    };

    this.nextGeneration = this.nextGeneration.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
    const timerID = setTimeout(this.nextGeneration, this.state.speed);
    this.setState({currentTimer: timerID});
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerID);
  }

  // ----- App Methods ----- //
  nextGeneration() {
    const timerID = setTimeout(this.nextGeneration, this.state.speed);
    this.setState((prevState) => {
      const newGeneration = prevState.generation.map(cellState => !cellState);
      return {
        counter: prevState.counter + 1,
        speed: prevState.speed,
        currentTimer: timerID,
        generation: newGeneration
      };
    });
  }

  handleSpeedChange(e) {
    this.setState({speed: e.target.value});
  }

  // ----- Render ----- //
  render() {
    return (
      <div className="app-container">
        <div className="grid-container">
          <Grid generation={this.state.generation} 
            onColor={this.state.onColor}
            offColor={this.state.offColor}
            cellSize={this.state.cellSize}/>
        </div>
        <div className="controls-container">
          <input type="number"
            value={this.state.speed}
            onChange={this.handleSpeedChange}/>
          <p>{this.state.counter}</p>
        </div>
      </div>
    );
  }
}

export default App;
