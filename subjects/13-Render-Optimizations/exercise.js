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

  state = {
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0
  };

  componentDidMount() {
    this.setState({ clientHeight: this.node.clientHeight });
  }

  handleScroll = event => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;

    this.setState({
      scrollTop,
      scrollHeight,
      clientHeight
    });
  };

  render() {
    const { scrollTop, scrollHeight, clientHeight } = this.state;
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const items = [];

    // HINT: Narrow this down! Don't loop all the way from 0 => n
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(
      numRows,
      startIndex + Math.ceil(clientHeight / rowHeight)
    );

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        ref={node => (this.node = node)}
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.handleScroll}
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
    numRows={500000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
