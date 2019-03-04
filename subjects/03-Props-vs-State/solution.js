////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make the "Go to Step 2" button work.
//
// In order to do this, you'll have to make tabs a "pure component" so that it
// no longer manages its own state. Instead add a prop to tell it which tab to
// show, and then move the state up to the <App>.
//
// Also, be sure that clicking on the individual tabs still works.
////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";
import data from "./data";

function Tabs({ data, activeIndex, onChange }) {
  const tabs = data.map((item, index) => {
    let isActive = index === activeIndex;
    let style = isActive ? styles.activeTab : styles.tab;

    return (
      <div
        key={index}
        className="Tab"
        style={style}
        onClick={() => onChange(index)}
      >
        {item.name}
      </div>
    );
  });

  return (
    <div className="Tabs">
      {tabs}
      <div className="TabPanel" style={styles.panel}>
        {data[activeIndex].description}
      </div>
    </div>
  );
}

function App({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <h1>Props v. State</h1>
      <button onClick={() => setActiveIndex(1)}>Go to "Step 2"</button>
      <Tabs
        data={tabs}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
    </div>
  );
}

ReactDOM.render(<App tabs={data} />, document.getElementById("app"));
