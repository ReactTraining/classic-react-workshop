import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";

const TabContext = React.createContext();
// TabContext.Consumer <-- not preferred API
// TabContext.Provider
// static contextType
// this.context

class TabList extends React.Component {
  static contextType = TabContext;

  render() {
    const { children } = this.props;
    const { activeIndex, selectIndex } = this.context;

    return (
      <div>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            _isActive: index === activeIndex,
            _onSelect: () => selectIndex(index)
          })
        )}
      </div>
    );
  }
}

function Tab({ children, disabled, _isActive, _onSelect }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : _isActive
            ? styles.activeTab
            : styles.tab
      }
      onClick={disabled ? null : _onSelect}
    >
      {children}
    </div>
  );
}

class TabPanels extends React.Component {
  static contextType = TabContext;

  render() {
    const { children } = this.props;
    const { activeIndex } = this.context;

    return (
      <div style={styles.tabPanels}>
        {React.Children.toArray(children)[activeIndex]}
      </div>
    );
  }
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

class Tabs extends React.Component {
  state = { activeIndex: 0 };

  selectIndex = index => this.setState({ activeIndex: index });

  render() {
    return (
      <TabContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          selectIndex: this.selectIndex
        }}
      >
        <div>{this.props.children}</div>
      </TabContext.Provider>
    );
  }
}

function App() {
  return (
    <div>
      <Tabs>
        <div className="hot">
          <TabList>
            <Tab>Tacos</Tab>
            <Tab disabled>Burritos</Tab>
            <Tab>Coconut Korma</Tab>
          </TabList>
        </div>
        <div>
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
        </div>
      </Tabs>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
