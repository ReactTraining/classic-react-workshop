import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getHeaderStyle from "./utils/getHeaderStyle";

document.body.style.background = `
  linear-gradient(135deg,
    #1e5799 0%,
    #2989d8 50%,
    #207cca 51%,
    #7db9e8 100%
  )
`;

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
  }
}

function withScrollY(Component) {
  return props => {
    return <ScrollY>{y => <Component {...props} y={y} />}</ScrollY>;
  };
}

class App extends React.Component {
  render() {
    return (
      <ScrollY>
        {y => (
          <div style={{ height: "300vh", color: "white" }}>
            <h1 style={getHeaderStyle(y)}>{this.props.message}</h1>
          </div>
        )}
      </ScrollY>
    );
  }
}

ReactDOM.render(
  <App message="hello everyone!" />,
  document.getElementById("app")
);
