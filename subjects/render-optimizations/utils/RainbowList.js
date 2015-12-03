import React from 'react'
import { computeHSLRainbowColor, convertNumberToEnglish } from './RainbowUtils'

const { func, number } = React.PropTypes

const RainbowList = React.createClass({

  propTypes: {
    ListView: func.isRequired,
    rowHeight: number.isRequired,
    length: number.isRequired,
    period: number.isRequired
  },

  getDefaultProps() {
    return {
      rowHeight: 30,
      length: 360,
      period: 100
    }
  },

  render() {
    const { ListView, rowHeight, length, period } = this.props

    return (
      <ListView
        rowHeight={rowHeight}
        length={length}
        renderRowAtIndex={index => {
          const color = computeHSLRainbowColor(index, period)

          return (
            <div style={{ height: rowHeight, color, fontSize: 24, padding: '5px 10px' }}>
              {convertNumberToEnglish(index + 1)}
            </div>
          )
        }}
      />
    )
  }

})

export default RainbowList
