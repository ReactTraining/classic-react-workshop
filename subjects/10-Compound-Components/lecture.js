import React from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

// class Tabs extends React.Component {
//   static defaultProps = { disabled: [] };

//   state = { activeIndex: 0 };

//   selectTabIndex(activeIndex) {
//     this.setState({ activeIndex });
//   }

//   renderTabs() {
//     return this.props.data.map((tab, index) => {
//       const isActive = this.state.activeIndex === index;
//       const isDisabled = this.props.disabled.includes(index);
//       return (
//         <div
//           key={tab.label}
//           style={
//             isDisabled
//               ? styles.disabledTab
//               : isActive
//                 ? styles.activeTab
//                 : styles.tab
//           }
//           onClick={isDisabled ? null : () => this.selectTabIndex(index)}
//         >
//           {tab.label}
//         </div>
//       );
//     });
//   }

//   renderPanel() {
//     const tab = this.props.data[this.state.activeIndex];
//     return <div>{tab.content}</div>;
//   }

//   render() {
//     const tabs = <div style={styles.tabList}>{this.renderTabs()}</div>;
//     const panels = (
//       <div style={styles.tabPanels}>{this.renderPanel()}</div>
//     );

//     return (
//       <div>
//         {this.props.tabsPosition === "bottom"
//           ? [panels, tabs]
//           : [tabs, panels]}
//       </div>
//     );
//   }
// }

const TabsContext = React.createContext();
// TabsContext.Provider
// TabsContext.Consumer // older

class Tabs2 extends React.Component {
  state = { activeIndex: 0 };
  render() {
    return (
      <TabsContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          setActiveIndex: index => this.setState({ activeIndex: index })
        }}
      >
        <div>{this.props.children}</div>
      </TabsContext.Provider>
    );
  }
}

import { useContext } from "react";

function TabList({ children }) {
  const context = useContext(TabsContext);

  return (
    <div style={styles.tabList}>
      {React.Children.map(children, (child, index) => (
        <TabsContext.Provider value={{ ...context, yourIndex: index }}>
          {child}
        </TabsContext.Provider>
      ))}
    </div>
  );
}

function Tab({ children, disabled }) {
  const context = useContext(TabsContext);
  const index = context.yourIndex;

  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : context.activeIndex === index
            ? styles.activeTab
            : styles.tab
      }
      onClick={disabled ? null : () => context.setActiveIndex(index)}
    >
      {children}
    </div>
  );
}

function TabPanels({ children }) {
  const context = useContext(TabsContext);

  return (
    <div>{React.Children.toArray(children)[context.activeIndex]}</div>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

function Tabs({ data, tabsPosition = "top", disabled = [] }) {
  const tabs = (
    <TabList key="list">
      {data.map((item, index) => {
        return (
          <Tab key={index} disabled={disabled.includes(index)}>
            {item.label}
          </Tab>
        );
      })}
    </TabList>
  );

  const panels = (
    <TabPanels key="panels">
      {data.map((item, index) => {
        return <TabPanel key={index}>{item.content}</TabPanel>;
      })}
    </TabPanels>
  );

  return (
    <Tabs2>
      {tabsPosition === "bottom" ? [panels, tabs] : [tabs, panels]}
    </Tabs2>
  );
}

class App extends React.Component {
  render() {
    return (
      <Tabs2>
        <div>
          <TabList>
            <Tab>Tacos</Tab>
            <Tab disabled>Burritos</Tab>
            <Tab>Coconut Korma</Tab>
          </TabList>
        </div>
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
      </Tabs2>
    );

    const tabData = [
      {
        label: "Tacos",
        content: <p>Tacos are delicious</p>
      },
      {
        label: "Burritos",
        content: <p>Sometimes a burrito is what you really need</p>
      },
      {
        label: "Coconut Korma",
        content: <p>Might be your best option</p>
      }
    ];

    return (
      <div>
        <Tabs data={tabData} tabsPosition="bottom" disabled={[1]} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
