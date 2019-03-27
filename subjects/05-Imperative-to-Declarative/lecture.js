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

function Tone({ isPlaying, pitch, volume }) {
  const oscillatorRef = useRef(createOscillator());

  useEffect(() => {
    const oscillator = oscillatorRef.current;
    console.log(isPlaying);
    if (isPlaying) {
      oscillator.setPitchBend(pitch);
      oscillator.setVolume(volume);
      oscillator.play();
    } else {
      oscillator.stop();
    }
  }, [isPlaying, pitch, volume]);

  return null;
}

function App() {
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
      <h1>What does it mean to be declarative?</h1>
      <div
        style={styles.theremin}
        onMouseEnter={play}
        onMouseLeave={stop}
        onMouseMove={changeTone}
      />
      <Tone isPlaying={isPlaying} volume={volume} pitch={pitch} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
