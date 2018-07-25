////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use TweenStateMixin to animate a sliding animation
// - Experiment with different types of easing (hint: use easingTypes at
//   https://github.com/chenglou/tween-functions/blob/master/index.js)
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  easingTypes,
  Mixin as TweenStateMixin
} from "react-tween-state";

const ToggleSwitch = React.createClass({
  propTypes: {
    animationDuration: PropTypes.number
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    };
  },

  getInitialState() {
    return {
      knobLeft: 0
    };
  },

  toggle() {
    this.setState({
      knobLeft: this.state.knobLeft === 0 ? 400 : 0
    });
  },

  handleClick() {
    this.toggle();
  },

  render() {
    const knobStyle = {
      WebkitTransform: `translate3d(${this.state.knobLeft}px,0,0)`,
      transform: `translate3d(${this.state.knobLeft}px,0,0)`
    };

    return (
      <div className="toggle-switch" onClick={this.handleClick}>
        <div className="toggle-switch-knob" style={knobStyle} />
      </div>
    );
  }
});

ReactDOM.render(<ToggleSwitch />, document.getElementById("app"));
