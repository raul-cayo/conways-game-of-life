import React from 'react';
import Modal from './Modal';

class InfoModal extends React.Component {
  render() {
    return (
      <Modal id="info-modal" title="What is Conway's Game of Life?">
        <p>Conways Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. One interacts with the Game of Life by creating an initial state and observing how it evolves. It produces complex and interesting patterns following a few rules.</p>
        <br/>
        <p>Rules:</p>
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
        <br/>
        <p>Resources:</p>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noreferrer">Wikipedia</a></li>
          <li><a href="https://bitstorm.org/gameoflife/lexicon/" target="_blank" rel="noreferrer">Lexicon</a></li>
          <li><a href="https://www.youtube.com/watch?v=R9Plq-D1gEk" target="_blank" rel="noreferrer">Youtube Video</a></li>
        </ul>
      </Modal>
    );
  }
}

export default InfoModal;
