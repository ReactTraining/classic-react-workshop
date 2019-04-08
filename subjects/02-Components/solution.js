////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each sport with its name in the tab
// - When you click on a tab, make it appear to be active while
//   the others appear inactive
// - Render the description for the selected tab in the panel
//
// Got extra time?
//
// - Add descriptive propTypes to <App> and <Tabs>
////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import ReactDOM from "react-dom";

const styles = {};

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10
};

function Tabs({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = data.map((item, index) => {
    const isActive = index === activeIndex;
    const style = isActive ? styles.activeTab : styles.tab;

    return (
      <div
        key={item.id}
        className="Tab"
        style={style}
        onClick={() => setActiveIndex(index)}
      >
        {item.name}
      </div>
    );
  });

  const activeItem = data[activeIndex];

  return (
    <div className="Tabs">
      {tabs}
      <div className="TabPanel" style={styles.panel}>
        {activeItem && activeItem.description}
      </div>
    </div>
  );
}

function App({ sports }) {
  return (
    <div>
      <h1>Sports</h1>
      <Tabs data={sports} />
    </div>
  );
}

const DATA = [
  {
    id: 1,
    name: "Soccer",
    description:
      "Association football, more commonly known as football or soccer, is a team sport played between two teams of eleven players with a spherical ball. It is played by 250 million players in over 200 countries and dependencies, making it the world's most popular sport."
  },
  {
    id: 2,
    name: "Baseball",
    description:
      "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding. The game proceeds when a player on the fielding team, called the pitcher, throws a ball which a player on the batting team tries to hit with a bat."
  },
  {
    id: 3,
    name: "Tennis",
    description:
      "Tennis is a racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles). Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponent's court."
  }
];

ReactDOM.render(<App sports={DATA} />, document.getElementById("app"));

require("./tests").run();
