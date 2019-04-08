////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import ReactDOM from "react-dom";

function RadioGroup({ children }) {
  return <div>{children}</div>;
}

function RadioOption({ children }) {
  return (
    <div>
      <RadioIcon isSelected={false} /> {children}
    </div>
  );
}

function RadioIcon({ isSelected }) {
  return (
    <div
      style={{
        borderColor: "#ccc",
        borderWidth: 3,
        borderStyle: isSelected ? "inset" : "outset",
        height: 16,
        width: 16,
        display: "inline-block",
        cursor: "pointer",
        background: isSelected ? "rgba(0, 0, 0, 0.05)" : ""
      }}
    />
  );
}

function App() {
  return (
    <div>
      <h1>♬ It's about time that we all turned off the radio ♫</h1>

      <RadioGroup defaultValue="fm">
        <RadioOption value="am">AM</RadioOption>
        <RadioOption value="fm">FM</RadioOption>
        <RadioOption value="tape">Tape</RadioOption>
        <RadioOption value="aux">Aux</RadioOption>
      </RadioGroup>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
