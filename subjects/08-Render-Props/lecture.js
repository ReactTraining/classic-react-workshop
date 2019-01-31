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

// Stuff you need to know to use a HOC:
// 1. The props it gives you
// 2. HOC signature (in most cases is just fn(Component))
// Stuff you need to know to use a RP:
// 1. The arguments to the render prop
// 2. The name of the render prop

// Michael's gripes with HOCs:
// 1. naming collisions! ✅
// 2. indirection! be explicit! ✅
// 3. (subjective) hard to teach/explain! ✅
// 4. HOCs are like inheritance, but I like composition better! ✅

// const EnhancedApp = withScrollY(App);

ReactDOM.render(<App />, document.getElementById("app"));
