////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import RainbowList from './utils/RainbowList'

require('./styles')

const ListView = React.createClass({
  propTypes: {
    rowHeight: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      availableHeight: 0,
      scrollTop: 0
    }
  },

  componentDidMount() {
    this.setState({
      availableHeight: findDOMNode(this).clientHeight
    })
  },

  handleScroll(event) {
    this.setState({
      scrollTop: event.target.scrollTop
    })
  },

  render() {
    const { rowHeight, numRows, renderRowAtIndex } = this.props
    const totalHeight = rowHeight * numRows

    const { availableHeight, scrollTop } = this.state
    const scrollBottom = scrollTop + availableHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20)
    const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 20)

    const items = []

    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }} onScroll={this.handleScroll}>
        <ol style={{ paddingTop: (startIndex * rowHeight), pointerEvents: 'none', height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
})

render(
  <RainbowList ListView={ListView} numRows={500000} period={1000}/>,
  document.getElementById('app')
)
