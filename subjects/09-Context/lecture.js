import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";

const TabsContext = React.createContext();

function TabList({ children }) {
  return (
    <TabsContext.Consumer>
      {context => (
        <div style={styles.tabs}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              _isActive: index === context.activeIndex,
              _onSelect: () => context.onTabSelect(index)
            });
          })}
        </div>
      )}
    </TabsContext.Consumer>
  );
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
      {context => (
        <div style={styles.tabPanels}>
          {React.Children.toArray(children)[context.activeIndex]}
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

  render() {
    return (
      <TabsContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          onTabSelect: index => this.setState({ activeIndex: index })
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
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs>
    </div>
  );
}

function Example() {
  return (
    <TabsContext.Provider value="hello">
      <div>
        <TabsContext.Consumer>
          {value => <p>{value}</p>}
        </TabsContext.Consumer>

        <TabsContext.Provider value="goodbye">
          <div>
            <TabsContext.Consumer>
              {value => <p>{value}</p>}
            </TabsContext.Consumer>
          </div>
        </TabsContext.Provider>
      </div>
    </TabsContext.Provider>
  );
}

ReactDOM.render(<Example />, document.getElementById("app"));
