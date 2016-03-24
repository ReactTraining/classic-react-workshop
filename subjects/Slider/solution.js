import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import './styles.css'

const Slider = React.createClass({
  propTypes: {
    initialIndex: PropTypes.number.isRequired,
    autoPlay: PropTypes.bool,
    onTogglePlay: PropTypes.func,
    duration: PropTypes.number
  },

  childContextTypes: {
    currentIndex: PropTypes.number,
    next: PropTypes.func,
    prev: PropTypes.func,
    registerCount: PropTypes.func,
    toggleAutoPlay: PropTypes.func
  },

  getDefaultProps() {
    return {
      autoPlay: false,
      duration: 5000,
      initialIndex: 0
    }
  },

  getInitialState() {
    return {
      currentIndex: this.props.initialIndex || 0
    }
  },

  getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      next: () => this.next(),
      prev: () => this.prev(),
      registerCount: (count) => this.slideCount = count,
      toggleAutoPlay: () => this.toggleAutoPlay()
    }
  },

  componentWillMount() {
    this.slideCount = null
    this.interval = null
  },

  componentDidMount() {
    if (this.props.autoPlay)
      this.startAutoPlay()
  },

  toggleAutoPlay() {
    // I'm lookin' at this method with a side-eye, I can't predict
    // the component looking at state, props, and render ...
    if (this.interval)
      this.stopAutoPlay()
    else
      this.startAutoPlay()

    this.props.onTogglePlay(!!this.interval)
  },

  startAutoPlay() {
    this.interval = setInterval(this.next, this.props.duration)
  },

  stopAutoPlay() {
    clearInterval(this.interval)
    this.interval = null
  },

  prev() {
    let { currentIndex } = this.state

    currentIndex--

    if (currentIndex < 0)
      currentIndex = this.slideCount - 1

    this.setState({ currentIndex })
  },

  next() {
    let { currentIndex } = this.state

    currentIndex++

    if (currentIndex === this.slideCount)
      currentIndex = 0

    this.setState({ currentIndex })
  },

  render() {
    return (
      <div {...this.props}/>
    )
  }
})

const SliderStage = React.createClass({
  contextTypes: {
    currentIndex: PropTypes.number.isRequired,
    registerCount: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.context.registerCount(React.Children.count(this.props.children))
  },

  render() {
    const style = { ...this.props.style, position: 'relative' }

    return (
      <div {...this.props} style={style}>
        <CSSTransitionGroup transitionName="fade">
          {React.cloneElement(this.props.children[this.context.currentIndex], {
            key: this.context.currentIndex
          })}
        </CSSTransitionGroup>
      </div>
    )
  }
})

const Slide = React.createClass({
  componentWillMount() {
    // preload 'em
    new Image().src = this.props.src
  },

  render() {
    return <img {...this.props} style={{ position: 'absolute' }}/>
  }
})

const SliderControls = React.createClass({
  render() {
    return (
      <div {...this.props}/>
    )
  }
})

const SliderPrevious = React.createClass({
  contextTypes: {
    prev: PropTypes.func.isRequired
  },

  render() {
    return (
      <button {...this.props} onClick={this.context.prev}/>
    )
  }
})

const SliderPlayPause = React.createClass({
  contextTypes: {
    toggleAutoPlay: PropTypes.func.isRequired
  },

  render() {
    return (
      <button {...this.props} onClick={this.context.toggleAutoPlay}/>
    )
  }
})

const SliderNext = React.createClass({
  contextTypes: {
    next: PropTypes.func.isRequired
  },

  render() {
    return (
      <button {...this.props} onClick={() => this.context.next()}/>
    )
  }
})

const App = React.createClass({
  getInitialState() {
    return {
      isPlaying: true
    }
  },

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
})

render(<App/>, document.getElementById('app'))
