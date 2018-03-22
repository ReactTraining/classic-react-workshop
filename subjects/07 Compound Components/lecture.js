import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as styles from "./styles";

// class Tabs extends React.Component {
//   state = {
//     activeIndex: 0
//   };

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
//               : isActive ? styles.activeTab : styles.tab
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
//     const tabList = (
//       <div style={styles.tabList}>{this.renderTabs()}</div>
//     );
//     const tabPanels = (
//       <div style={styles.tabPanels}>{this.renderPanel()}</div>
//     );

//     return (
//       <div>
//         {this.props.tabsOnBottom
//           ? [tabPanels, tabList]
//           : [tabList, tabPanels]}
//       </div>
//     );
//   }
// }

class NewTabs extends React.Component {
  state = { activeIndex: 0 };

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child.type === TabList) {
        return React.cloneElement(child, {
          _activeIndex: this.state.activeIndex,
          _onSelectTab: index => this.setState({ activeIndex: index })
        });
      } else if (child.type === TabPanels) {
        return React.cloneElement(child, {
          _activeIndex: this.state.activeIndex
        });
      } else {
        return child;
      }
    });

    return <div>{children}</div>;
  }
}

function TabList({ children, _activeIndex, _onSelectTab }) {
  return (
    <div style={styles.tabList}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          _isActive: _activeIndex === index,
          _onSelect: () => _onSelectTab(index)
        })
      )}
    </div>
  );
}

function Tab({ children, disabled, _isActive, _onSelect }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : _isActive ? styles.activeTab : styles.tab
      }
      onClick={disabled ? null : _onSelect}
    >
      {children}
    </div>
  );
}

function TabPanels({ children, _activeIndex }) {
  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[_activeIndex]}
    </div>
  );
}

function TabPanel({ children }) {
  return <div style={styles.tabPanel}>{children}</div>;
}

function Tabs({ data, tabsOnBottom, disabled }) {
  const tabList = (
    <TabList>
      {data.map((item, index) => (
        <Tab key={index} disabled={disabled.includes(index)}>
          {item.label}
        </Tab>
      ))}
    </TabList>
  );

  const tabPanels = (
    <TabPanels>
      {data.map((item, index) => (
        <TabPanel key={index}>{item.description}</TabPanel>
      ))}
    </TabPanels>
  );

  return (
    <NewTabs>
      {tabsOnBottom ? [tabPanels, tabList] : [tabList, tabPanels]}
    </NewTabs>
  );
}

class App extends React.Component {
  render() {
    // return (
    //   <NewTabs>
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
    //   </NewTabs>
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
        <Tabs data={tabData} tabsOnBottom={true} disabled={[1]} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// What if I wanted tabs on the bottom?

//class Tabs extends React.Component {
//  static defaultProps = {
//    tabsPlacement: 'top'
//  }
//
//  state = {
//    activeIndex: 0
//  }
//
//  selectTabIndex(activeIndex) {
//    this.setState({ activeIndex })
//  }
//
//  renderTabs() {
//    return this.props.data.map((tab, index) => {
//      const isActive = this.state.activeIndex === index
//      return (
//        <div
//          key={tab.label}
//          style={isActive ? styles.activeTab : styles.tab}
//          onClick={() => this.selectTabIndex(index)}
//        >{tab.label}</div>
//      )
//    })
//  }
//
//  renderPanel() {
//    const tab = this.props.data[this.state.activeIndex]
//    return (
//      <div>
//        <p>{tab.description}</p>
//      </div>
//    )
//  }
//
//  render() {
//    const tabs = (
//      <div key="tabs" style={styles.tabList}>
//        {this.renderTabs()}
//      </div>
//    )
//    const panel = (
//      <div key="panel" style={styles.tabPanels}>
//        {this.renderPanel()}
//      </div>
//    )
//    return (
//      <div>
//        {this.props.tabsPlacement === 'top' ?
//          [tabs, panel] :
//          [panel, tabs]
//        }
//      </div>
//    )
//  }
//}
//
//class App extends React.Component {
//  render() {
//    const tabData = [
//      { label: 'Tacos',
//        description: <p>Tacos are delicious</p>
//      },
//      { label: 'Burritos',
//        description: <p>Sometimes a burrito is what you really need</p>
//      },
//      { label: 'Coconut Korma',
//        description: <p>Might be your best option</p>
//      }
//    ]
//
//    return (
//      <div>
//        <Tabs data={tabData} tabsPlacement="bottom"/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

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

//class Tabs extends React.Component {
//  static defaultProps = {
//    tabsPlacement: 'top',
//    disabled: []
//  }
//
//  state = {
//    activeIndex: 0
//  }
//
//  selectTabIndex(activeIndex) {
//    this.setState({ activeIndex })
//  }
//
//  renderTabs() {
//    return this.props.data.map((tab, index) => {
//      const isActive = this.state.activeIndex === index
//      const isDisabled = this.props.disabled.indexOf(index) !== -1
//      const props = {
//        key: tab.label,
//        style: isDisabled ? styles.disabledTab : (
//          isActive ? styles.activeTab : styles.tab
//        )
//      }
//      if (!isDisabled)
//        props.onClick = () => this.selectTabIndex(index)
//      return <div {...props}>{tab.label}</div>
//    })
//  }
//
//  renderPanel() {
//    const tab = this.props.data[this.state.activeIndex]
//    return (
//      <div>
//        <p>{tab.description}</p>
//      </div>
//    )
//  }
//
//  render() {
//    const tabs = (
//      <div key="tabs" style={styles.tabList}>
//        {this.renderTabs()}
//      </div>
//    )
//    const panel = (
//      <div key="panel" style={styles.tabPanels}>
//        {this.renderPanel()}
//      </div>
//    )
//    return (
//      <div>
//        {this.props.tabsPlacement === 'top' ?
//          [tabs, panel] :
//          [panel, tabs]
//        }
//      </div>
//    )
//  }
//}
//
//class App extends React.Component {
//  render() {
//    const tabData = [
//      { label: 'Tacos',
//        description: <p>Tacos are delicious</p>
//      },
//      { label: 'Burritos',
//        description: <p>Sometimes a burrito is what you really need</p>
//      },
//      { label: 'Coconut Korma',
//        description: <p>Might be your best option</p>
//      }
//    ]
//
//    return (
//      <div>
//        <Tabs
//          data={tabData}
//          tabsPlacement="top"
//          disabled={[ 1 ]}
//        />
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Feels weird ... whenever your options affect rendering, its a great
// opportunity to create child components instead

//class TabList extends React.Component {
//  render() {
//    const children = React.Children.map(this.props.children, (child, index) => {
//      return React.cloneElement(child, {
//        isActive: index === this.props.activeIndex,
//        onClick: () => this.props.onActivate(index)
//      })
//    })
//
//    return <div style={styles.tabs}>{children}</div>
//  }
//}
//
//class Tab extends React.Component {
//  render() {
//    return (
//      <div
//        onClick={this.props.isDisabled ? null : this.props.onClick}
//        style={this.props.isDisabled ? styles.disabledTab : (
//          this.props.isActive ? styles.activeTab : styles.tab
//        )}
//      >
//        {this.props.children}
//      </div>
//    )
//  }
//}
//
//class TabPanels extends React.Component {
//  render() {
//    return (
//      <div style={styles.tabPanels}>
//        {this.props.children[this.props.activeIndex]}
//      </div>
//    )
//  }
//}
//
//class TabPanel extends React.Component {
//  render() {
//    return <div>{this.props.children}</div>
//  }
//}
//
//class Tabs extends React.Component {
//  state = {
//    activeIndex: 0
//  }
//
//  render() {
//    const children = React.Children.map(this.props.children, (child, index) => {
//      if (child.type === TabPanels) {
//        return React.cloneElement(child, {
//          activeIndex: this.state.activeIndex
//        })
//      } else if (child.type === TabList) {
//        return React.cloneElement(child, {
//          activeIndex: this.state.activeIndex,
//          onActivate: (activeIndex) => this.setState({ activeIndex })
//        })
//      } else {
//        return child
//      }
//    })
//
//    return <div>{children}</div>
//  }
//}
//
//class App extends React.Component {
//  render() {
//    return (
//      <div>
//        <Tabs>
//          <TabList>
//            <Tab>Tacos</Tab>
//            <Tab isDisabled>Burritos</Tab>
//            <Tab>Coconut Korma</Tab>
//          </TabList>
//
//          <TabPanels>
//            <TabPanel>
//              <p>Tacos are delicious</p>
//            </TabPanel>
//            <TabPanel>
//              <p>Sometimes a burrito is what you really need</p>
//            </TabPanel>
//            <TabPanel>
//              <p>Might be your best option</p>
//            </TabPanel>
//          </TabPanels>
//        </Tabs>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

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

//class DataTabs extends React.Component {
//  static defaultProps = {
//    disabled: []
//  }
//
//  render() {
//    return (
//      <Tabs>
//        <TabList>
//          {this.props.data.map((item, index) => (
//            <Tab key={item.label} disabled={this.props.disabled.indexOf(index) !== -1}>
//              {item.label}
//            </Tab>
//          ))}
//        </TabList>
//
//        <TabPanels>
//          {this.props.data.map((item) => (
//            <TabPanel key={item.label}>{item.description}</TabPanel>
//          ))}
//        </TabPanels>
//      </Tabs>
//    )
//  }
//}
//
//class App extends React.Component {
//  render() {
//    const tabData = [
//      { label: 'Tacos',
//        description: <p>Tacos are delicious</p>
//      },
//      { label: 'Burritos',
//        description: <p>Sometimes a burrito is what you really need</p>
//      },
//      { label: 'Coconut Korma',
//        description: <p>Might be your best option</p>
//      }
//    ]
//
//    return (
//      <div>
//        <DataTabs data={tabData}/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Instead of creating a handful of options, compose several components together
// and then compose them together into their own components.
//
// A really awesome library that does this is react-soundplayer
