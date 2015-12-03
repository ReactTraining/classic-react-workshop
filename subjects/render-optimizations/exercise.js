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

  render() {
    const { rowHeight, length, renderRowAtIndex } = this.props
    const totalHeight = rowHeight * length

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
  <RainbowList ListView={ListView} length={500000} />,
  document.getElementById('app')
)
