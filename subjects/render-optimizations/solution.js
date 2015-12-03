////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import RainbowList from './utils/RainbowList'

require('./styles')

const { array, func, number } = React.PropTypes

const ListView = React.createClass({

  propTypes: {
    rowHeight: number.isRequired,
    length: number.isRequired,
    renderRowAtIndex: func.isRequired
  },

  getInitialState() {
    return {
      availableHeight: 0,
      scrollTop: 0
    }
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  handleWindowResize() {
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
    const { rowHeight, length, renderRowAtIndex } = this.props
    const totalHeight = rowHeight * length

    const { availableHeight, scrollTop } = this.state
    const scrollBottom = scrollTop + availableHeight

    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = Math.ceil(scrollBottom / rowHeight)

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
  <RainbowList ListView={ListView} length={500000} />,
  document.getElementById('app')
)
