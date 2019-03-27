import React, { useState } from "react";
import ReactDOM from "react-dom";

// const withToggle = Component => {
//   return class WithToggle extends React.Component {
//     state = {
//       toggleOn: false
//     };

//     handleToggle = () => {
//       this.setState({
//         toggleOn: !this.state.toggleOn
//       });
//     };

//     render() {
//       return (
//         <Component
//           toggleOn={this.state.toggleOn}
//           handleToggle={this.handleToggle}
//         />
//       );
//     }
//   };
// };

function useToggle(on) {
  const [toggleOn, setToggleOn] = useState(on);
  return {
    toggleOn,
    turnOn: () => setToggleOn(true),
    turnOff: () => setToggleOn(false),
    setToggleOn
  };
}

function App() {
  const { toggleOn, turnOn, turnOff } = useToggle(false);
  return (
    <button onClick={() => (toggleOn ? turnOff() : turnOn())}>
      Toggle: {toggleOn ? "on" : "off"}
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// We can move all of that code into a higher-order component. A higher-order
// component (HOC) is a function that takes a `Component` as an argument, and
// returns a new component renders that `Component` with some extra props.

// function withMedia(Component, queries) {
//   const media = createMediaListener(queries);

//   return class extends React.Component {
//     state = { media: media.getState() };

//     componentDidMount() {
//       media.listen(media => this.setState({ media }));
//     }

//     componentWillUnmount() {
//       media.dispose();
//     }

//     render() {
//       return <Component {...this.props} media={this.state.media} />;
//     }
//   };
// }

// class App extends React.Component {
//   static propTypes = {
//     media: PropTypes.shape({
//       big: PropTypes.bool,
//       tiny: PropTypes.bool
//     })
//   };

//   render() {
//     const { media } = this.props;

//     return media.big ? (
//       <h1>Hey, this is a big screen</h1>
//     ) : media.tiny ? (
//       <h6>tiny tiny tiny</h6>
//     ) : (
//       <h3>Somewhere in between</h3>
//     );
//   }
// }

// const AppWithMedia = withMedia(App, {
//   big: "(min-width : 1000px)",
//   tiny: "(max-width: 400px)"
// });

// ReactDOM.render(<AppWithMedia />, document.getElementById("app"));
