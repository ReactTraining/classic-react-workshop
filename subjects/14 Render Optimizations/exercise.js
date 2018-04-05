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

import RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    scrollTop: 0
  };

  handleScroll = event => {
    this.setState({ scrollTop: event.target.scrollTop });
  };

  componentDidMount() {
    this.setState({ availableHeight: this.scroller.offsetHeight });
  }

  render() {
    const { availableHeight, scrollTop } = this.state;
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const items = [];

    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex =
      startIndex + Math.ceil(availableHeight / rowHeight);

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.handleScroll}
        ref={node => (this.scroller = node)}
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
}

ReactDOM.render(
  <ListView
    numRows={1000000000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
