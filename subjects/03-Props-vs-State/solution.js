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
  state = { activeIndex: 0 };

  goToStep2 = () => this.setState({ activeIndex: 1 });

  render() {
    return (
      <div>
        <h1>Props v. State</h1>

        <button onClick={this.goToStep2}>Go to "Step 2"</button>

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
