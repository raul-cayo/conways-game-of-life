import React from 'react';
import Grid from './components/Grid';
import {getLexiconByName, getRandomLexiconExample} from './util/lexicon';
import './reset.css';
import './App.css';
import PlantImage from './images/plant.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      tempo: 1000,
      generation: getLexiconByName("Kok's galaxy").grid,
      onColor: '#40BB6C',
      offColor: '#404040',
      cellSize: 30,
      currentTimer: null,
      isPaused: false
    };

    this.nextGenerationTicker = this.nextGenerationTicker.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleCellSizeChange = this.handleCellSizeChange.bind(this);
    this.handleOffColorChange = this.handleOffColorChange.bind(this);
    this.handleOnColorChange = this.handleOnColorChange.bind(this);
    this.handleRandomLexicon = this.handleRandomLexicon.bind(this);
    this.handlePausePlayGame = this.handlePausePlayGame.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handlePlantClick = this.handlePlantClick.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
    const timerID = setTimeout(this.nextGenerationTicker, this.state.tempo);
    this.setState({ currentTimer: timerID });
  }

  componentWillUnmount() {
    clearTimeout(this.state.currentTimer);
  }

  // ----- App Methods ----- //
  nextGenerationTicker() {
    const timerID = setTimeout(this.nextGenerationTicker, this.state.tempo);
    this.setState((prevState) => {
      const newGeneration = this.getNewGeneration(prevState.generation);
      return {
        counter: prevState.counter + 1,
        tempo: prevState.tempo,
        currentTimer: timerID,
        generation: newGeneration,
        isPaused: false
      };
    });
  }

  getNewGeneration(prevGeneration) {
    const newGeneration = [];
    const newGridSize = this.getNewGridSize(this.state.cellSize);
    const adjustedPrevGeneration = this.getAdjustedGenerationSize(prevGeneration, newGridSize);

    for (let row = 0; row < newGridSize.rows; row++) {
      newGeneration.push([]);
      for (let column = 0; column < newGridSize.columns; column++) {
        const neighbors = this.countNeighbors(adjustedPrevGeneration, row, column);
        if (neighbors === 3) {
          newGeneration[row][column] = 1;
        } else if (adjustedPrevGeneration[row][column] && neighbors === 2) {
          newGeneration[row][column] = 1;
        } else {
          newGeneration[row][column] = 0;
        }
      }
    }
    return newGeneration;
  }

  getNewGridSize(cellSize) {
    return {
      columns: Math.floor(window.innerWidth / cellSize),
      rows: Math.floor((window.innerHeight - 101) / cellSize)
    };
  }

  getAdjustedGenerationSize(prevGeneration, newGridSize) {
    const rowsDiff = newGridSize.rows - prevGeneration.length;
    const columnsDiff = newGridSize.columns - prevGeneration[0].length;
    const adjustedPrevGeneration = [];
    for (const row of prevGeneration) {
      adjustedPrevGeneration.push([...row]);
    }

    if (columnsDiff > 0) { // newColumnsLength > prevColumnsLength
      const halfDiff = Math.floor(columnsDiff / 2);
      for (let row = 0; row < prevGeneration.length; row++) {
        for (let i = 0; i < halfDiff; i++) {
          adjustedPrevGeneration[row].unshift(0);
          adjustedPrevGeneration[row].push(0);
        }
        if (columnsDiff % 2) {
          adjustedPrevGeneration[row].push(0);
        }
      }
    }
    if (columnsDiff < 0) { // newColumnsLength < prevColumnsLength
      const halfDiff = Math.floor(Math.abs(columnsDiff) / 2);
      for (let row = 0; row < prevGeneration.length; row++) {
        for (let i = 0; i < halfDiff; i++) {
          adjustedPrevGeneration[row].shift();
          adjustedPrevGeneration[row].pop();
        }
        if (Math.abs(columnsDiff) % 2) {
          adjustedPrevGeneration[row].pop();
        }
      }
    }
    if (rowsDiff > 0) { // newRowsLength > prevRowsLength
      const halfDiff = Math.floor(rowsDiff / 2);
      const newRow = [];
      for (let row = 0; row < newGridSize.rows; row++) {
        newRow.push(0);
      }
      for (let row = 0; row < halfDiff; row++) {
        adjustedPrevGeneration.unshift(newRow);
        adjustedPrevGeneration.push(newRow);
      }
      if (rowsDiff % 2) {
        adjustedPrevGeneration.push(newRow);
      }
    }
    if (rowsDiff < 0) { // newRowsLength < prevRowsLength
      const halfDiff = Math.floor(Math.abs(rowsDiff) / 2);
      for (let row = 0; row < halfDiff; row++) {
        adjustedPrevGeneration.shift();
        adjustedPrevGeneration.pop();
      }
      if (Math.abs(rowsDiff) % 2) {
        adjustedPrevGeneration.pop();
      }
    }
    return adjustedPrevGeneration;
  }

  countNeighbors(generation, row, column) {
    const rowsLength = generation.length;
    const columnsLength = generation[0].length;
    let neighbors = 0;
    if (row > 0) {
      neighbors += generation[row - 1][column];
      if (column < columnsLength - 1) {
        neighbors += generation[row - 1][column + 1];
      }
      if (column > 0) {
        neighbors += generation[row - 1][column - 1];
      }
    }
    if (row < rowsLength - 1) {
      neighbors += generation[row + 1][column];
      if (column < columnsLength - 1) {
        neighbors += generation[row + 1][column + 1];
      }
      if (column > 0) {
        neighbors += generation[row + 1][column - 1];
      }
    }
    if (column > 0) {
      neighbors += generation[row][column - 1];
    }
    if (column < columnsLength - 1) {
      neighbors += generation[row][column + 1];
    }
    return neighbors;
  }
  
  // ----- Handlers ----- //
  handleSpeedChange(e) {
    this.setState({ tempo: e.target.value });
  }

  handleCellSizeChange(e) {
    this.setState({ cellSize: e.target.value });
  }

  handleOffColorChange(e) {
    this.setState({ offColor: e.target.value });
  }

  handleOnColorChange(e) {
    this.setState({ onColor: e.target.value });
  }

  handleRandomLexicon() {
    const term = getRandomLexiconExample();
    this.setState({ 
      generation: term.grid,
      counter: 0
    });
  }

  handlePausePlayGame() {
    if (this.state.isPaused) {
      this.nextGenerationTicker();
    } else {
      this.setState((prevState) => {
        clearTimeout(prevState.currentTimer);
        return {
          isPaused: true,
          currentTimer: null
        };
      });
    }
  }

  handleCellClick(row, column) {
    this.setState((prevState) => {
      const newGeneration = [];
      for (const row of prevState.generation) {
        newGeneration.push([...row]);
      }
      const newCellState = prevState.generation[row][column] ? 0 : 1;
      newGeneration[row][column] = newCellState;
      return { generation: newGeneration };
    });
  }

  handlePlantClick() {
    const plant = document.querySelector('.about .logo img');
    plant.classList.add('swirly-plant');
    setTimeout(() => {
      plant.classList.remove('swirly-plant');
    }, 2000); // swirly-plant animation is 1.5s
  }

  // ----- Render ----- //
  render() {
    return (
      <div className="app-container">
        <div className="grid-container">
          <Grid generation={this.state.generation} 
            onColor={this.state.onColor}
            offColor={this.state.offColor}
            cellSize={this.state.cellSize}
            cellClickHandler={this.handleCellClick}/>
        </div>
        <div className="controls-container">
          <div className="controls">
            <div className="control">
              <button type="button"
                className="random-btn"
                onClick={this.handleRandomLexicon}>
                RANDOM
              </button>
            </div>
            <div className="control">
              <button type="button"
                onClick={this.handlePausePlayGame}>
                { this.state.isPaused ? 
                  <span className="material-icons">play_arrow</span> : 
                  <span className="material-icons">pause</span> }
              </button>
            </div>
            <div className="control">
              <label>TEMPO <span>(ms)</span></label>
              <input type="number"
                value={this.state.tempo}
                onChange={this.handleSpeedChange}/>    
            </div>
            <div className="control">
              <label>CELL SIZE <span>(px)</span></label>
              <input type="number"
                value={this.state.cellSize}
                onChange={this.handleCellSizeChange}/>
            </div>
            <div className="control">
              <label>COLORS</label>
              <div className="colors">
                <div className="color-picker">
                  <input type="color"
                    onChange={this.handleOffColorChange}
                    value={this.state.offColor}
                    title="Choose your OFF color"/>
                </div>
                <div className="color-picker">
                  <input type="color" 
                    onChange={this.handleOnColorChange}
                    value={this.state.onColor}
                    title="Choose your ON color"/>
                </div>
              </div>
            </div>
          </div>
          <div className="about">
            <div className="counter">
              <p>{this.state.counter}</p>
            </div>
            <div className="info">
              <button type="button">
                <span className="material-icons">info</span>
              </button>
            </div>
            <div className="logo">
              <img onClick={this.handlePlantClick} alt="plant" src={PlantImage}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
