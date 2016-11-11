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

const getHeaderStyle = (scrollY) => {
  const pin = scrollY >= 100
  const top = -scrollY / 2
  return {
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    margin: 0,
    position: 'fixed',
    top: pin ? '0px' : `${top + 50}px`,
    textShadow: pin ?  `0px ${(scrollY-100)/5}px ${Math.min((scrollY-100)/10, 20)}px rgba(0, 0, 0, 0.5)` : 'none'
  }
}

class App extends React.Component {
  state = {
    scrollY: 0
  }

  setScroll = () => {
    this.setState({
      scrollY: window.scrollY
    })
  }

  componentDidMount() {
    this.setScroll()
    window.addEventListener('scroll', this.setScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setScroll)
  }

  render() {
    return (
      <div style={{ height: '200vh', color: 'white' }}>
        <h1 style={getHeaderStyle(scrollY)}>
          Scroll down!
        </h1>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))

