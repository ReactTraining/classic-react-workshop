import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class ContentToggle extends React.Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onToggle: PropTypes.func
  };

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

class ToggleTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleToggle = () => {
      this.setState({ count: this.state.count + 1 });
    };
  }

  render() {
    return (
      <div>
        <p>The number of toggles is: {this.state.count}</p>

        <ContentToggle summary="Tacos" onToggle={this.handleToggle}>
          <p>A taco ...</p>
          <p>A taco ...</p>
          <p>A taco ...</p>
          <p>A taco ...</p>
          <p>A taco ...</p>
        </ContentToggle>
        <ContentToggle summary="Burritos">
          <h1>A burrito ...</h1>
        </ContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ToggleTracker />, document.getElementById("app"));
