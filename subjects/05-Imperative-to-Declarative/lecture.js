import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
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

function Tone({ isPlaying, volume, pitch, waveType }) {
  // const [oscillator] = useState(createOscillator());
  const oscillatorRef = useRef(createOscillator());

  useEffect(() => {
    const oscillator = oscillatorRef.current;
    if (isPlaying) {
      oscillator.play();
      oscillator.setPitchBend(pitch);
      oscillator.setVolume(volume);
      oscillator.setType(waveType);
    } else {
      oscillator.stop();
    }
  }, [isPlaying, pitch, volume, waveType]);

  return null;
}

function Oscillator({ waveType }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);

  function play() {
    setIsPlaying(true);
  }

  function stop() {
    setIsPlaying(false);
  }

  function changeTone(event) {
    const { clientX, clientY } = event;
    const {
      top,
      right,
      bottom,
      left
    } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    setVolume(volume);
    setPitch(pitch);
  }

  return (
    <div>
      <div
        style={styles.theremin}
        onMouseEnter={play}
        onMouseLeave={stop}
        onMouseMove={changeTone}
      />
      <Tone
        isPlaying={isPlaying}
        volume={volume}
        pitch={pitch}
        waveType={waveType}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>What does it mean to be declarative?</h1>
      <Oscillator waveType="sawtooth" />
      <Oscillator />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
