import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { Motion, StaggeredMotion, spring, presets } from "react-motion";
import $ from "jquery";

class ToggleSwitch extends React.Component {
  state = {
    isActive: false
  };

  toggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const x = this.state.isActive ? 400 : 0;

    return (
      <div className="toggle-switch switch1" onClick={this.toggle}>
        <div className="toggle-switch-knob" style={{ left: x }} />
      </div>
    );
  }
}

ReactDOM.render(<ToggleSwitch />, document.getElementById("app"));

///////////////////////////////////////////////////////////////////////////////
// We can integrate with other DOM animation libraries by doing imperative work
// in the usual lifecycle methods. But our render method isn't as obvious. :/

//class ToggleSwitch extends React.Component {
//  state = {
//    isActive: false
//  }
//
//  toggle = () => {
//    this.setState({ isActive: !this.state.isActive })
//  }
//
//  componentDidUpdate() {
//    const x = this.state.isActive ? 400 : 0
//    $('.toggle-switch-knob').animate({ left: x }, 'swing')
//  }
//
//  render() {
//    return (
//      <div className="toggle-switch switch1" onClick={this.toggle}>
//        <div className="toggle-switch-knob"/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(
//  <ToggleSwitch/>,
//  document.getElementById('app')
//)

///////////////////////////////////////////////////////////////////////////////
// react-motion is an interesting library that gives us a way to do animation
// declaratively! Also, it uses springs to make animation feel more natural.
//
// Try different stiffness and damping values to see how they change the feel
// of the spring. The Spring Parameters Chooser demo lets you play with
// different stiffness/damping values.
//
// http://chenglou.me/react-motion/demos/demo5-spring-parameters-chooser/

//class ToggleSwitch extends React.Component {
//  state = {
//    isActive: false
//  }
//
//  toggle = () => {
//    this.setState({ isActive: !this.state.isActive })
//  }
//
//  render() {
//    const x = this.state.isActive ? 400 : 0
//
//    return (
//      <div className="toggle-switch switch1" onClick={this.toggle}>
//        <Motion style={{ x: spring(x) }} children={style => (
//          <div className="toggle-switch-knob" style={{ left: style.x }}/>
//        )}/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(
//  <ToggleSwitch/>,
//  document.getElementById('app')
//)

///////////////////////////////////////////////////////////////////////////////
// Use the same <Motion> to animate several springs at once. All animations
// should run concurrently and finish at the same time.

//class ToggleSwitch extends React.Component {
//  state = {
//    isActive: false
//  }
//
//  toggle = () => {
//    this.setState({ isActive: !this.state.isActive })
//  }
//
//  render() {
//    const x = this.state.isActive ? 1 : 0
//
//    return (
//      <Motion style={{ x: spring(x) }} children={style => (
//        <div>
//          <div className="toggle-switch switch1" onClick={this.toggle}>
//            <div className="toggle-switch-knob" style={{ left: style.x * 400 }}/>
//          </div>
//          <div className="toggle-switch switch2" onClick={this.toggle}>
//            <div className="toggle-switch-knob" style={{ left: style.x * 600 }}/>
//          </div>
//          <div className="toggle-switch switch3" onClick={this.toggle}>
//            <div className="toggle-switch-knob" style={{ left: style.x * 300 }}/>
//          </div>
//        </div>
//      )}/>
//    )
//  }
//}
//
//ReactDOM.render(
//  <ToggleSwitch/>,
//  document.getElementById('app')
//)
