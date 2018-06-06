import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class ContentToggle extends React.Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    children: PropTypes.node.isRequired
  };

  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });

    if (this.props.onToggle) {
      this.props.onToggle();
    }
  };

  render() {
    let summaryClassName = "content-toggle-summary";

    if (this.state.isOpen) {
      summaryClassName += " content-toggle-summary-open";
    }

    return (
      <div className="content-toggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        {this.state.isOpen && (
          <div className="content-toggle-details">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

// Why React? These are the fundamentals:
// 1. It's Just JavaScript
// 2. Encapsulation (markup + state + behavior)
// 3. Declarative code!

class ToggleTracker extends React.Component {
  state = { numToggles: 0 };

  handleToggle = () => {
    this.setState({ numToggles: this.state.numToggles + 1 });
  };

  render() {
    return (
      <div>
        <p>Number of toggles: {this.state.numToggles}</p>

        <ContentToggle summary="Tacos" onToggle={this.handleToggle}>
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </ContentToggle>
        <ContentToggle summary="Burritos">
          <p>
            A burrito is like a rolled-up tostada. More food for your
            money.
          </p>
        </ContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ToggleTracker />, document.getElementById("app"));
