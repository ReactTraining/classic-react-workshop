////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
//
// Got extra time?
//
// Put a <button> in the <App> that selects the 2nd tab when it is clicked.
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

  selectTab(index) {
    this.props.onChange(index);
  }

  renderTabs() {
    return this.props.data.map((tab, index) => {
      const style =
        this.props.activeIndex === index
          ? styles.activeTab
          : styles.tab;

      return (
        <div
          className="Tab"
          key={tab.name}
          style={style}
          onClick={() => this.selectTab(index)}
        >
          {tab.name}
        </div>
      );
    });
  }

  renderPanel() {
    const tab = this.props.data[this.props.activeIndex];

    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
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
  state = {
    activeIndex: 0
  };

  render() {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs
          data={this.props.tabs}
          activeIndex={this.state.activeIndex}
          onChange={index => this.setState({ activeIndex: index })}
        />
      </div>
    );
  }
}

ReactDOM.render(<App tabs={data} />, document.getElementById("app"));

require("./tests").run();
