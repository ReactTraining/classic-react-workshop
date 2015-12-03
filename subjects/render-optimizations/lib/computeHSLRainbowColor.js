function computeHSLRainbowColor(n, period) {
  return [ Math.round((n / period) * 360) , 1, 0.5 ]
}

export default computeHSLRainbowColor
