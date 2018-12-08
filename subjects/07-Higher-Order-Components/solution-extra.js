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
  return class extends React.Component {
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
  return class extends React.Component {
    state = { top: 0, left: 0 };

    componentDidUpdate(prevProps) {
      const { mouse } = this.props;

      if (
        mouse.x !== prevProps.mouse.x ||
        mouse.y !== prevProps.mouse.y
      ) {
        this.setState({
          top: mouse.y - Math.round(this.node.offsetHeight / 2),
          left: mouse.x - Math.round(this.node.offsetWidth / 2)
        });
      }
    }

    render() {
      return (
        <div>
          <div
            ref={node => (this.node = node)}
            className="cat"
            style={this.state}
          />
          <Component {...this.props} />
        </div>
      );
    }
  };
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    const { x, y } = this.props.mouse;

    return (
      <div className="container">
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
