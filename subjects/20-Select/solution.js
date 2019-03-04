////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Select({ children, defaultValue, value, onChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  const isControlled = value != null;
  const displayValue = isControlled ? value : currentValue;

  function selectValue(value) {
    if (isControlled) {
      onChange(value);
    } else {
      setCurrentValue(value);

      if (onChange) {
        onChange(value);
      }
    }
  }

  let label;
  React.Children.forEach(children, child => {
    if (child.props.value === displayValue) {
      label = child.props.children;
    }
  });

  useEffect(() => {
    if (isControlled && !onChange) {
      console.warn(
        "You rendered a <Select> with a `value` prop but no `onChange`, so it will be read-only..."
      );
    }
  }, []);

  return (
    <div className="select" onClick={toggleOptions}>
      <div className="label">
        {label} <span className="arrow">▾</span>
      </div>
      {showOptions && (
        <div className="options">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onSelect: () => selectValue(child.props.value)
            })
          )}
        </div>
      )}
    </div>
  );
}

function Option({ children, onSelect }) {
  return (
    <div className="option" onClick={onSelect}>
      {children}
    </div>
  );
}

function App() {
  const [selectValue, setSelectValue] = useState("dosa");

  function setToMintChutney() {
    setSelectValue("mint-chutney");
  }

  return (
    <div>
      <h1>Select</h1>

      <h2>Uncontrolled</h2>

      <Select defaultValue="tikka-masala">
        <Option value="tikka-masala">Tikka Masala</Option>
        <Option value="tandoori-chicken">Tandoori Chicken</Option>
        <Option value="dosa">Dosa</Option>
        <Option value="mint-chutney">Mint Chutney</Option>
      </Select>

      <h2>Controlled</h2>

      <p>Current value: {selectValue}</p>
      <p>
        <button onClick={setToMintChutney}>Set to Mint Chutney</button>
      </p>

      <Select value={selectValue} onChange={setSelectValue}>
        <Option value="tikka-masala">Tikka Masala</Option>
        <Option value="tandoori-chicken">Tandoori Chicken</Option>
        <Option value="dosa">Dosa</Option>
        <Option value="mint-chutney">Mint Chutney</Option>
      </Select>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
