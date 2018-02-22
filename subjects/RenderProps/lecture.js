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

class App extends React.Component {
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
    const { y } = this.state;

    return (
      <div style={{ height: "300vh", color: "white" }}>
        <h1 style={getHeaderStyle(y)}>Scroll down!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

///////////////////////////////////////////////////////////////////////////////
// We can wrap up the scroll listening into a <ScrollPosition> component with
// a "render" prop. This makes it easier to read our render method and also
// encapsulates the scroll listening behavior so we can use it elsewhere

//class ScrollPosition extends React.Component {
//  static propTypes = {
//    render: PropTypes.func.isRequired
//  }
//
//  state = { y: 0 }
//
//  handleWindowScroll = () => {
//    this.setState({ y: window.scrollY })
//  }
//
//  componentDidMount() {
//    this.handleWindowScroll()
//    window.addEventListener('scroll', this.handleWindowScroll)
//  }
//
//  componentWillUnmount() {
//    window.removeEventListener('scroll', this.handleWindowScroll)
//  }
//
//  render() {
//    return this.props.render(this.state.y)
//  }
//}
//
//class App extends React.Component {
//  render() {
//    return (
//      <div style={{ height: '300vh', color: 'white' }}>
//        <ScrollPosition render={y => (
//          <h1 style={getHeaderStyle(y)}>
//            Scroll down!
//          </h1>
//        )}/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

///////////////////////////////////////////////////////////////////////////////
// A common technique when using "render props" is to just use the "children"
// prop. It's the original render prop!

//class ScrollPosition extends React.Component {
//  static propTypes = {
//    children: PropTypes.func.isRequired
//  }
//
//  state = { y: 0 }
//
//  handleWindowScroll = () => {
//    this.setState({ y: window.scrollY })
//  }
//
//  componentDidMount() {
//    this.handleWindowScroll()
//    window.addEventListener('scroll', this.handleWindowScroll)
//  }
//
//  componentWillUnmount() {
//    window.removeEventListener('scroll', this.handleWindowScroll)
//  }
//
//  render() {
//    return this.props.children(this.state.y)
//  }
//}
//
//class App extends React.Component {
//  render() {
//    return (
//      <div style={{ height: '300vh', color: 'white' }}>
//        <ScrollPosition>
//          {y => (
//            <h1 style={getHeaderStyle(y)}>
//              Scroll down!
//            </h1>
//          )}
//        </ScrollPosition>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))
