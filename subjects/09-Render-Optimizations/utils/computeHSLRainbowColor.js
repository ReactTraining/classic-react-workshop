export default function computeHSLRainbowColor(n, period) {
  return `hsl(${Math.round((n / period) * 360)},100%,50%)`;
}
