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

  handleClick() {
    this.toggle()
  },
  
  render() {
    let x = this.state.isActive ? 400 : 0

    return (
      <Motion
        defaultStyle={{ x }}
        style={{ x: spring(x) }}
      >
      {s => (
        <div id="switch1" className="toggle-switch" onClick={e => this.handleClick(e)}>
          <div className="toggle-switch-knob" style={{
            WebkitTransform: `translate3d(${s.x}px,0,0)`,
            transform: `translate3d(${s.x}px,0,0)`
          }} />
        </div>
      )}
      </Motion>
    )
  }

})

///////////////////////////////////////////////////////////////////////////////
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
//  handleClick() {
//    this.toggle()
//  },
//  
//  render() {
//    let x1 = this.state.isActive ? 400 : 0
//    let x2 = this.state.isActive ? 600 : 0
//    let x3 = this.state.isActive ? 300 : 0
//
//    return (
//      <Motion
//        defaultStyle={{ x1, x2, x3 }}
//        style={{ x1: spring(x1), x2: spring(x2), x3: spring(x3) }}
//      >
//      {s => (
//        <div>
//          <div id="switch1" className="toggle-switch" onClick={e => this.handleClick(e)}>
//            <div className="toggle-switch-knob" style={{
//              WebkitTransform: `translate3d(${s.x1}px,0,0)`,
//              transform: `translate3d(${s.x1}px,0,0)`
//            }} />
//          </div>
//          <div id="switch2" className="toggle-switch" onClick={e => this.handleClick(e)}>
//            <div className="toggle-switch-knob" style={{
//              WebkitTransform: `translate3d(${s.x2}px,0,0)`,
//              transform: `translate3d(${s.x2}px,0,0)`
//            }} />
//          </div>
//          <div id="switch3" className="toggle-switch" onClick={e => this.handleClick(e)}>
//            <div className="toggle-switch-knob" style={{
//              WebkitTransform: `translate3d(${s.x3}px,0,0)`,
//              transform: `translate3d(${s.x3}px,0,0)`
//            }} />
//          </div>
//        </div>
//      )}
//      </Motion>
//    )
//  }
//
//})

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
//  handleClick() {
//    this.toggle()
//  },
//  
//  render() {
//    let x = this.state.isActive ? 400 : 0
//
//    return (
//      <StaggeredMotion
//        defaultStyles={[{ x }, { x }, { x }, { x }, { x }]}
//        styles={prevStyles => prevStyles.map((_, i) => (
//          i === 0 ? { x: spring(x) } : prevStyles[i - 1]
//        ))}
//      >
//      {styles => (
//        <div>
//          <div id="switch1" className="toggle-switch" onClick={e => this.handleClick(e)}>
//          {styles.map((s, i) => (
//            <div key={i} className="toggle-switch-knob" style={{
//              WebkitTransform: `translate3d(${s.x}px,0,0)`,
//              transform: `translate3d(${s.x}px,0,0)`,
//              opacity: 1 - (0.2 * i)
//            }} />
//          ))}
//          </div>
//        </div>
//      )}
//      </StaggeredMotion>
//    )
//  }
//
//})

render(<ToggleSwitch />, document.getElementById('app'))
