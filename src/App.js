import React from 'react';
import './App.css';
import Grid from './components/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      speed: 1000,
      xSize: 9,
      ySize: 9,
      generation: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
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
      const newGeneration = [];
      for (let y = 0; y < this.state.ySize; y++) {
        newGeneration.push([]);
        for(let x = 0; x < this.state.xSize; x++) {
          let neighbors = 0;
          if (y > 0) {
            neighbors += prevState.generation[y - 1][x];
            if (x < this.state.xSize - 1) {
              neighbors += prevState.generation[y - 1][x + 1];
            }
            if (x > 0) {
              neighbors += prevState.generation[y - 1][x - 1];
            }
          }
          if (y < this.state.ySize - 1) {
            neighbors += prevState.generation[y + 1][x];
            if (x < this.state.xSize - 1) {
              neighbors += prevState.generation[y + 1][x + 1];
            }
            if (x > 0) {
              neighbors += prevState.generation[y + 1][x - 1];
            }
          }
          if (x > 0) {
            neighbors += prevState.generation[y][x - 1];
          }
          if (x < this.state.xSize - 1) {
            neighbors += prevState.generation[y][x + 1];
          }

          // Creating new generation
          if (neighbors === 3) {
            newGeneration[y][x] = 1;
          } else if (prevState.generation[y][x] && (neighbors === 2 || neighbors === 3)) {
            newGeneration[y][x] = 1;
          } else {
            newGeneration[y][x] = 0;
          }
        }
      }

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
          <div className="control">
            <p>Speed</p>
            <input type="number"
              value={this.state.speed}
              onChange={this.handleSpeedChange}/>
          </div>
          <div className="control">
            <p>Counter</p>
            <p>{this.state.counter}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
