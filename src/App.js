import React from 'react';
import Grid from './components/grid/Grid';
import NumberInput from './components/controls/NumberInput';
import ColorPicker from './components/controls/ColorPicker';
import InfoModal from './components/modals/InfoModal';
import { withTranslation } from 'react-i18next';
import {getLexiconByName, getRandomLexiconExample} from './util/lexicon';
import {showBaner} from './util/baners';
import './reset.css';
import './App.css';
import PlantImage from './images/plant.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      rhythm: 700,
      generation: getLexiconByName("Kok's galaxy").grid,
      cellSize: 22,
      currentTimer: null,
      isPaused: false
    };

    const { t, i18n } = this.props;
    const language = window.navigator.userLanguage || window.navigator.language;
    if (language.startsWith('es')) {
      i18n.changeLanguage('es');
    }

    showBaner(t('baners.game_of_life'), 3000);

    this.nextGenerationTicker = this.nextGenerationTicker.bind(this);
    this.handleRhythmChange = this.handleRhythmChange.bind(this);
    this.handleCellSizeChange = this.handleCellSizeChange.bind(this);
    this.handleRandomLexicon = this.handleRandomLexicon.bind(this);
    this.handlePausePlayGame = this.handlePausePlayGame.bind(this);
    this.handleClearGrid = this.handleClearGrid.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handlePlantClick = this.handlePlantClick.bind(this);
  }

  // ----- Lyfecycle Methods ----- //
  componentDidMount() {
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
        rhythm: prevState.rhythm,
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
      for (let i = 0; i < newGridSize.columns; i++) {
        newRow.push(0);
      }
      for (let i = 0; i < halfDiff; i++) {
        adjustedPrevGeneration.unshift(newRow);
        adjustedPrevGeneration.push(newRow);
      }
      if (rowsDiff % 2) {
        adjustedPrevGeneration.push(newRow);
      }
    }
    if (rowsDiff < 0) { // newRowsLength < prevRowsLength
      const halfDiff = Math.floor(Math.abs(rowsDiff) / 2);
      for (let i = 0; i < halfDiff; i++) {
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
  handleRhythmChange(newRhythm) {
    this.setState({ rhythm: newRhythm });
  }

  handleCellSizeChange(newSize) {
    this.setState({ cellSize: newSize });
  }

  handleRandomLexicon() {
    const term = getRandomLexiconExample();
    showBaner(term.name, 2000);
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

  handleClearGrid() {
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

  handleInfoClick() {
    const infoModal = document.getElementById('info-modal');
    infoModal.style.display = 'flex';
  }

  handlePlantClick() {
    const { t } = this.props;
    showBaner(t('baners.nothing'), 1000);
    const plant = document.querySelector('.about .logo img');
    plant.classList.add('swirly-plant');
    setTimeout(() => {
      plant.classList.remove('swirly-plant');
    }, 2000); // swirly-plant animation is 1.5s
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
                className="random-btn"
                title={t('controls.tooltips.random_btn')}
                onClick={this.handleRandomLexicon}>
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
            <div className="control">
              <NumberInput label={t('controls.rhythm')}
                units="MS" min={100} max={3000} step={50}
                value={this.state.rhythm}
                onChange={this.handleRhythmChange}/> 
            </div>
            <div className="control">
              <NumberInput label={t('controls.cell_size')}
                units="PX" min={16} max={50} step={5}
                value={this.state.cellSize}
                onChange={this.handleCellSizeChange}/>
            </div>
            <div className="control">
              <label>{t("controls.colors")}</label>
              <div className="colors">
                <ColorPicker 
                  color="#404040"
                  cssVar="--cell-off"
                  title={t('controls.tooltips.off_color_picker')}/>
                <ColorPicker 
                  color="#40BB6C"
                  cssVar="--cell-on"
                  title={t('controls.tooltips.on_color_picker')}/>
              </div>
            </div>
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
            <div className="logo">
              <img onClick={this.handlePlantClick} alt="plant" src={PlantImage}/>
            </div>
          </div>
        </div>
        
        <InfoModal/>
      </div>
    );
  }
}

export default withTranslation()(App);
