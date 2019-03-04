import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

function Tabs({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function renderTabs() {
    return (
      <div style={styles.tabList}>
        {data.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={tab.label}
              style={isActive ? styles.activeTab : styles.tab}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    );
  }

  function renderPanel() {
    const tab = data[activeIndex];
    return <div style={styles.tabPanels}>{tab.content}</div>;
  }

  return (
    <div>
      {renderTabs()}
      {renderPanel()}
    </div>
  );
}

function App() {
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

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// What if I wanted tabs on the bottom?

// function Tabs({ data, tabsPlacement }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   function renderTabs() {
//     return (
//       <div key="tabs" style={styles.tabList}>
//         {data.map((tab, index) => {
//           const isActive = activeIndex === index;
//           return (
//             <div
//               key={tab.label}
//               style={isActive ? styles.activeTab : styles.tab}
//               onClick={() => setActiveIndex(index)}
//             >
//               {tab.label}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   function renderPanel() {
//     const tab = data[activeIndex];
//     return (
//       <div key="panel" style={styles.tabPanels}>
//         {tab.content}
//       </div>
//     );
//   }

//   return (
//     <div>
//       {tabsPlacement === "top"
//         ? [renderTabs(), renderPanel()]
//         : [renderPanel(), renderTabs()]}
//     </div>
//   );
// }

// Tabs.defaultProps = {
//   tabsPlacement: "top"
// };

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
//       <Tabs data={tabData} tabsPlacement="bottom" />
//     </div>
//   );
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

// function Tabs({ data, tabsPlacement, disabled }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   function renderTabs() {
//     return (
//       <div key="tabs" style={styles.tabList}>
//         {data.map((tab, index) => {
//           const isActive = activeIndex === index;
//           const isDisabled = disabled.includes(index);

//           const tabStyles = isDisabled
//             ? styles.disabledTab
//             : isActive
//             ? styles.activeTab
//             : styles.tab;

//           return (
//             <div
//               key={tab.label}
//               style={tabStyles}
//               onClick={
//                 isDisabled ? () => null : () => setActiveIndex(index)
//               }
//             >
//               {tab.label}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   function renderPanel() {
//     const tab = data[activeIndex];
//     return (
//       <div key="panel" style={styles.tabPanels}>
//         {tab.content}
//       </div>
//     );
//   }

//   return (
//     <div>
//       {tabsPlacement === "top"
//         ? [renderTabs(), renderPanel()]
//         : [renderPanel(), renderTabs()]}
//     </div>
//   );
// }

// Tabs.defaultProps = {
//   tabsPlacement: "top",
//   disabled: []
// };

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
//       <Tabs data={tabData} tabsPlacement="bottom" disabled={[1]} />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Feels weird ... whenever your options affect rendering, its a great
// opportunity to create child components instead!

// function Tabs({ children }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   children = React.Children.map(children, child => {
//     if (child.type === TabPanels) {
//       return React.cloneElement(child, {
//         _activeIndex: activeIndex
//       });
//     } else if (child.type === TabList) {
//       return React.cloneElement(child, {
//         _activeIndex: activeIndex,
//         _setActiveIndex: setActiveIndex
//       });
//     } else {
//       return child;
//     }
//   });

//   return children;
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

// function DataTabs({ data, disabled }) {
//   return (
//     <Tabs>
//       <TabList>
//         {data.map((item, index) => (
//           <Tab
//             key={item.label}
//             disabled={disabled.indexOf(index) !== -1}
//           >
//             {item.label}
//           </Tab>
//         ))}
//       </TabList>
//       <TabPanels>
//         {data.map(item => (
//           <TabPanel key={item.label}>{item.content}</TabPanel>
//         ))}
//       </TabPanels>
//     </Tabs>
//   );
// }

// DataTabs.defaultProps = {
//   disabled: []
// };

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
