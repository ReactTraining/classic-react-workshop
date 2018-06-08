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
import PropTypes from "prop-types";

// HOC gripes :/
// 1. conceptually difficult to understand + explain
// 2. there's a lot of ceremony when you create them
// 3. potential for naming collisions
// 4. static composition, instead of dynamic (tree keeps growing!)

function withCat(Component) {
  return class Cat extends React.Component {
    static propTypes = {
      mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    };

    state = { width: 0, height: 0 };

    componentDidMount() {
      this.setState({
        width: this.catNode.offsetWidth,
        height: this.catNode.offsetHeight
      });
    }

    render() {
      const { mouse } = this.props;
      const { width, height } = this.state;

      const style = {
        top: mouse.y - height / 2,
        left: mouse.x - width / 2
      };

      return (
        <div>
          <div
            className="cat"
            style={style}
            ref={node => (this.catNode = node)}
          />
          <Component {...this.props} />
        </div>
      );
    }
  };
}

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

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
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
