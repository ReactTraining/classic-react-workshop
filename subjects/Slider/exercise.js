import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import './styles.css'

const Slider = React.createClass({
  propTypes: {
    initialIndex: PropTypes.number.isRequired,
    autoplay: PropTypes.bool,
    onTogglePlay: PropTypes.func,
    duration: PropTypes.number
  },

  getDefaultProps() {
    return {
      autoplay: false,
      duration: 5000,
      initialIndex: 0
    }
  },

  render() {
    return (
      <div {...this.props}/>
    )
  }
})

const SliderStage = React.createClass({
  render() {
    return (
      <div {...this.props}/>
    )
  }
})

const Slide = React.createClass({
  render() {
    return <img {...this.props}/>
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
  render() {
    return (
      <button {...this.props}/>
    )
  }
})

const SliderPlayPause = React.createClass({
  render() {
    return (
      <button {...this.props}/>
    )
  }
})

const SliderNext = React.createClass({
  contextTypes: {
    next: PropTypes.func.isRequired
  },

  render() {
    return (
      <button {...this.props}/>
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
          autoplay={this.state.isPlaying}
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
