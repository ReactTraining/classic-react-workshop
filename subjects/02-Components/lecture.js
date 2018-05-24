import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// MSB = state, markup, behavior
// MVC = model, view, controller

class ContentToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = () => {
      this.setState({ isOpen: !this.state.isOpen });

      if (this.props.onToggle) {
        this.props.onToggle();
      }
    };
  }

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

ContentToggle.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func
};

class ToggleTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numToggles: 0 };
    this.handleToggle = () => {
      this.setState({ numToggles: this.state.numToggles + 1 });
    };
  }

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
        <ContentToggle summary="Burritos" onToggle={this.handleToggle}>
          <p>It's like a big rolled up taco (see taco above)</p>
        </ContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ToggleTracker />, document.getElementById("app"));
