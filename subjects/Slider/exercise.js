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

  render() {
    return (
      <div {...this.props}/>
    )
  }
}

class SliderStage extends React.Component {
  render() {
    return (
      <div {...this.props}/>
    )
  }
}

class Slide extends React.Component {
  render() {
    return <img {...this.props}/>
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
  render() {
    return (
      <button {...this.props}/>
    )
  }
}

class SliderPlayPause extends React.Component {
  render() {
    return (
      <button {...this.props}/>
    )
  }
}

class SliderNext extends React.Component {
  render() {
    return (
      <button {...this.props}/>
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
}

render(<App/>, document.getElementById('app'))
