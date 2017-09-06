import React from 'react'
import { Motion, spring } from 'react-motion'
import * as styles from '../styles'

const withCat = (Component) => {
  return class ComponentWithCat extends React.Component {
    state = { width: 0, height: 0, x: 0, y: 0 }

    componentDidMount() {
      this.setState({
        width: this.cat.offsetWidth,
        height: this.cat.offsetHeight
      })
    }

    componentDidUpdate(prevProps) {
      const { mouse } = this.props

      if (mouse.x !== prevProps.mouse.x || mouse.y !== prevProps.mouse.y)
        this.setState(mouse)
    }

    render() {
      const catStyle = {
        top: spring(this.state.y - Math.round(this.state.height / 2)),
        left: spring(this.state.x - Math.round(this.state.width / 2))
      }

      return (
        <div style={{ height: '100%' }}>
          <Motion style={catStyle}>
            {style => (
              <div style={{ ...styles.cat, ...style }} ref={node => this.cat = node}/>
            )}
          </Motion>
          <Component {...this.props}/>
        </div>
      )
    }
  }
}

export default withCat
