import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      speed: 1000
    };
  }

  // Lyfecycle Methods //
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Component Methods //
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="app-container">
        <p>Building Conway's Game Of Life</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default App;
