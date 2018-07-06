///////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use a <Motion> to animate the transition of the red "marker" to its
//   destination when it is dropped
//
// Got extra time?
//
// - If you didn't already, use a custom spring to give the animation
//   an elastic, bouncy feel
// - Add a "drop hint" element that indicates which element will receive
//   the marker when it is dropped to improve usability
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import Draggable from "./components/Draggable";

class DropGrid extends React.Component {
  state = {
    isDraggingMarker: false,
    startX: 0,
    startY: 0,
    mouseX: 0,
    mouseY: 0
  };

  getRelativeXY({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = this.node;

    return {
      x: clientX - offsetLeft,
      y: clientY - offsetTop
    };
  }

  handleDragStart = event => {
    const { x, y } = this.getRelativeXY(event);
    const { offsetLeft, offsetTop } = event.target;

    // Prevent Chrome from displaying a text cursor
    event.preventDefault();

    this.setState({
      isDraggingMarker: true,
      startX: x - offsetLeft,
      startY: y - offsetTop,
      mouseX: x,
      mouseY: y
    });
  };

  handleDrag = event => {
    const { x, y } = this.getRelativeXY(event);

    this.setState({
      mouseX: x,
      mouseY: y
    });
  };

  handleDrop = () => {
    this.setState({ isDraggingMarker: false });
  };

  render() {
    const {
      isDraggingMarker,
      startX,
      startY,
      mouseX,
      mouseY
    } = this.state;

    let markerLeft, markerTop;
    if (isDraggingMarker) {
      markerLeft = mouseX - startX;
      markerTop = mouseY - startY;
    } else {
      markerLeft =
        Math.floor(Math.max(0, Math.min(449, mouseX)) / 150) * 150;
      markerTop =
        Math.floor(Math.max(0, Math.min(449, mouseY)) / 150) * 150;
    }

    const markerStyle = {
      left: markerLeft,
      top: markerTop
    };

    return (
      <div className="grid" ref={node => (this.node = node)}>
        <Draggable
          className="grid-marker"
          style={markerStyle}
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDrop={this.handleDrop}
        />
        <div className="grid-cell">1</div>
        <div className="grid-cell">2</div>
        <div className="grid-cell">3</div>
        <div className="grid-cell">4</div>
        <div className="grid-cell">5</div>
        <div className="grid-cell">6</div>
        <div className="grid-cell">7</div>
        <div className="grid-cell">8</div>
        <div className="grid-cell">9</div>
      </div>
    );
  }
}

ReactDOM.render(<DropGrid />, document.getElementById("app"));
