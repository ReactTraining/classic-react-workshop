import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import createOscillator from "./utils/createOscillator";

const styles = {};

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: "1px solid",
  cursor: "crosshair",
  margin: 10,
  display: "inline-block"
};

class Tone extends React.Component {
  componentDidMount() {
    this.oscillator = createOscillator();
    this.doImperativeWork();
  }

  componentDidUpdate() {
    this.doImperativeWork();
  }

  doImperativeWork() {
    const { isPlaying, pitch, volume, type } = this.props;

    if (isPlaying) {
      this.oscillator.setPitchBend(pitch);
      this.oscillator.setVolume(volume);
      this.oscillator.setType(type);
      this.oscillator.play();
    } else {
      this.oscillator.stop();
    }
  }

  render() {
    return <h1>Hi, I'm a {this.props.type} wave</h1>;
  }
}

class Theremin extends React.Component {
  play = () => {
    this.setState({ isPlaying: true });
  };

  stop = () => {
    this.setState({ isPlaying: false });
  };

  changeTone = event => {
    const { clientX, clientY } = event;
    const {
      top,
      right,
      bottom,
      left
    } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);

    this.setState({ pitch, volume });
  };

  state = { isPlaying: false, pitch: 0.4, volume: 0.4 };

  render() {
    return (
      <div
        style={styles.theremin}
        onMouseEnter={this.play}
        onMouseLeave={this.stop}
        onMouseMove={this.changeTone}
      >
        <Tone
          isPlaying={this.state.isPlaying}
          pitch={this.state.pitch}
          volume={this.state.volume}
          type={this.props.waveType}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>What does it mean to be declarative?</h1>
        <Theremin waveType="square" />
        <Theremin waveType="sine" />
        <Theremin waveType="triangle" />
        <Theremin waveType="sawtooth" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
