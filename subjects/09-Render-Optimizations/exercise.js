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

import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as RainbowListDelegate from "./RainbowListDelegate";

function ListViewItem({ children }) {
  return <li>{children}</li>;
}

function ListView({ numRows, rowHeight, renderRowAtIndex }) {
  const scrollAreaRef = useRef();
  const [availableHeight, setAvailableHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    setAvailableHeight(scrollAreaRef.current.clientHeight);
  }, []);

  function handleScroll(event) {
    setScrollTop(event.target.scrollTop);
  }

  const totalHeight = numRows * rowHeight;

  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(availableHeight / rowHeight) + 1,
    numRows
  );

  const items = [];
  let index = startIndex;
  while (index < endIndex) {
    items.push(
      <ListViewItem key={index}>{renderRowAtIndex(index)}</ListViewItem>
    );
    index++;
  }

  return (
    <div
      style={{ height: "100vh", overflowY: "scroll" }}
      onScroll={handleScroll}
      ref={scrollAreaRef}
    >
      <div
        style={{
          height: totalHeight,
          paddingTop: startIndex * rowHeight
        }}
      >
        <ol>{items}</ol>
      </div>
    </div>
  );
}

ReactDOM.render(
  <ListView
    numRows={500000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
