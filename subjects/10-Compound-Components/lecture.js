import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      activeIndex,
      setActiveIndex
    });
  });

  return <div>{children}</div>;
}

function TabList({ children, activeIndex, setActiveIndex }) {
  children = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      isActive: activeIndex === index,
      setActive: () => setActiveIndex(index)
    })
  );

  return <div style={styles.tabList}>{children}</div>;
}

function Tab({ children, isActive, setActive, disabled }) {
  const tabStyles = disabled
    ? styles.disabledTab
    : isActive
    ? styles.activeTab
    : styles.tab;

  return (
    <div style={tabStyles} onClick={setActive}>
      {children}
    </div>
  );
}

function Panels({ children, activeIndex }) {
  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[activeIndex]}
    </div>
  );
}

function Panel({ children }) {
  return <div>{children}</div>;
}

function App() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Tacos</Tab>
          <Tab>Burritos</Tab>
          <Tab>Coconut Korma</Tab>
        </TabList>
        <Panels>
          <Panel>
            <p>Tacos are delicious</p>
          </Panel>
          <Panel>
            <p>Sometimes a burrito is what you really need</p>
          </Panel>
          <Panel>
            <p>Might be your best option</p>
          </Panel>
        </Panels>
      </Tabs>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
