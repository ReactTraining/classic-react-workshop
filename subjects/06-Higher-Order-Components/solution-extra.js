////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";

function withMouse(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
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
    state = { width: 0, height: 0, x: 0, y: 0 };

    componentDidMount() {
      this.setState({
        width: this.node.offsetWidth,
        height: this.node.offsetHeight
      });
    }

    componentDidUpdate(prevProps) {
      const { mouse } = this.props;

      if (
        mouse.x !== prevProps.mouse.x ||
        mouse.y !== prevProps.mouse.y
      )
        this.setState(mouse);
    }

    render() {
      const catStyle = {
        top: spring(this.state.y - Math.round(this.state.height / 2)),
        left: spring(this.state.x - Math.round(this.state.width / 2))
      };

      return (
        <div style={{ height: "100%" }}>
          <Motion style={catStyle}>
            {style => (
              <div
                className="cat"
                style={style}
                ref={node => (this.node = node)}
              />
            )}
          </Motion>
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
    const { mouse } = this.props;

    return (
      <div className="container">
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
