import React from 'react';
import Grid from './components/grid/Grid';
import ConfigController from './components/controls/ConfigController';
import Logo from './components/Logo';
import Modal from './components/modals/Modal';
import InfoModal from './components/modals/InfoModal';
import {withTranslation} from 'react-i18next';
import {getPatternByName, getRandomPattern} from './util/lexicon';
import {showBaner} from './util/baners';
import './reset.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialCellSize = this.calculateCellSize();
    const initialGridSize = this.getNewGridSize(initialCellSize);
    const initialPattern = getPatternByName("Kok's galaxy").grid;
    const firstGeneration = this.getAdjustedSizeGeneration(initialPattern, initialGridSize);
    this.windowResizeDedouncerID = null;
    this.state = {
      counter: 0,
      rhythm: 500,
      generation: firstGeneration,
      cellSize: initialCellSize,
      minCellSize: this.calculateMinCellSize(),
      currentTimer: null,
      isPaused: false
    };

    const { t } = this.props;
    showBaner(t('baners.game_of_life'), 3000);

    this.nextGenerationTicker = this.nextGenerationTicker.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.handleRhythmChange = this.handleRhythmChange.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleCellSizeChange = this.handleCellSizeChange.bind(this);
    this.handleRandomPattern = this.handleRandomPattern.bind(this);
    this.handlePausePlayGame = this.handlePausePlayGame.bind(this);
    this.handleClearGrid = this.handleClearGrid.bind(this);
    this.handleOpenConfig = this.handleOpenConfig.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    const timerID = setTimeout(this.nextGenerationTicker, this.state.rhythm);
    this.setState({ currentTimer: timerID });
  }

  componentWillUnmount() {
    clearTimeout(this.state.currentTimer);
  }

  // ----- App Methods ----- //
  nextGenerationTicker() {
    const timerID = setTimeout(this.nextGenerationTicker, this.state.rhythm);
    this.setState((prevState) => {
      const newGeneration = this.getNewGeneration(prevState.generation);
      return {
        counter: prevState.counter + 1,
        currentTimer: timerID,
        generation: newGeneration,
        isPaused: false
      };
    });
  }

  getNewGeneration(prevGeneration) {
    const newGeneration = [];
    const rowsLength = prevGeneration.length;
    const columsLength = prevGeneration[0].length;

    for (let row = 0; row < rowsLength; row++) {
      newGeneration.push([]);
      for (let column = 0; column < columsLength; column++) {
        const neighbors = this.countNeighbors(prevGeneration, row, column);
        if (neighbors === 3) {
          newGeneration[row][column] = 1;
        } else if (prevGeneration[row][column] && neighbors === 2) {
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
      rows: Math.floor((window.innerHeight - 100) / cellSize)
    };
  }

  getAdjustedSizeGeneration(prevGeneration, newGridSize) {
    const rowsDiff = newGridSize.rows - prevGeneration.length;
    const columnsDiff = newGridSize.columns - prevGeneration[0].length;
    const adjustedSizeGeneration = [];
    for (const row of prevGeneration) {
      adjustedSizeGeneration.push([...row]);
    }

    if (columnsDiff > 0) {
      this.addColumns(adjustedSizeGeneration, columnsDiff);
    }
    if (columnsDiff < 0) {
      this.removeColums(adjustedSizeGeneration, Math.abs(columnsDiff));
    }
    if (rowsDiff > 0) {
      this.addRows(adjustedSizeGeneration, rowsDiff);
    }
    if (rowsDiff < 0) {
      this.removeRows(adjustedSizeGeneration, Math.abs(rowsDiff));
    }
    return adjustedSizeGeneration;
  }

  addColumns(generation, number) {
    const halfNumber = Math.floor(number / 2);
    for (let row = 0; row < generation.length; row++) {
      for (let i = 0; i < halfNumber; i++) {
        generation[row].unshift(0);
        generation[row].push(0);
      }
      if (number % 2) {
        generation[row].push(0);
      }
    }
  }

  removeColums(generation, number) {
    const halfDiff = Math.floor(number / 2);
    for (let row = 0; row < generation.length; row++) {
      for (let i = 0; i < halfDiff; i++) {
        generation[row].shift();
        generation[row].pop();
      }
      if (number % 2) {
        generation[row].pop();
      }
    }
  }

  addRows(generation, number) {
    const halfDiff = Math.floor(number / 2);
    const newRow = [];
    for (let i = 0; i < generation[0].length; i++) {
      newRow.push(0);
    }
    for (let i = 0; i < halfDiff; i++) {
      generation.unshift(newRow);
      generation.push(newRow);
    }
    if (number % 2) {
      generation.push(newRow);
    }
  }

  removeRows(generation, number) {
    const halfDiff = Math.floor(number / 2);
    for (let i = 0; i < halfDiff; i++) {
      generation.shift();
      generation.pop();
    }
    if (number % 2) {
      generation.pop();
    }
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

  pauseGame() {
    this.setState((prevState) => {
      clearTimeout(prevState.currentTimer);
      return {
        isPaused: true,
        currentTimer: null
      };
    });
  }

  calculateMinCellSize() {
    if (window.innerWidth > 700) {
      return Math.floor(window.innerWidth / 75);
    } else if (window.innerWidth > 450) {
      return Math.floor(window.innerWidth / 50);
    } else {
      return Math.floor(window.innerWidth / 35);
    }
  }

  calculateCellSize() {
    if (window.innerWidth > 700) {
      return Math.floor(window.innerWidth / 60);
    } else if (window.innerWidth > 450) {
      return Math.floor(window.innerWidth / 35);
    } else {
      return Math.floor(window.innerWidth / 25);
    }
  }
  
  // ----- Handlers ----- //
  handleWindowResize() {
    clearTimeout(this.windowResizeDedouncerID);
    this.windowResizeDedouncerID = setTimeout(() => {
      this.setState((prevState) => {
        const newCellSize = this.calculateCellSize();
        const newGridSize = this.getNewGridSize(newCellSize);
        const adjustedGeneration = this.getAdjustedSizeGeneration(prevState.generation, newGridSize);
        return {
          generation: adjustedGeneration,
          cellSize: newCellSize,
          minCellSize: this.calculateMinCellSize()
        };
      });
    }, 500);
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

  handleRandomPattern() {
    const gridSize = this.getNewGridSize(this.state.cellSize);
    const randomPattern = getRandomPattern();
    const adjustedPattern = this.getAdjustedSizeGeneration(randomPattern.grid, gridSize);

    showBaner(randomPattern.name, 2000);
    this.setState({ 
      generation: adjustedPattern,
      counter: 0
    });
  }

  handleRhythmChange(newRhythm) {
    this.setState({ rhythm: newRhythm });
  }

  handleCellSizeChange(newSize) {
    this.setState((prevState) => {
      const newGridSize = this.getNewGridSize(newSize);
      const adjustedGeneration = this.getAdjustedSizeGeneration(prevState.generation, newGridSize);
      return { 
        cellSize: newSize,
        generation: adjustedGeneration
      };
    });
  }

  handlePausePlayGame() {
    if (this.state.isPaused) {
      this.nextGenerationTicker();
    } else {
      this.pauseGame();
    }
  }

  handleClearGrid() {
    if (!this.state.isPaused) {
      this.pauseGame();
    }
    this.setState((prevState) => {
      const rowsLength = prevState.generation.length;
      const columnsLength = prevState.generation[0].length;
      const newGeneration = [];
      const newRow = [];

      for (let i = 0; i < columnsLength; i++) {
        newRow.push(0);
      }
      for (let i = 0; i < rowsLength; i++) {
        newGeneration.push(newRow);
      }

      return {
        generation: newGeneration,
        counter: 0
      };
    });
  }

  handleOpenConfig() {
    const configModal = document.getElementById('config-modal');
    configModal.style.display = 'flex';
  }

  handleInfoClick() {
    const infoModal = document.getElementById('info-modal');
    infoModal.style.display = 'flex';
  }

  // ----- Render ----- //
  render() {
    const { t } = this.props;
    return (
      <div className="app-container">
        <div className="grid-container">
          <Grid generation={this.state.generation}
            cellSize={this.state.cellSize}
            cellClickHandler={this.handleCellClick}/>
        </div>
        <div className="controls-container">
          <div className="controls">
            <div className="control">
              <button type="button"
                className="random-pattern-btn"
                title={t('controls.tooltips.random_btn')}
                onClick={this.handleRandomPattern}>
                {t('controls.random')}
              </button>
            </div>
            <div className="control">
              <button type="button"
                title={ this.state.isPaused ? 
                  t('controls.tooltips.pause_btn') : 
                  t('controls.tooltips.play_btn') }
                onClick={this.handlePausePlayGame}>
                { this.state.isPaused ? 
                  <span className="material-icons">play_arrow</span> : 
                  <span className="material-icons">pause</span> }
              </button>
            </div>
            <div className="control">
              <button type="button"
                title={t('controls.tooltips.clear_btn')}
                onClick={this.handleClearGrid}>
                <span className="material-icons">delete</span>
              </button>
            </div>
            { window.innerWidth <= 1100 ? 
              <div className="control">
                <button type="button"
                  className="config-btn"
                  onClick={this.handleOpenConfig}>
                  <span className="material-icons">settings</span>
                </button>
              </div> : null }
            { window.innerWidth > 1100 ? 
              <ConfigController flexDirection="row"
                rhythm={this.state.rhythm}
                cellSize={this.state.cellSize}
                minCellSize={this.state.minCellSize}
                rhythmHandler={this.handleRhythmChange}
                cellSizeHandler={this.handleCellSizeChange}/> : null }
          </div>

          <div className="about">
            <div className="counter">
              <p>{this.state.counter}</p>
            </div>
            <div className="info">
              <button type="button"
                title={t('controls.tooltips.info_btn')}
                onClick={this.handleInfoClick}>
                <span className="material-icons">info</span>
              </button>
            </div>
            <Logo/>
          </div>
        </div>
        
        {/* ----- Modals ----- */}
        <InfoModal/>
        <Modal id="config-modal" title={t("Configuration")}>
          { window.innerWidth <= 1100 ? 
            <ConfigController flexDirection="column"
              rhythm={this.state.rhythm}
              cellSize={this.state.cellSize}
              minCellSize={this.state.minCellSize}
              rhythmHandler={this.handleRhythmChange}
              cellSizeHandler={this.handleCellSizeChange}/> : null
          }
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(App);
