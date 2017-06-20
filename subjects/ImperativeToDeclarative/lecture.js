import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createOscillator from './utils/createOscillator'

const styles = {}

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: '1px solid',
  cursor: 'crosshair',
  margin: 10,
  display: 'inline-block'
}

class App extends React.Component {
  componentDidMount() {
    this.oscillator = createOscillator()
  }

  play = () => {
    this.oscillator.play()
  }

  stop = () => {
    this.oscillator.stop()
  }

  changeTone = (event) => {
    const { clientX, clientY } = event
    const { top, right, bottom, left } = event.target.getBoundingClientRect()
    const pitch = (clientX - left) / (right - left)
    const volume = 1 - (clientY - top) / (bottom - top)

    this.oscillator.setPitchBend(pitch)
    this.oscillator.setVolume(volume)
  }

  render() {
    return (
      <div>
        <h1>What does it mean to be declarative?</h1>
        <div
          style={styles.theremin}
          onMouseEnter={this.play}
          onMouseLeave={this.stop}
          onMouseMove={this.changeTone}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Can't predict what the sound is going to be by looking at state or the render
// method, but componentDidUpdate makes things a lot easier to think about.

//class App extends React.Component {
//  state = {
//    isPlaying: false,
//    pitch: 0,
//    volume: 0
//  }
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//  }
//
//  play = () => {
//    this.setState({ isPlaying: true })
//  }
//
//  stop = () => {
//    this.setState({ isPlaying: false })
//  }
//
//  changeTone = (event) => {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  }
//
//  componentDidUpdate() {
//    if (this.state.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.state.pitch)
//    this.oscillator.setVolume(this.state.volume)
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <div
//          style={styles.theremin}
//          onMouseEnter={this.play}
//          onMouseLeave={this.stop}
//          onMouseMove={this.changeTone}
//        />
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can do even better and make this fully declarative for the <App>. Instead
// of using this.oscillator (an imperative API), let's wrap that up into a
// <Tone> component and control it declaratively.

//class Tone extends React.Component {
//  static propTypes = {
//    isPlaying: PropTypes.bool.isRequired,
//    pitch: PropTypes.number.isRequired,
//    volume: PropTypes.number.isRequired
//  }
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//    this.doImperativeWork()
//  }
//
//  componentDidUpdate() {
//    this.doImperativeWork()
//  }
//
//  doImperativeWork() {
//    if (this.props.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.props.pitch)
//    this.oscillator.setVolume(this.props.volume)
//  }
//
//  render() {
//    return null
//  }
//}
//
//class App extends React.Component {
//  state = {
//    isPlaying: false,
//    pitch: 0.5,
//    volume: 0.5
//  }
//
//  play = () => {
//    this.setState({ isPlaying: true })
//  }
//
//  stop = () => {
//    this.setState({ isPlaying: false })
//  }
//
//  changeTone = (event) => {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <div
//          style={styles.theremin}
//          onMouseEnter={this.play}
//          onMouseLeave={this.stop}
//          onMouseMove={this.changeTone}
//        >
//          <Tone {...this.state}/>
//        </div>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Pull out <Theremin> into its own component - you're most of the way there!

////////////////////////////////////////////////////////////////////////////////
// Add a <Tone waveType> prop that changes the type of sound wave that is
// generated and render many of them.

//const waveType = PropTypes.oneOf([
// 'sine',
// 'triangle',
// 'square',
// 'sawtooth'
//])
//
//class Tone extends React.Component {
//  static propTypes = {
//    isPlaying: PropTypes.bool.isRequired,
//    pitch: PropTypes.number.isRequired,
//    volume: PropTypes.number.isRequired,
//    waveType: waveType.isRequired
//  }
//
//  static defaultProps = {
//    waveType: 'sine'
//  }
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//    this.doImperativeWork()
//  }
//
//  componentDidUpdate() {
//    this.doImperativeWork()
//  }
//
//  doImperativeWork() {
//    if (this.props.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.props.pitch)
//    this.oscillator.setVolume(this.props.volume)
//    this.oscillator.setType(this.props.waveType)
//  }
//
//  render() {
//    return null
//  }
//}
//
//class Theremin extends React.Component {
//  static propTypes = {
//    type: waveType
//  }
//
//  state = {
//    isPlaying: false,
//    pitch: 0,
//    volume: 0
//  }
//
//  play = () => {
//    this.setState({ isPlaying: true })
//  }
//
//  stop = () => {
//    this.setState({ isPlaying: false })
//  }
//
//  changeTone = (event) => {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  }
//
//  render() {
//    return (
//      <div
//        style={styles.theremin}
//        onMouseEnter={this.play}
//        onMouseLeave={this.stop}
//        onMouseMove={this.changeTone}
//      >
//        <Tone {...this.state} waveType={this.props.type}/>
//      </div>
//    )
//  }
//}
//
//class App extends React.Component {
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <Theremin/>
//        <Theremin type="triangle"/>
//        <Theremin type="square"/>
//        <Theremin type="sawtooth"/>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// When you isolate all imperative work into components then the application
// using them can model their UI in a declarative, predictible way because
// it renders based on a snapshot of state, time has been removed from the
// equation.
//
// Additionally, when the components doing the imperative work do it all in
// componentDidMount and componenDidUpdate, you even make the imperative
// work predictable because it's based on a snapshot of state in time also.
