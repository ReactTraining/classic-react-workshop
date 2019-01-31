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
    state = { height: 0, width: 0 };

    componentDidMount() {
      this.setState({
        height: this.node.offsetHeight,
        width: this.node.offsetWidth
      });
    }

    render() {
      const { height, width } = this.state;
      const { x, y } = this.props.mouse;

      const style = {
        left: x - width / 2,
        top: y - height / 2
      };

      return (
        <React.Fragment>
          <div
            className="cat"
            style={style}
            ref={node => (this.node = node)}
          />
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  };
}

class App extends React.Component {
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
