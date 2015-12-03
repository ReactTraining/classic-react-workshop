////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import RainbowList from './lib/RainbowList'

require('./styles')

const { array, func, number } = React.PropTypes

const ListView = React.createClass({

  propTypes: {
    items: array.isRequired,
    itemHeight: number.isRequired,
    availableHeight: number.isRequired,
    renderItem: func.isRequired
  },

  render() {
    let { items, itemHeight, availableHeight, renderItem, style } = this.props
    let totalHeight = items.length * itemHeight

    return (
      <div style={{ ...style, height: '100%', overflowY: 'scroll' }}>
        <ol style={{ height: totalHeight }}>
        {items.map((item, index) =>
          <li key={item.text}>{renderItem(item)}</li>
        )}
        </ol>
      </div>
    )
  }
 
})

render(
  <RainbowList ListView={ListView} length={500} />,
  document.getElementById('app')
)
