import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";

const TabsContext = React.createContext();
// <TabsContext.Provider> // thrower
//
// <TabsContext.Consumer> // catcher
// static contextType + this.context // preferred

class TabList extends React.Component {
  static contextType = TabsContext;

  render() {
    const { children } = this.props;
    const value = this.context;

    return (
      <div>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            _isActive: index === value.activeIndex,
            _onSelect: () => value.selectIndex(index)
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

function TabPanels({ children }) {
  return (
    <TabsContext.Consumer>
      {value => (
        <div style={styles.tabPanels}>
          {React.Children.toArray(children)[value.activeIndex]}
        </div>
      )}
    </TabsContext.Consumer>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

class Tabs extends React.Component {
  state = { activeIndex: 0 };

  selectIndex = index => this.setState({ activeIndex: index });

  render() {
    return (
      <TabsContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          selectIndex: this.selectIndex
        }}
      >
        <div>{this.props.children}</div>
      </TabsContext.Provider>
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
