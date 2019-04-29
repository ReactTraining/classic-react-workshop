import React, { useEffect, useRef, useState } from "react";
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

function App() {
  const oscillator = createOscillator();

  function play() {
    oscillator.play();
  }

  function stop() {
    oscillator.stop();
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

    oscillator.setPitchBend(pitch);
    oscillator.setVolume(volume);
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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Can't predict what the sound is going to be by looking at state or the JSX,
// but using state makes things a lot easier to think about.

// function App() {
//   const oscillatorRef = useRef(createOscillator());
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.4);
//   const [pitch, setPitch] = useState(0.2);

//   useEffect(
//     () => {
//       const oscillator = oscillatorRef.current;
//       if (isPlaying) {
//         oscillator.setPitchBend(pitch);
//         oscillator.setVolume(volume);
//         oscillator.play();
//       } else {
//         oscillator.stop();
//       }
//     },
//     [isPlaying, volume, pitch]
//   );

//   function play() {
//     setIsPlaying(true);
//   }

//   function stop() {
//     setIsPlaying(false);
//   }

//   function changeTone(event) {
//     const { clientX, clientY } = event;
//     const {
//       top,
//       right,
//       bottom,
//       left
//     } = event.target.getBoundingClientRect();
//     const pitch = (clientX - left) / (right - left);
//     const volume = 1 - (clientY - top) / (bottom - top);

//     setPitch(pitch);
//     setVolume(volume);
//   }

//   return (
//     <div>
//       <h1>What does it mean to be declarative?</h1>
//       <div
//         style={styles.theremin}
//         onMouseEnter={play}
//         onMouseLeave={stop}
//         onMouseMove={changeTone}
//       />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// We can do even better and make this fully declarative for the <App>. Instead
// of using this.oscillator (an imperative API), let's wrap that up into a
// <Tone> component and control it declaratively.

// function Tone({ isPlaying, pitch, volume }) {
//   const oscillatorRef = useRef(createOscillator());

//   useEffect(() => {
//     const oscillator = oscillatorRef.current;
//     if (isPlaying) {
//       oscillator.play();
//     } else {
//       oscillator.stop();
//     }
//     oscillator.setPitchBend(pitch);
//     oscillator.setVolume(volume);
//   }, [isPlaying, volume, pitch]);

//   return null;
// }

// function App() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.4);
//   const [pitch, setPitch] = useState(0.2);

//   function play() {
//     setIsPlaying(true);
//   }

//   function stop() {
//     setIsPlaying(false);
//   }

//   function changeTone(event) {
//     const { clientX, clientY } = event;
//     const {
//       top,
//       right,
//       bottom,
//       left
//     } = event.target.getBoundingClientRect();
//     const pitch = (clientX - left) / (right - left);
//     const volume = 1 - (clientY - top) / (bottom - top);

//     setPitch(pitch);
//     setVolume(volume);
//   }

//   return (
//     <div>
//       <h1>What does it mean to be declarative?</h1>
//       <Tone isPlaying={isPlaying} pitch={pitch} volume={volume} />
//       <div
//         style={styles.theremin}
//         onMouseEnter={play}
//         onMouseLeave={stop}
//         onMouseMove={changeTone}
//       />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Pull out <Theremin> into its own component - you're most of the way there!
//
// Add a <Tone waveType> prop that changes the type of sound wave that is
// generated and render many of them.

// function Tone({ isPlaying, pitch, volume, waveType }) {
//   const oscillatorRef = useRef(createOscillator());

//   useEffect(() => {
//     const oscillator = oscillatorRef.current;
//     if (isPlaying) {
//       oscillator.play();
//     } else {
//       oscillator.stop();
//     }
//     oscillator.setPitchBend(pitch);
//     oscillator.setVolume(volume);
//     oscillator.setType(waveType);
//   }, [isPlaying, volume, pitch]);

//   return null;
// }

// Tone.defaultProps = {
//   waveType: "sine"
// };

// function Theremin({ type }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.4);
//   const [pitch, setPitch] = useState(0.2);

//   function play() {
//     setIsPlaying(true);
//   }

//   function stop() {
//     setIsPlaying(false);
//   }

//   function changeTone(event) {
//     const { clientX, clientY } = event;
//     const {
//       top,
//       right,
//       bottom,
//       left
//     } = event.target.getBoundingClientRect();
//     const pitch = (clientX - left) / (right - left);
//     const volume = 1 - (clientY - top) / (bottom - top);

//     setPitch(pitch);
//     setVolume(volume);
//   }

//   return (
//     <div>
//       <Tone
//         isPlaying={isPlaying}
//         pitch={pitch}
//         volume={volume}
//         waveType={type}
//       />
//       <div
//         style={styles.theremin}
//         onMouseEnter={play}
//         onMouseLeave={stop}
//         onMouseMove={changeTone}
//       />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <h1>What does it mean to be declarative?</h1>
//       <Theremin />
//       <Theremin type="triangle" />
//       <Theremin type="square" />
//       <Theremin type="sawtooth" />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// When you isolate all imperative work into components then the application
// using them can model their UI in a declarative, predictible way because
// it renders based on a snapshot of state, time has been removed from the
// equation.
//
// Additionally, when the components doing the imperative work do it all in
// componentDidMount and componenDidUpdate, you even make the imperative
// work predictable because it's based on a snapshot of state in time also.
