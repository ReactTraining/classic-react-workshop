////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
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

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const items = [];

    let index = 0;
    while (index < numRows) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div style={{ height: "100vh", overflowY: "scroll" }}>
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
