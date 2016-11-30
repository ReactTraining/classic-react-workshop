import React, { PropTypes } from 'react'
import { render } from 'react-dom'

document.body.style.background = `
  linear-gradient(135deg,
    #1e5799 0%,
    #2989d8 50%,
    #207cca 51%,
    #7db9e8 100%
  )
`

const getHeaderStyle = (y) => {
  const pin = y >= 100
  const top = -y / 2
  return {
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    margin: 0,
    position: 'fixed',
    top: pin ? '0px' : `${top + 50}px`,
    textShadow: pin ?  `0px ${(y-100)/5}px ${Math.min((y-100)/10, 20)}px rgba(0, 0, 0, 0.5)` : 'none'
  }
}

class App extends React.Component {
  state = { y: 0 }

  handleWindowScroll = () => {
    this.setState({ y: window.scrollY })
  }

  componentDidMount() {
    this.handleWindowScroll()
    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  render() {
    const { y } = this.state

    return (
      <div style={{ height: '300vh', color: 'white' }}>
        <ScrollPosition/>
        <h1 style={getHeaderStyle(y)}>
          Scroll down!
        </h1>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
