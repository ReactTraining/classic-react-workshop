///////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use a <Motion> to animate the transition of the red "marker" to its
//   destination when it is dropped
//
// Got extra time?
//
// - Add a "drop hint" element that indicates which element will receive
//   the marker when it is dropped to improve usability
// - Use a <StaggeredMotion> to give the marker animation a blur effect
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { Motion, spring } from 'react-motion'

require('./styles')

const MarkerGrid = React.createClass({

  getInitialState() {
    return {
      isDraggingMarker: false,
      markerX: 0,
      markerY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },

  componentWillMount() {
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  },

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  },

  getRelativeXY({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = findDOMNode(this)
    
    return {
      x: clientX - offsetLeft,
      y: clientY - offsetTop
    }
  },

  handleMouseDown(event) {
    const { x, y } = this.getRelativeXY(event)
    const { offsetLeft, offsetTop } = event.target

    this.setState({
      isDraggingMarker: true,
      markerX: x - offsetLeft,
      markerY: y - offsetTop,
      mouseX: x,
      mouseY: y
    })

    // Prevent Chrome from displaying a text cursor.
    event.preventDefault()
  },

  handleMouseMove(event) {
    if (this.state.isDraggingMarker) {
      const { x, y } = this.getRelativeXY(event)

      this.setState({
        mouseX: x,
        mouseY: y
      })
    }
  },

  handleMouseUp() {
    if (this.state.isDraggingMarker)
      this.setState({ isDraggingMarker: false })
  },

  render() {
    const { isDraggingMarker, markerX, markerY, mouseX, mouseY } = this.state

    let markerLeft, markerTop
    if (isDraggingMarker) {
      markerLeft = mouseX - markerX
      markerTop = mouseY - markerY
    } else {
      markerLeft = Math.floor(Math.max(0, Math.min(449, mouseX)) / 150) * 150
      markerTop = Math.floor(Math.max(0, Math.min(449, mouseY)) / 150) * 150
    }

    const markerStyle = {
      left: markerLeft,
      top: markerTop
    }

    return (
      <div className="grid">
        <div className="marker" style={markerStyle} onMouseDown={this.handleMouseDown} />
        <div className="cell">1</div>
        <div className="cell">2</div>
        <div className="cell">3</div>
        <div className="cell">4</div>
        <div className="cell">5</div>
        <div className="cell">6</div>
        <div className="cell">7</div>
        <div className="cell">8</div>
        <div className="cell">9</div>
      </div>
    )
  }

})

render(<MarkerGrid />, document.getElementById('app'))
