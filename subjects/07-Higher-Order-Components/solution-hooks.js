////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make the mouse-tracking logic reusable by filling in the `withMouse`
//   higher-order component and returning a new component that renders the
//   given component with a `mouse` prop
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { useState, useEffect, useRef } from "react";

function useMouse() {
  const [position, updatePosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    updatePosition({ x: event.clientX, y: event.clientY });
  }

  return { mouse: position, onMouseMove: handleMouseMove };
}

function useCat(mouse) {
  const [dimensions, updateDimensions] = useState({
    height: 0,
    width: 0
  });
  const catRef = useRef();

  useEffect(() => {
    updateDimensions({
      height: catRef.current.offsetHeight,
      width: catRef.current.offsetWidth
    });
  }, []);

  const { height, width } = dimensions;
  const { x, y } = mouse;
  const style = {
    left: x - width / 2,
    top: y - height / 2
  };

  return <div className="cat" style={style} ref={catRef} />;
}

function App() {
  const { mouse, onMouseMove } = useMouse();
  const cat = useCat(mouse);

  return (
    <div className="container" onMouseMove={onMouseMove}>
      {cat}
      <h1>
        The mouse position is ({mouse.x}, {mouse.y})
      </h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
