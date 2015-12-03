////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import RainbowList from './utils/RainbowList'

require('./styles')

const { array, func, number } = React.PropTypes

const ListView = React.createClass({

  propTypes: {
    items: array.isRequired,
    itemHeight: number.isRequired,
    availableHeight: number.isRequired,
    renderItem: func.isRequired
  },

  getInitialState() {
    return {
      scrollTop: 0
    }
  },

  handleScroll(event) {
    this.setState({
      scrollTop: event.target.scrollTop
    })
  },

  render() {
    const { items, itemHeight, availableHeight, renderItem, style } = this.props
    const totalHeight = items.length * itemHeight

    const { scrollTop } = this.state
    const scrollBottom = scrollTop + availableHeight

    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.ceil(scrollBottom / itemHeight)

    return (
      <div style={{ ...style, height: '100%', overflowY: 'scroll' }} onScroll={(e) => this.handleScroll(e)}>
        <div style={{ height: totalHeight }}>
          <ol style={{ paddingTop: (startIndex * itemHeight), pointerEvents: 'none' }}>
          {items.slice(startIndex, endIndex).map(item =>
            <li key={item.text}>{renderItem(item)}</li>
          )}
          </ol>
        </div>
      </div>
    )
  }
 
})

render(
  <RainbowList ListView={ListView} length={500000} />,
  document.getElementById('app')
)
