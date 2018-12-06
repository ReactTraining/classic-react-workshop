import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

document.body.style.background = `
  linear-gradient(135deg,
    #1e5799 0%,
    #2989d8 50%,
    #207cca 51%,
    #7db9e8 100%
  )
`;

const getHeaderStyle = y => {
  const pin = y >= 100;
  const top = -y / 2;
  return {
    textTransform: "uppercase",
    textAlign: "center",
    width: "100%",
    margin: 0,
    position: "fixed",
    top: pin ? "0px" : `${top + 50}px`,
    textShadow: pin
      ? `0px ${(y - 100) / 5}px ${Math.min(
          (y - 100) / 10,
          20
        )}px rgba(0, 0, 0, 0.5)`
      : "none"
  };
};

/*
 * - Hard to understand (subjective)
 * - Prop name collisions
 * - Create a new class, just to use new behavior
 * - Indirection! :'(
 */

class ScrollY extends React.Component {
  state = { y: 0 };

  handleWindowScroll = () => {
    this.setState({ y: window.scrollY });
  };

  componentDidMount() {
    this.handleWindowScroll();
    window.addEventListener("scroll", this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  render() {
    return this.props.children(this.state.y);
    // return <Component {...this.props} y={this.state.y} />;
  }
}

class App extends React.Component {
  render() {
    // const { y } = this.props;

    return (
      <ScrollY>
        {y => (
          <div style={{ height: "300vh", color: "white" }}>
            <h1 style={getHeaderStyle(y)}>Scroll down!</h1>
          </div>
        )}
      </ScrollY>
    );
  }
}

// App.js
// export default withScrollY(App);
// const AppWithScrollY = withScrollY(App);

// main.js
// import App from './App.js';

ReactDOM.render(<App />, document.getElementById("app"));
