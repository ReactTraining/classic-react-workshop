////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make the "Go to Step 2" button work.
//
// In order to do this, you'll have to make tabs a "pure component" so that it
// no longer manages its own state. Instead add a prop to tell it which tab to
// show, and then move the state up to the <App>.
//
// Also, be sure that clicking on the individual tabs still works.
//
// Got extra time?
//
// Refactor <Tabs> from a class into a pure function that takes props as an
// argument and returns an element (JSX).
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";
import data from "./data";

class Tabs extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const tabs = this.props.data.map((item, index) => {
      const isActive = index === this.props.activeIndex;
      const style = isActive ? styles.activeTab : styles.tab;

      return (
        <div
          key={index}
          className="Tab"
          style={style}
          onClick={() => this.props.onChange(index)}
        >
          {item.name}
        </div>
      );
    });

    const activeItem = this.props.data[this.props.activeIndex];

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

class App extends React.Component {
  state = { activeIndex: 0 };

  selectTab = index => this.setState({ activeIndex: index });

  render() {
    return (
      <div>
        <h1>Props v. State</h1>

        <button onClick={() => this.selectTab(1)}>
          Go to "Step 2"
        </button>

        <Tabs
          data={this.props.tabs}
          activeIndex={this.state.activeIndex}
          onChange={this.selectTab}
        />
      </div>
    );
  }
}

ReactDOM.render(<App tabs={data} />, document.getElementById("app"));

require("./tests").run();
