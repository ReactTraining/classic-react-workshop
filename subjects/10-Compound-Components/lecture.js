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
  return (
    <div style={styles.tabList} key="tabs">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onSelect: () => setActiveIndex(index)
        });
      })}
    </div>
  );
}

function Tab({ children, isActive, onSelect, disabled }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : isActive
          ? styles.activeTab
          : styles.tab
      }
      onClick={disabled ? () => null : onSelect}
    >
      {children}
    </div>
  );
}

function TabPanels({ children, activeIndex }) {
  return (
    <div key="panels" style={styles.tabPanels}>
      {React.Children.toArray(children)[activeIndex]}
    </div>
  );
}

function Panel({ children }) {
  return children;
}

function App() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Tacos</Tab>
          <Tab disabled>Burritos</Tab>
          <Tab>Coconut Korma</Tab>
        </TabList>
        <TabPanels>
          <Panel>
            <p>Tacos are delicious</p>
          </Panel>
          <Panel>
            <p>Sometimes a burrito is what you really need</p>
          </Panel>
          <Panel>
            <p>Might be your best option</p>
          </Panel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
