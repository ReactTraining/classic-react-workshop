import React from 'react'
import { findDOMNode } from 'react-dom'
import convertNumberToEnglish from './convertNumberToEnglish'
import computeHSLRainbowColor from './computeHSLRainbowColor'
import formatHSL from './formatHSL'

const { func, number } = React.PropTypes

const RainbowList = React.createClass({

  propTypes: {
    length: number.isRequired,
    ListView: func.isRequired
  },

  getDefaultProps() {
    return {
      length: 360,
      period: 100
    }
  },

  getInitialState() {
    return {
      availableHeight: 0,
      items: []
    }
  },

  computeItems(length, period) {
    const items = []

    for (let i = 0; i < length; ++i) {
      items.push({
        text: convertNumberToEnglish(i + 1),
        color: computeHSLRainbowColor(i, period)
      })
    }

    this.setState({ items })
  },

  handleWindowResize() {
    this.setState({
      availableHeight: findDOMNode(this).clientHeight
    })
  },

  componentWillMount() {
    this.computeItems(this.props.length, this.props.period)
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  render() {
    const { ListView } = this.props
    const { items, availableHeight } = this.state
    const itemHeight = 30

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

})

export default RainbowList
