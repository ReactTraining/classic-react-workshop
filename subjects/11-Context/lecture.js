import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  children = React.Children.map(children, child => {
    if (child.type === TabPanels) {
      return React.cloneElement(child, {
        _activeIndex: activeIndex
      });
    } else if (child.type === TabList) {
      return React.cloneElement(child, {
        _activeIndex: activeIndex,
        _setActiveIndex: setActiveIndex
      });
    } else {
      return child;
    }
  });

  return children;
}

function TabList({ children, _activeIndex, _setActiveIndex }) {
  children = React.Children.map(children, (child, index) => {
    const _isActive = _activeIndex === index;
    return React.cloneElement(child, {
      _isActive,
      _selectTab: () => _setActiveIndex(index)
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

function TabPanels({ children, _activeIndex }) {
  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[_activeIndex]}
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

////////////////////////////////////////////////////////////////////////////////
// Sometimes you don't want to specify how deep in the view tree the child
// components need to be, our current implementation expects TabList/TabPanels
// to be immediate children of Tabs, also Tab and TabPanel are required to be
// immediate children of their parent components. We really only care about the
// interactivity between the components, not their hierarchy.
//
// We could recursively check children with each render, which seems like a bad
// plan, so instead we can use a feature called "context".
//
// Wrapping <TabPanels> in a div breaks everything! Instead of using
// cloneElement, let's use context to pass the activeIndex down.

// const TabsContext = React.createContext();

// function Tabs({ children }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   children = React.Children.map(children, child => {
//     if (child.type === TabList) {
//       return React.cloneElement(child, {
//         _activeIndex: activeIndex,
//         _setActiveIndex: setActiveIndex
//       });
//     } else {
//       return child;
//     }
//   });

//   return (
//     <TabsContext.Provider value={{ activeIndex }}>
//       {children}
//     </TabsContext.Provider>
//   );
// }

// function TabList({ children, _activeIndex, _setActiveIndex }) {
//   children = React.Children.map(children, (child, index) => {
//     const _isActive = _activeIndex === index;
//     return React.cloneElement(child, {
//       _isActive,
//       _selectTab: () => _setActiveIndex(index)
//     });
//   });
//   return <div style={styles.tabList}>{children}</div>;
// }

// function Tab({ children, disabled, _isActive, _selectTab }) {
//   const tabStyles = disabled
//     ? styles.disabledTab
//     : _isActive
//     ? styles.activeTab
//     : styles.tab;

//   return (
//     <div
//       style={tabStyles}
//       onClick={disabled ? () => null : () => _selectTab()}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children }) {
//   const context = useContext(TabsContext);
//   return (
//     <div style={styles.tabPanels}>
//       {React.Children.toArray(children)[context.activeIndex]}
//     </div>
//   );
// }

// function TabPanel({ children }) {
//   return <div>{children}</div>;
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
// Wrapping <TabList> also breaks (no more active styles), lets check context
// for the activeIndex and the click handler instead of props.

// const TabsContext = React.createContext();

// function Tabs({ children }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
//       {children}
//     </TabsContext.Provider>
//   );
// }

// function TabList({ children }) {
//   const context = useContext(TabsContext);

//   children = React.Children.map(children, (child, index) => {
//     return React.cloneElement(child, {
//       _selectTab: () => context.setActiveIndex(index)
//     });
//   });
//   return <div style={styles.tabList}>{children}</div>;
// }

// function Tab({ children, disabled, _selectTab }) {
//   const context = useContext(TabsContext);

//   const tabStyles = disabled
//     ? styles.disabledTab
//     : context.isActive
//     ? styles.activeTab
//     : styles.tab;

//   return (
//     <div
//       style={tabStyles}
//       onClick={disabled ? () => null : () => _selectTab()}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children }) {
//   const context = useContext(TabsContext);
//   return (
//     <div style={styles.tabPanels}>
//       {React.Children.toArray(children)[context.activeIndex]}
//     </div>
//   );
// }

// function TabPanel({ children }) {
//   return <div>{children}</div>;
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
