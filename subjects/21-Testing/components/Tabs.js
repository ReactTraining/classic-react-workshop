import React from "react";

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

class Tabs extends React.Component {
  state = { activeIndex: 0 };

  selectIndex(activeIndex) {
    this.setState({ activeIndex });
  }

  render() {
    const { data } = this.props;

    const tabs = data.map((tab, index) => {
      const isActive = index === this.state.activeIndex;
      const style = isActive ? styles.activeTab : styles.tab;

      return (
        <div
          key={tab.label}
          className="Tab"
          style={style}
          onClick={() => this.selectIndex(index)}
        >
          {tab.label}
        </div>
      );
    });

    return (
      <div>
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {data[this.state.activeIndex].content}
        </div>
      </div>
    );
  }
}

export default Tabs;
