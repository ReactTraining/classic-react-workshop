import "./ContentToggle.css";

import React from "react";

class ContentToggle extends React.Component {
  handleClick = () => {
    if (this.props.onToggle) {
      this.props.onToggle(!this.props.isOpen);
    }
  };

  render() {
    let summaryClassName = "content-toggle-summary";

    if (this.props.isOpen) {
      summaryClassName += " content-toggle-summary-open";
    }

    return (
      <div {...this.props} className="content-toggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        <div className="content-toggle-details">
          {this.props.isOpen && this.props.children}
        </div>
      </div>
    );
  }
}

export default ContentToggle;
