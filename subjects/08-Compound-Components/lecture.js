import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";

// class Tabs extends React.Component {
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
//     return <div>{tab.description}</div>;
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

class Tabs2 extends React.Component {
  state = { activeIndex: 0 };

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child.type === TabList) {
        return React.cloneElement(child, {
          _activeTabIndex: this.state.activeIndex,
          _onTabSelect: index => this.setState({ activeIndex: index })
        });
      } else if (child.type === TabPanels) {
        return React.cloneElement(child, {
          _activeTabIndex: this.state.activeIndex
        });
      } else {
        return child;
      }
    });

    return <div>{children}</div>;
  }
}

function TabList({ children, _activeTabIndex, _onTabSelect }) {
  return (
    <div style={styles.tabList}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          _isActive: index === _activeTabIndex,
          _onSelect: () => _onTabSelect(index)
        });
      })}
    </div>
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

function TabPanels({ children, _activeTabIndex }) {
  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[_activeTabIndex]}
    </div>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

function Tabs({ data, tabsPosition, disabled }) {
  const tabs = (
    <TabList>
      {data.map((item, index) => (
        <Tab disabled={disabled.includes(index)}>{item.label}</Tab>
      ))}
    </TabList>
  );

  const panels = (
    <TabPanels>
      {data.map(item => <TabPanel>{item.description}</TabPanel>)}
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
    // return (
    //   <Tabs2>
    //     <TabList>
    //       <Tab>Tacos</Tab>
    //       <Tab disabled>Burritos</Tab>
    //       <Tab>Coconut Korma</Tab>
    //     </TabList>
    //     <TabPanels>
    //       <TabPanel>
    //         <p>Tacos are delicious</p>
    //       </TabPanel>
    //       <TabPanel>
    //         <p>Sometimes a burrito is what you really need</p>
    //       </TabPanel>
    //       <TabPanel>
    //         <p>Might be your best option</p>
    //       </TabPanel>
    //     </TabPanels>
    //   </Tabs2>
    // );

    const tabData = [
      {
        label: "Tacos",
        description: <p>Tacos are delicious</p>
      },
      {
        label: "Burritos",
        description: <p>Sometimes a burrito is what you really need</p>
      },
      {
        label: "Coconut Korma",
        description: <p>Might be your best option</p>
      }
    ];

    return (
      <div>
        <Tabs data={tabData} tabsPosition="bubblegum" disabled={[1]} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
