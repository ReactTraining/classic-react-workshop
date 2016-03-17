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
import { render, findDOMNode } from 'react-dom'
import RainbowList from './utils/RainbowList'

require('./styles')

const { array, func, number } = React.PropTypes

const ListView = React.createClass({

  propTypes: {
    rowHeight: number.isRequired,
    numRows: number.isRequired,
    renderRowAtIndex: func.isRequired
  },

  render() {
    const { rowHeight, numRows, renderRowAtIndex } = this.props
    const totalHeight = rowHeight * numRows

    const items = []

    let index = 0
    while (index < numRows) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <ol style={{ height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
 
})

render(
  <RainbowList ListView={ListView} numRows={500}/>,
  document.getElementById('app')
)
