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

function withMouse(Component) {
  return class WithMouse extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = event => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  };
}

function withCat(Component) {
  return class WithCat extends React.Component {
    render() {
      const { mouse } = this.props;
      const style = { top: mouse.y, left: mouse.x };

      return (
        <React.Fragment>
          <div className="cat" style={style} />
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  };
}

class App extends React.Component {
  render() {
    const { message } = this.props;
    const { x, y } = this.props.mouse;

    return (
      <div className="container">
        <h1>
          The mouse position is ({x}, {y})
        </h1>
        <p>The message is: {message}</p>
      </div>
    );
  }
}

const EnhancedApp = withMouse(withCat(App));

ReactDOM.render(
  <EnhancedApp message="hello everyone" />,
  document.getElementById("app")
);
