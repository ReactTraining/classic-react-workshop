////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: You'll need
//   to listen for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to prevent
//   tearing when scrolling quickly
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import RainbowList from './utils/RainbowList'

require('./styles')

const { func, number } = React.PropTypes

const ListView = React.createClass({

  propTypes: {
    rowHeight       : number.isRequired,
    numRows         : number.isRequired,
    renderRowAtIndex: func.isRequired
  },

  getInitialState() {
    return {
      isScrollable: false,
      scrollTop   : 0,
      touchTop    : 0,
      speedFactor : 1,
      windowHeight: document.body.clientHeight,
      totalRows   : this.props.numRows + 1
    }
  },

  componentWillMount() {
    this.speedUpTimeout = null
    this.totalHeight = this.calculateTotalHeight()
  },

  componentWillReceiveProps() {
    this.setState({ totalRows: this.props.numRows + 1 })
    this.totalHeight = this.calculateTotalHeight()
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.updateIsScrollable()
  },

  calculateTotalHeight() {
    return this.props.rowHeight * (this.state.totalRows)
  },

  calculateScrollTop(delta) {

    delta = this.controlScrollingSpeed(delta)

    return Math.min(Math.max(this.state.scrollTop + delta, 0), Math.max(this.totalHeight - this.state.windowHeight, 0))
  },

  updateIsScrollable() {
    this.setState({ isScrollable: this.state.windowHeight < this.totalHeight })
  },

  handleResize() {
    this.setState({ windowHeight: document.body.clientHeight })
    this.updateIsScrollable()
    this.setState({ scrollTop: this.calculateScrollTop(this.state.windowHeight - document.body.clientHeight) })
  },

  handleTouch(e) {
    const touchTop = e.touches.length ? e.touches[0].screenY : 0

    e.preventDefault()

    if (e.type == 'touchmove' && this.state.isScrollable) {
      this.setState({ scrollTop: this.calculateScrollTop(this.state.touchTop - touchTop) })
    }

    this.setState({ touchTop: touchTop })
  },

  handleScroll(e) {
    if (this.state.isScrollable) {
      this.setState({ scrollTop: this.calculateScrollTop(e.deltaY) })
    }
  },

  controlScrollingSpeed(delta) {
    if (this.speedUpTimeout) {
      clearTimeout(this.speedUpTimeout)
    }

    this.setState({ speedFactor: this.state.speedFactor + Math.abs(delta) / 10000 * (this.state.totalRows / 1000) })

    this.speedUpTimeout = setTimeout(() => {
      this.setState({ speedFactor: 1 })
    }, 100)

    return delta * Math.floor(this.state.speedFactor)
  },

  getRow(index) {
    return <li key={index}>{this.props.renderRowAtIndex(index)}</li>
  },

  render() {
    const numRowsAbove = Math.floor(this.state.scrollTop / this.props.rowHeight)
    const numRowsFit   = Math.min(Math.ceil(this.state.windowHeight / this.props.rowHeight), this.state.totalRows)
    const lastIndex    = numRowsAbove + numRowsFit
    const items        = []

    // have special last row
    // that will be empty row in the end
    // `-1` will produce empty string
    if (lastIndex > this.props.numRows) {
      items.unshift(this.getRow(-1))
    }

    while (numRowsFit - items.length > 0) {
      items.unshift(this.getRow(lastIndex - items.length))
    }

    return (
      <div>
      <ol
        style={{ height: '100%' }}
        onWheel={this.handleScroll}
        onTouchStart={this.handleTouch}
        onTouchEnd={this.handleTouch}
        onTouchMove={this.handleTouch}
        onTouchCancel={this.handleTouch}
        >
        {items}
      </ol>
      </div>
    )
  }

})

render(
  <RainbowList ListView={ListView} numRows={10000} />,
  document.getElementById('app')
)
