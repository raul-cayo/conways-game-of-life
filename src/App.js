import React from 'react';
import './App.css';
import Grid from './components/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      speed: 1000,
      generation: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      onColor: 'indianred',
      offColor: 'black',
      cellSize: 30,
      currentTimer: null,
      isPaused: false
    };

    this.nextGenerationTicker = this.nextGenerationTicker.bind(this);
    this.getNewGeneration = this.getNewGeneration.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handlePausePlayGame = this.handlePausePlayGame.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
    const timerID = setTimeout(this.nextGenerationTicker, this.state.speed);
    this.setState({currentTimer: timerID});
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerID);
  }

  // ----- App Methods ----- //
  nextGenerationTicker() {
    const timerID = setTimeout(this.nextGenerationTicker, this.state.speed);
    this.setState((prevState) => {
      const newGeneration = this.getNewGeneration(prevState.generation);
      return {
        counter: prevState.counter + 1,
        speed: prevState.speed,
        currentTimer: timerID,
        generation: newGeneration,
        isPaused: false
      };
    });
  }

  getNewGeneration(prevGeneration) {
    const newGeneration = [];
    const newGridSize = this.getNewGridSize(this.state.cellSize);
    const prevGenerationAdj = this.getPrevGenerationAdj(prevGeneration, newGridSize);

    for (let y = 0; y < newGridSize.y; y++) {
      newGeneration.push([]);
      for(let x = 0; x < newGridSize.x; x++) {
        // Counting neighbors
        let neighbors = 0;
        if (y > 0) {
          neighbors += prevGenerationAdj[y - 1][x];
          if (x < newGridSize.x - 1) {
            neighbors += prevGenerationAdj[y - 1][x + 1];
          }
          if (x > 0) {
            neighbors += prevGenerationAdj[y - 1][x - 1];
          }
        }
        if (y < newGridSize.y - 1) {
          neighbors += prevGenerationAdj[y + 1][x];
          if (x < newGridSize.x - 1) {
            neighbors += prevGenerationAdj[y + 1][x + 1];
          }
          if (x > 0) {
            neighbors += prevGenerationAdj[y + 1][x - 1];
          }
        }
        if (x > 0) {
          neighbors += prevGenerationAdj[y][x - 1];
        }
        if (x < newGridSize.x - 1) {
          neighbors += prevGenerationAdj[y][x + 1];
        }

        // Creating new generation
        if (neighbors === 3) {
          newGeneration[y][x] = 1;
        } else if (prevGenerationAdj[y][x] && (neighbors === 2 || neighbors === 3)) {
          newGeneration[y][x] = 1;
        } else {
          newGeneration[y][x] = 0;
        }
      }
    }
    return newGeneration;
  }

  getNewGridSize(cellSize) {
    return {
      x: Math.floor(window.innerWidth / cellSize),
      y: Math.floor((window.innerHeight - 101) / cellSize)
    };
  }

  getPrevGenerationAdj(prevGeneration, newGridSize) {
    const yDiff = newGridSize.y - prevGeneration.length;
    const xDiff = newGridSize.x - prevGeneration[0].length;
    const prevGenerationAdj = [...prevGeneration];

    if (xDiff > 0) { // newX > prevX
      const halfDiff = Math.floor(xDiff / 2);
      for (let i = 0; i < prevGeneration.length; i++) {
        for (let j = 0; j < halfDiff; j++) {
          prevGenerationAdj[i].unshift(0);
          prevGenerationAdj[i].push(0);
        }
        if (xDiff % 2) { // Odd
          prevGenerationAdj[i].push(0);
        }
      }
    }
    
    if (xDiff < 0) { // newX < prevX
      const halfDiff = Math.floor(Math.abs(xDiff) / 2);
      for (let i = 0; i < prevGeneration.length; i++) {
        for (let j = 0; j < halfDiff; j++) {
          prevGenerationAdj[i].shift();
          prevGenerationAdj[i].pop();
        }
        if (Math.abs(xDiff) % 2) { // Odd
          prevGenerationAdj[i].pop();
        }
      }
    }

    if (yDiff > 0) {// newY > prevY
      const halfDiff = Math.floor(yDiff / 2);
      const newRow = [];
      for (let i = 0; i < newGridSize.y; i++) {
        newRow.push(0);
      }
      for (let i = 0; i < halfDiff; i++) {
        prevGenerationAdj.unshift(newRow);
        prevGenerationAdj.push(newRow);
      }
      if (yDiff % 2) { // Odd
        prevGenerationAdj.push(newRow);
      }
    }

    if (yDiff < 0) {// newY < prevY
      const halfDiff = Math.floor(Math.abs(yDiff) / 2);
      for (let i = 0; i < halfDiff; i++) {
        prevGenerationAdj.shift();
        prevGenerationAdj.pop();
      }
      if (Math.abs(yDiff) % 2) { // Odd
        prevGenerationAdj.pop();
      }
    }
    return prevGenerationAdj;
  }

  // Handlers
  handleSpeedChange(e) {
    this.setState({speed: e.target.value});
  }

  handlePausePlayGame(e) {
    if (this.state.isPaused) {
      this.nextGenerationTicker();
    } else {
      clearTimeout(this.state.currentTimer);
      this.setState({
          isPaused: true,
          currentTimer: null
      });
    }
  }

  // handleCellClick(e) {
  //   console.log(e.target);
  // }

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
            <button type="button"
              className="btn btn-primary"
              onClick={this.handlePausePlayGame}>
              {this.state.isPaused ? 'Play' : 'Pause'}
            </button>
          </div>
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
