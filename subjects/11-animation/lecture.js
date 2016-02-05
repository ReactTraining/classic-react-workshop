import React from 'react'
import { render } from 'react-dom'
import { Motion, StaggeredMotion, spring, presets } from 'react-motion'

require('./styles')

///////////////////////////////////////////////////////////////////////////////
// Let's create a simple toggle switch that animates back and forth when we
// click it. Use a spring to make the transition feel natural.

const ToggleSwitch = React.createClass({

  getInitialState() {
    return {
      isActive: false
    }
  },

  toggle() {
    this.setState({
      isActive: !this.state.isActive
    })
  },
  
  render() {
    const x = this.state.isActive ? 400 : 0

    return (
      <Motion style={{ x: spring(x) }}>
        {style =>
          <div id="switch1" className="toggle-switch" onClick={this.toggle}>
            <div className="toggle-switch-knob" style={{
              WebkitTransform: `translate3d(${style.x}px,0,0)`,
              transform: `translate3d(${style.x}px,0,0)`
            }}/>
          </div>
        }
      </Motion>
    )
  }

})

render(<ToggleSwitch/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Update the stiffness and damping of the spring to see how they modify the
// animation. Try using preset values when you're getting started. Also, try
// the Spring Parameters Chooser demo.

///////////////////////////////////////////////////////////////////////////////
// Use the same <Motion> to animate several springs at once. All animations
// should run concurrently and finish at roughly the same time.

//const ToggleSwitch = React.createClass({
//
//  getInitialState() {
//    return {
//      isActive: false
//    }
//  },
//
//  toggle() {
//    this.setState({
//      isActive: !this.state.isActive
//    })
//  },
//
//  render() {
//    const x1 = this.state.isActive ? 400 : 0
//    const x2 = this.state.isActive ? 600 : 0
//    const x3 = this.state.isActive ? 300 : 0
//
//    return (
//      <Motion style={{ x1: spring(x1), x2: spring(x2), x3: spring(x3) }}>
//        {style => (
//          <div>
//            <div id="switch1" className="toggle-switch" onClick={this.toggle}>
//              <div className="toggle-switch-knob" style={{
//                WebkitTransform: `translate3d(${style.x1}px,0,0)`,
//                transform: `translate3d(${style.x1}px,0,0)`
//              }}/>
//            </div>
//            <div id="switch2" className="toggle-switch" onClick={this.toggle}>
//              <div className="toggle-switch-knob" style={{
//                WebkitTransform: `translate3d(${style.x2}px,0,0)`,
//                transform: `translate3d(${style.x2}px,0,0)`
//              }}/>
//            </div>
//            <div id="switch3" className="toggle-switch" onClick={this.toggle}>
//              <div className="toggle-switch-knob" style={{
//                WebkitTransform: `translate3d(${style.x3}px,0,0)`,
//                transform: `translate3d(${style.x3}px,0,0)`
//              }}/>
//            </div>
//          </div>
//        )}
//      </Motion>
//    )
//  }
//
//})
//
//render(<ToggleSwitch/>, document.getElementById('app'))

///////////////////////////////////////////////////////////////////////////////
// Use a <StaggeredMotion> to render 5 knobs, each one showing the previous
// frame of the animation. This technique gives us a blur effect. It's also
// known as onion skinning.

//const ToggleSwitch = React.createClass({
//
//  getInitialState() {
//    return {
//      isActive: false
//    }
//  },
//
//  toggle() {
//    this.setState({
//      isActive: !this.state.isActive
//    })
//  },
//
//  render() {
//    const x = this.state.isActive ? 400 : 0
//
//    return (
//      <StaggeredMotion
//        defaultStyles={[{ x }, { x }, { x }, { x }, { x }]}
//        styles={prevStyles => prevStyles.map((_, i) => (
//          i === 0 ? { x: spring(x) } : prevStyles[i - 1]
//        ))}
//      >
//        {styles => (
//          <div id="switch1" className="toggle-switch" onClick={this.toggle}>
//            {styles.map((style, i) => (
//              <div key={i} className="toggle-switch-knob" style={{
//                WebkitTransform: `translate3d(${style.x}px,0,0)`,
//                transform: `translate3d(${style.x}px,0,0)`,
//                opacity: 1 - (0.2 * i)
//              }}/>
//            ))}
//          </div>
//        )}
//      </StaggeredMotion>
//    )
//  }
//
//})
//
//render(<ToggleSwitch/>, document.getElementById('app'))
