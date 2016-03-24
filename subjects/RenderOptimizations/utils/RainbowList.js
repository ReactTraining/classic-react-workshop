import React from 'react'
import { computeHSLRainbowColor, convertNumberToEnglish } from './RainbowUtils'

const { func, number } = React.PropTypes

const RainbowList = React.createClass({

  propTypes: {
    ListView: func.isRequired,
    rowHeight: number.isRequired,
    numRows: number.isRequired,
    period: number.isRequired
  },

  getDefaultProps() {
    return {
      rowHeight: 30,
      numRows: 360,
      period: 100
    }
  },

  render() {
    const { ListView, rowHeight, numRows, period } = this.props

    return (
      <ListView
        rowHeight={rowHeight}
        numRows={numRows}
        renderRowAtIndex={index => {
          const color = computeHSLRainbowColor(index, period)

          return (
            <div style={{ height: rowHeight, color, fontSize: 24, padding: '5px 10px' }}>
              {convertNumberToEnglish(index)}
            </div>
          )
        }}
      />
    )
  }

})

export default RainbowList
