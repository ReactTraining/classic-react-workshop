import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

const TabContext = React.createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  const context = useContext(TabContext);

  children = React.Children.map(children, (child, index) => {
    const _isActive = context.activeIndex === index;
    return React.cloneElement(child, {
      _isActive,
      _selectTab: () => context.setActiveIndex(index)
    });
  });
  return <div style={styles.tabList}>{children}</div>;
}

function Tab({ children, disabled, _isActive, _selectTab }) {
  const tabStyles = disabled
    ? styles.disabledTab
    : _isActive
    ? styles.activeTab
    : styles.tab;

  return (
    <div
      style={tabStyles}
      onClick={disabled ? () => null : () => _selectTab()}
    >
      {children}
    </div>
  );
}

function TabPanels({ children }) {
  const context = useContext(TabContext);

  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[context.activeIndex]}
    </div>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
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
          <TabPanel>
            <p>Tacos are delicious</p>
          </TabPanel>
          <TabPanel>
            <p>Sometimes a burrito is what you really need</p>
          </TabPanel>
          <TabPanel>
            <p>Might be your best option</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
