////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use TweenStateMixin to animate a sliding animation
// - Experiment with different types of easing (hint: use easingTypes at 
//   https://github.com/chenglou/tween-functions/blob/master/index.js)
//
// Got more time?
//
// - Use a <Spring> to animate the transition
////////////////////////////////////////////////////////////////////////////////

const React = require('react/addons')
const easingTypes = require('react-tween-state').easingTypes
const TweenStateMixin = require('react-tween-state').Mixin
const { Spring } = require('react-motion')

const { number } = React.PropTypes

require('./styles')

const ToggleSwitch = React.createClass({

  propTypes: {
    animationDuration: number
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    }
  },

  getInitialState() {
    return {
      knobLeft: 0
    }
  },

  toggle() {
    this.setState({
      knobLeft: this.state.knobLeft === 0 ? 400 : 0
    })
  },

  handleClick() {
    this.toggle()
  },
  
  render() {
    const knobStyle = {
      WebkitTransform: `translate3d(${this.state.knobLeft}px,0,0)`,
      transform: `translate3d(${this.state.knobLeft}px,0,0)`
    }

    return (
      <div className="toggle-switch" onClick={this.handleClick}>
        <div className="toggle-switch-knob" style={knobStyle} />
      </div>
    )
  }

})

React.render(<ToggleSwitch />, document.getElementById('app'))
