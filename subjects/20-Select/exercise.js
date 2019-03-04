////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Select({ children }) {
  return (
    <div className="select">
      <div className="label">
        label <span className="arrow">▾</span>
      </div>
      <div className="options">{children}</div>
    </div>
  );
}

function Option({ children }) {
  return <div className="option">{children}</div>;
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
