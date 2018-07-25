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

  selectTab(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    const tabs = this.props.data.map((item, index) => {
      const isActive = index === this.state.activeIndex;
      const style = isActive ? styles.activeTab : styles.tab;

      return (
        <div
          key={item.id}
          className="Tab"
          style={style}
          onClick={() => this.selectTab(index)}
        >
          {item.name}
        </div>
      );
    });

    const activeItem = this.props.data[this.state.activeIndex];

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {activeItem && activeItem.description}
        </div>
      </div>
    );
  }
}

export default Tabs;
