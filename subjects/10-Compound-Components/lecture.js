import React from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

class Tabs extends React.Component {
  state = { activeIndex: 0 };

  selectTabIndex(activeIndex) {
    this.setState({ activeIndex });
  }

  renderTabs() {
    return this.props.data.map((tab, index) => {
      const isActive = this.state.activeIndex === index;
      return (
        <div
          key={tab.label}
          style={isActive ? styles.activeTab : styles.tab}
          onClick={() => this.selectTabIndex(index)}
        >
          {tab.label}
        </div>
      );
    });
  }

  renderPanel() {
    const tab = this.props.data[this.state.activeIndex];
    return <div>{tab.content}</div>;
  }

  render() {
    return (
      <div>
        <div style={styles.tabList}>{this.renderTabs()}</div>
        <div style={styles.tabPanels}>{this.renderPanel()}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
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
        <Tabs data={tabData} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// What if I wanted tabs on the bottom?

// class Tabs extends React.Component {
//   static defaultProps = {
//     tabsPlacement: "top"
//   };

//   state = { activeIndex: 0 };

//   selectTabIndex(activeIndex) {
//     this.setState({ activeIndex });
//   }

//   renderTabs() {
//     return this.props.data.map((tab, index) => {
//       const isActive = this.state.activeIndex === index;
//       return (
//         <div
//           key={tab.label}
//           style={isActive ? styles.activeTab : styles.tab}
//           onClick={() => this.selectTabIndex(index)}
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
//     const tabs = (
//       <div key="tabs" style={styles.tabList}>
//         {this.renderTabs()}
//       </div>
//     );
//     const panels = (
//       <div key="panel" style={styles.tabPanels}>
//         {this.renderPanel()}
//       </div>
//     );
//     return (
//       <div>
//         {this.props.tabsPlacement === "top"
//           ? [tabs, panels]
//           : [panels, tabs]}
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   render() {
//     const tabData = [
//       {
//         label: "Tacos",
//         content: <p>Tacos are delicious</p>
//       },
//       {
//         label: "Burritos",
//         content: <p>Sometimes a burrito is what you really need</p>
//       },
//       {
//         label: "Coconut Korma",
//         content: <p>Might be your best option</p>
//       }
//     ];

//     return (
//       <div>
//         <Tabs data={tabData} tabsPlacement="bottom" />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// That wasn't too bad, but it added a lot of complexity for something that
// didn't seem to warrant that much of a change
//
// - render is less obvious
// - have to use keys, or wrap stuff in extra divs
// - adding another option that has to do with rendering will add even more
//   complexity

////////////////////////////////////////////////////////////////////////////////
// Lets add "disabled" to a tab, what does jQuery UI do?
// https://api.jqueryui.com/tabs/#option-disabled

// class Tabs extends React.Component {
//   static defaultProps = {
//     tabsPlacement: "top",
//     disabled: []
//   };

//   state = { activeIndex: 0 };

//   selectTabIndex(activeIndex) {
//     this.setState({ activeIndex });
//   }

//   renderTabs() {
//     return this.props.data.map((tab, index) => {
//       const isActive = this.state.activeIndex === index;
//       const isDisabled = this.props.disabled.indexOf(index) !== -1;
//       const props = {
//         key: tab.label,
//         style: isDisabled
//           ? styles.disabledTab
//           : isActive ? styles.activeTab : styles.tab,
//         onClick: isDisabled ? null : () => this.selectTabIndex(index)
//       };
//       return <div {...props}>{tab.label}</div>;
//     });
//   }

//   renderPanel() {
//     const tab = this.props.data[this.state.activeIndex];
//     return <div>{tab.content}</div>;
//   }

//   render() {
//     const tabs = (
//       <div key="tabs" style={styles.tabList}>
//         {this.renderTabs()}
//       </div>
//     );
//     const panels = (
//       <div key="panel" style={styles.tabPanels}>
//         {this.renderPanel()}
//       </div>
//     );
//     return (
//       <div>
//         {this.props.tabsPlacement === "top"
//           ? [tabs, panels]
//           : [panels, tabs]}
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   render() {
//     const tabData = [
//       {
//         label: "Tacos",
//         content: <p>Tacos are delicious</p>
//       },
//       {
//         label: "Burritos",
//         content: <p>Sometimes a burrito is what you really need</p>
//       },
//       {
//         label: "Coconut Korma",
//         content: <p>Might be your best option</p>
//       }
//     ];

//     return (
//       <div>
//         <Tabs data={tabData} tabsPlacement="top" disabled={[1]} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Feels weird ... whenever your options affect rendering, its a great
// opportunity to create child components instead!

// function TabList({ children, _activeIndex, _onTabSelect }) {
//   return (
//     <div style={styles.tabs}>
//       {React.Children.map(children, (child, index) => {
//         return React.cloneElement(child, {
//           _isActive: index === _activeIndex,
//           _onSelect: () => _onTabSelect(index)
//         });
//       })}
//     </div>
//   );
// }

// function Tab({ children, disabled, _isActive, _onSelect }) {
//   return (
//     <div
//       style={
//         disabled
//           ? styles.disabledTab
//           : _isActive ? styles.activeTab : styles.tab
//       }
//       onClick={disabled ? null : _onSelect}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children, _activeIndex }) {
//   return (
//     <div style={styles.tabPanels}>
//       {React.Children.toArray(children)[_activeIndex]}
//     </div>
//   );
// }

// function TabPanel({ children }) {
//   return <div>{children}</div>;
// }

// class Tabs extends React.Component {
//   state = { activeIndex: 0 };

//   render() {
//     const children = React.Children.map(
//       this.props.children,
//       (child, index) => {
//         if (child.type === TabPanels) {
//           return React.cloneElement(child, {
//             _activeIndex: this.state.activeIndex
//           });
//         } else if (child.type === TabList) {
//           return React.cloneElement(child, {
//             _activeIndex: this.state.activeIndex,
//             _onTabSelect: index => this.setState({ activeIndex: index })
//           });
//         } else {
//           return child;
//         }
//       }
//     );

//     return <div>{children}</div>;
//   }
// }

// function App() {
//   return (
//     <div>
//       <Tabs>
//         <TabList>
//           <Tab>Tacos</Tab>
//           <Tab disabled>Burritos</Tab>
//           <Tab>Coconut Korma</Tab>
//         </TabList>
//         <TabPanels>
//           <TabPanel>
//             <p>Tacos are delicious</p>
//           </TabPanel>
//           <TabPanel>
//             <p>Sometimes a burrito is what you really need</p>
//           </TabPanel>
//           <TabPanel>
//             <p>Might be your best option</p>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Now this is really flexible
//
// - can change order of panels v. tabs
// - can pass in our own styles to tabs
// - can even have unrelated elements inside
// - in other words, we now have control over rendering while
//   Tabs handles the interaction
//
// Oh but you really loved the old tabs yeah?

// class DataTabs extends React.Component {
//   static defaultProps = {
//     disabled: []
//   };

//   render() {
//     return (
//       <Tabs>
//         <TabList>
//           {this.props.data.map((item, index) => (
//             <Tab
//               key={item.label}
//               disabled={this.props.disabled.indexOf(index) !== -1}
//             >
//               {item.label}
//             </Tab>
//           ))}
//         </TabList>
//         <TabPanels>
//           {this.props.data.map(item => (
//             <TabPanel key={item.label}>{item.content}</TabPanel>
//           ))}
//         </TabPanels>
//       </Tabs>
//     );
//   }
// }

// function App() {
//   const tabData = [
//     {
//       label: "Tacos",
//       content: <p>Tacos are delicious</p>
//     },
//     {
//       label: "Burritos",
//       content: <p>Sometimes a burrito is what you really need</p>
//     },
//     {
//       label: "Coconut Korma",
//       content: <p>Might be your best option</p>
//     }
//   ];

//   return (
//     <div>
//       <DataTabs data={tabData} />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Instead of creating a handful of options, compose several components together
// and then compose them together into their own components.
//
// A really awesome library that does this is react-soundplayer
