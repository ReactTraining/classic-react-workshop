import React from "react";
import { Mixin as TweenStateMixin } from "react-tween-state";

function getHeight(node) {
  return node.scrollHeight;
}

const HeightFader = React.createClass({
  mixins: [TweenStateMixin],

  getDefaultProps() {
    return {
      component: "li"
    };
  },

  getInitialState() {
    return {
      opacity: 0,
      height: 0
    };
  },

  componentWillEnter(cb) {
    this.tweenState("opacity", {
      duration: 250,
      endValue: 1
    });

    this.tweenState("height", {
      duration: 250,
      endValue: getHeight(React.findDOMNode(this)),
      onEnd: cb
    });
  },

  componentWillLeave(cb) {
    this.tweenState("opacity", {
      duration: 250,
      endValue: 0
    });

    this.tweenState("height", {
      duration: 250,
      endValue: 0,
      onEnd: cb
    });
  },

  render() {
    return React.createElement(this.props.component, {
      ...this.props,
      style: {
        opacity: this.getTweeningValue("opacity"),
        height: this.getTweeningValue("height")
      }
    });
  }
});

export default HeightFader;
