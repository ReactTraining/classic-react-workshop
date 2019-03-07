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

class ScrollPosition extends React.Component {
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
    return this.props.render(this.state.y);
  }
}

class App extends React.Component {
  ///

  render() {
    return (
      <div style={{ height: "300vh", color: "white" }}>
        <ScrollPosition
          render={y => {
            return <h1 style={getHeaderStyle(y)}>Scroll down!</h1>;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
