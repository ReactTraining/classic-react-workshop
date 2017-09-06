import React from 'react'
import convertNumberToEnglish from './convertNumberToEnglish'

const computeHSLRainbowColor = (n, period) =>
  `hsl(${Math.round((n / period) * 360)},100%,50%)`

export const rowHeight = 30

export const renderRowAtIndex = (index) => (
  <div
    style={{
      height: rowHeight,
      color: computeHSLRainbowColor(index, 100),
      fontSize: 24,
      padding: '5px 10px'
    }}
  >
    {convertNumberToEnglish(index + 1)}
  </div>
)
