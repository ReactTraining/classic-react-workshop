////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Modify <ListView> so that it only renders the list items that are visible
//   in the viewport
// - Crank up <ListView numRows> to a huge number to test your solution!
//
// Got extra time?
//
// - Adjust the number of rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  // TODO: What state do you need?

  handleScroll = event => {
    // TODO: Use `event.target.scrollTop` to read the current scroll position
    // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
  };

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    // TODO: Make these numbers closer together
    const startIndex = 0;
    const endIndex = numRows;

    const items = [];

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.handleScroll}
      >
        <div style={{ height: totalHeight }}>
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
