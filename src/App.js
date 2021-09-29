import React from 'react';
import Grid from './components/grid/Grid';
import NumberInput from './components/controls/NumberInput';
import ColorPicker from './components/controls/ColorPicker';
import ShapeSwitch from './components/controls/ShapeSwitch';
import Modal from './components/modals/Modal';
import InfoModal from './components/modals/InfoModal';
import {withTranslation} from 'react-i18next';
import {getPatternByName, getRandomPattern} from './util/lexicon';
import {showBaner} from './util/baners';
import './reset.css';
import './App.css';
import PlantImage from './images/plant.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialCellSize = 22;
    const initialGridSize = this.getNewGridSize(initialCellSize);
    const initialPattern = getPatternByName("Kok's galaxy").grid;
    const firstGeneration = this.getAdjustedSizeGeneration(initialPattern, initialGridSize);
    this.state = {
      counter: 0,
      rhythm: 700,
      generation: firstGeneration,
      cellSize: initialCellSize,
      currentTimer: null,
      isPaused: false
    };

    this.appLanguage = { changed: false, langCode: 'en' };
    const { t, i18n } = this.props;
    const language = window.navigator.userLanguage || window.navigator.language;
    if (language.startsWith('es')) {
      i18n.changeLanguage('es');
      this.appLanguage.langCode = 'es';
    }

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
    this.handlePlantClick = this.handlePlantClick.bind(this);
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
      rows: Math.floor((window.innerHeight - 101) / cellSize)
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
  
  // ----- Handlers ----- //
  handleWindowResize() {
    this.handleCellSizeChange(this.state.cellSize);
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
    const pattern = getRandomPattern();
    showBaner(pattern.name, 2000);
    this.setState({ 
      generation: pattern.grid,
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
    if (!this.state.isPaused) {
      this.pauseGame();
    }
    const configModal = document.getElementById('config-modal');
    configModal.style.display = 'flex';
  }

  handleInfoClick() {
    const infoModal = document.getElementById('info-modal');
    infoModal.style.display = 'flex';
  }

  handlePlantClick() {
    const { t, i18n } = this.props;
    if ( this.appLanguage.changed ) {
      if ( this.appLanguage.langCode === 'en' ) {
        i18n.changeLanguage('es');
        this.appLanguage.langCode = 'es';
      } else {
        i18n.changeLanguage('en');
        this.appLanguage.langCode = 'en';
      }
      showBaner(t('baners.lang_changed'), 1000);
    } else {
      showBaner(t('baners.click_again'), 1000);
      this.appLanguage.changed = true;
    }

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
            <div className="control">
              <button type="button"
                className="config-btn"
                onClick={this.handleOpenConfig}>
                <span className="material-icons">settings</span>
              </button>
            </div>

            <div className="config">
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
              <div className="control">
                <label>{t('controls.shape')}</label>
                <ShapeSwitch/>
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
        
        {/* ----- Modals ----- */}
        <InfoModal/>
        <Modal id="config-modal" title={t("Configuration")}>
          <div className="config-modal-container">
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
              <div className="control">
                <label>{t('controls.shape')}</label>
                <ShapeSwitch/>
              </div>
            </div>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(App);
