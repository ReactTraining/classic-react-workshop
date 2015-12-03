import React from 'react'
import { findDOMNode } from 'react-dom'
import convertNumberToEnglish from './convertNumberToEnglish'
import computeHSLRainbowColor from './computeHSLRainbowColor'
import formatHSL from './formatHSL'

const { func, number } = React.PropTypes

class RainbowList extends React.Component {

  static propTypes = {
    length: number.isRequired,
    ListView: func.isRequired
  }

  static defaultProps = {
    length: 360,
    period: 100
  }

  constructor(props, context) {
    super(props, context)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.state = {
      availableHeight: 0,
      items: []
    }
  }

  computeItems(length, period) {
    let items = []

    for (let i = 0; i < length; ++i) {
      items.push({
        text: convertNumberToEnglish(i + 1),
        color: computeHSLRainbowColor(i, period)
      })
    }

    this.setState({ items })
  }

  handleWindowResize() {
    this.setState({
      availableHeight: findDOMNode(this).clientHeight
    })
  }

  componentWillMount() {
    this.computeItems(this.props.length, this.props.period)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    let { ListView } = this.props
    let { items, availableHeight } = this.state
    let itemHeight = 30

    return (
      <ListView
        items={items}
        itemHeight={itemHeight}
        availableHeight={availableHeight}
        renderItem={item =>
          <div style={{ height: itemHeight, color: formatHSL(...item.color), fontSize: 24 }}>
            {item.text}
          </div>
        }
      />
    )
  }

}

export default RainbowList
