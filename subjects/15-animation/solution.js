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

var React = require('react/addons');
var easingTypes = require('react-tween-state').easingTypes;
var TweenStateMixin = require('react-tween-state').Mixin;
var { Spring } = require('react-motion');

var { number } = React.PropTypes;

require('./styles');

var ToggleSwitch = React.createClass({

  mixins: [ TweenStateMixin ],

  propTypes: {
    animationDuration: number
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    };
  },

  getInitialState() {
    return {
      isLeft: true,
      knobLeft: 0
    };
  },

  toggle() {
    var isLeft = !this.state.isLeft;

    this.setState({ isLeft });

    this.tweenState('knobLeft', {
      duration: this.props.animationDuration,
      endValue: (isLeft ? 0 : 400)
    });
  },

  handleClick() {
    this.toggle();
  },
  
  render() {
    var knobStyle = {
      WebkitTransform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`,
      transform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`
    };

    return (
      <div className="toggle-switch" onClick={this.handleClick}>
        <div className="toggle-switch-knob" style={knobStyle} />
      </div>
    );
  }

});

var SpringToggleSwitch = React.createClass({

  getInitialState() {
    return {
      isLeft: true
    };
  },

  toggle() {
    this.setState({
      isLeft: !this.state.isLeft
    });
  },

  handleClick() {
    this.toggle();
  },
  
  render() {
    return (
      <Spring endValue={{ val: this.state.isLeft ? 0 : 400 }}>
        {({ val }) =>
          <div className="toggle-switch" onClick={this.handleClick}>
            <div className="toggle-switch-knob" style={{
              WebkitTransform: `translate3d(${val}px,0,0)`,
              transform: `translate3d(${val}px,0,0)`
            }} />
          </div>
        }
      </Spring>
    );
  }

});

React.render(<SpringToggleSwitch />, document.getElementById('app'));
