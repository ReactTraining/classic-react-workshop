import React from "react";
import PropTypes from "prop-types";
import createOscillator from "../utils/createOscillator";

class Tone extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    pitch: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.oscillator = createOscillator();
    this.doImperativeWork();
  }

  componentDidUpdate() {
    this.doImperativeWork();
  }

  doImperativeWork() {
    if (this.props.isPlaying) {
      this.oscillator.play();
    } else {
      this.oscillator.stop();
    }

    this.oscillator.setPitchBend(this.props.pitch);
    this.oscillator.setVolume(this.props.volume);
  }

  render() {
    return null;
  }
}

export default Tone;
