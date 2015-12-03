function formatHSL(h, s, l) {
  return 'hsl(' + h + ',' + Math.round(s * 100) + '%,' + Math.round(l * 100) + '%)'
}

export default formatHSL
