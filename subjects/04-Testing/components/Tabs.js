import React, { useState } from "react";

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

export default function Tabs({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = data.map((item, index) => {
    let isActive = index === activeIndex;
    let style = isActive ? styles.activeTab : styles.tab;

    return (
      <div
        key={index}
        className="Tab"
        style={style}
        onClick={() => setActiveIndex(index)}
      >
        {item.name}
      </div>
    );
  });

  return (
    <div className="Tabs">
      {tabs}
      <div className="TabPanel" style={styles.panel}>
        {data[activeIndex].description}
      </div>
    </div>
  );
}
