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
import * as RainbowListDelegate from "./RainbowListDelegate";

function ListView({ numRows, rowHeight, renderRowAtIndex }) {
  // TODO: What state do you need?

  function handleScroll(event) {
    // TODO: Use `event.target.scrollTop` to read the current scroll position
    // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
  }

  const totalHeight = numRows * rowHeight;

  // TODO: Make these numbers smaller (what's on the screen)
  // so we don't render everything, just what's in view
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
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <ol>{items}</ol>
      </div>
    </div>
  );
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
