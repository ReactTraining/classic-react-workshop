import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import './styles.css'

class Slider extends React.Component {
  static propTypes = {
    initialIndex: PropTypes.number.isRequired,
    autoplay: PropTypes.bool,
    onTogglePlay: PropTypes.func,
    duration: PropTypes.number
  }

  static defaultProps = {
    autoplay: false,
    duration: 5000,
    initialIndex: 0
  }

  static childContextTypes = {
    currentIndex: PropTypes.number,
    next: PropTypes.func,
    prev: PropTypes.func,
    registerCount: PropTypes.func,
    toggleAutoPlay: PropTypes.func
  }

  state = {
    currentIndex: this.props.initialIndex || 0
  }

  slideCount = null
  interval = null

  getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      next: this.next,
      prev: this.prev,
      registerCount: (count) => this.slideCount = count,
      toggleAutoPlay: () => this.toggleAutoPlay()
    }
  }

  componentDidMount() {
    if (this.props.autoPlay)
      this.startAutoPlay()
  }

  toggleAutoPlay() {
    if (this.interval)
      this.stopAutoPlay()
    else
      this.startAutoPlay()

    this.props.onTogglePlay(!!this.interval)
  }

  startAutoPlay() {
    this.interval = setInterval(this.next, this.props.duration)
  }

  stopAutoPlay() {
    clearInterval(this.interval)
    this.interval = null
  }

  prev = () => {
    let { currentIndex } = this.state

    currentIndex--

    if (currentIndex < 0)
      currentIndex = this.slideCount - 1

    this.setState({ currentIndex })
  }

  next = () => {
    let { currentIndex } = this.state

    currentIndex++

    if (currentIndex === this.slideCount)
      currentIndex = 0

    this.setState({ currentIndex })
  }

  render() {
    const {
      initialIndex,
      autoplay,
      onTogglePlay,
      duration,
      ...props
    } = this.props
    return (
      <div {...props}/>
    )
  }
}

class SliderStage extends React.Component {
  static contextTypes = {
    currentIndex: PropTypes.number.isRequired,
    registerCount: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.context.registerCount(
      React.Children.count(this.props.children)
    )
  }

  render() {
    const style = { ...this.props.style, position: 'relative' }

    return (
      <div {...this.props} style={style}>
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          {React.cloneElement(this.props.children[this.context.currentIndex], {
            key: this.context.currentIndex
          })}
        </CSSTransitionGroup>
      </div>
    )
  }
}

class Slide extends React.Component {
  componentWillMount() {
    // preload 'em
    new Image().src = this.props.src
  }

  render() {
    return <img {...this.props} style={{ position: 'absolute' }}/>
  }
}

class SliderControls extends React.Component {
  render() {
    return (
      <div {...this.props}/>
    )
  }
}

class SliderPrevious extends React.Component {
  static contextTypes = {
    prev: PropTypes.func.isRequired
  }

  render() {
    return (
      <button {...this.props} onClick={this.context.prev}/>
    )
  }
}

class SliderPlayPause extends React.Component {
  static contextTypes = {
    toggleAutoPlay: PropTypes.func.isRequired
  }

  render() {
    return (
      <button {...this.props} onClick={this.context.toggleAutoPlay}/>
    )
  }
}

class SliderNext extends React.Component {
  static contextTypes = {
    next: PropTypes.func.isRequired
  }

  render() {
    return (
      <button {...this.props} onClick={this.context.next}/>
    )
  }
}

class App extends React.Component {
  state = {
    isPlaying: true
  }

  render() {
    return (
      <div className="content">
        <h1>Slider</h1>

        <Slider
          initialIndex={0}
          duration={2000}
          onTogglePlay={(isPlaying) => this.setState({ isPlaying })}
          autoPlay={this.state.isPlaying}
        >
          <SliderControls>
            <SliderPrevious>Previous</SliderPrevious>
            <SliderPlayPause>{this.state.isPlaying ? 'Pause' : 'Play'}</SliderPlayPause>
            <SliderNext>Next</SliderNext>
          </SliderControls>

          <SliderStage style={{ height: 400 }}>
            <Slide src="./slides/hamburger.png"/>
            <Slide src="./slides/chicken-nuggets.png"/>
            <Slide src="./slides/mcmuffin.png"/>
          </SliderStage>
        </Slider>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
