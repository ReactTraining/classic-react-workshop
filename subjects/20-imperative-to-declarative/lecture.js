import React, { render } from 'react'
import { createTheremin } from './lib/Theremin'

let styles = {}

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: '1px solid',
  cursor: 'crosshair',
  margin: 10,
  display: 'inline-block'
}

let App = React.createClass({

  componentWillMount () {
    this.theremin = createTheremin()
  },

  play () {
    this.theremin.play()
  },

  stop () {
    this.theremin.stop()
  },

  changeTone (event) {
    let { clientX, clientY } = event
    let { top, right, bottom, left } = event.target.getBoundingClientRect()
    let pitch = (clientX - left) / right
    let volume = 1 - (clientY - top) / bottom
    this.theremin.setPitchBend(pitch)
    this.theremin.setVolume(volume)
  },

  render () {
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
});







////////////////////////////////////////////////////////////////////////////////
// Can't predict what the sound is going to be by looking at state or the render
// method, but componentDidUpdate makes things a lot easier to think about

//let App = React.createClass({

  //getInitialState () {
    //return {
      //isPlaying: false,
      //pitch: 0,
      //volume: 0
    //}
  //},

  //componentWillMount () {
    //this.theremin = createTheremin()
  //},

  //play () {
    //this.setState({ isPlaying: true })
  //},

  //stop () {
    //this.setState({ isPlaying: false })
  //},

  //changeTone (event) {
    //let { clientX, clientY } = event
    //let { top, right, bottom, left } = event.target.getBoundingClientRect()
    //let pitch = (clientX - left) / right
    //let volume = 1 - (clientY - top) / bottom
    //this.setState({ pitch, volume })
  //},

  //componentDidUpdate () {
    //if (this.state.isPlaying)
      //this.theremin.play()
    //else
      //this.theremin.stop()

    //this.theremin.setPitchBend(this.state.pitch)
    //this.theremin.setVolume(this.state.volume)
  //},

  //render () {
    //return (
      //<div>
        //<h1>What does it mean to be declarative?</h1>
        //<div
          //style={styles.theremin}
          //onMouseEnter={this.play}
          //onMouseLeave={this.stop}
          //onMouseMove={this.changeTone}
        ///>
      //</div>
    //)
  //}
//});










////////////////////////////////////////////////////////////////////////////////
// We can do even better and make this fully declarative for the App, instead
// of using an imperative API `this.theremin`, lets wrap that up into a
// component and be able to control it declaratively

//let Tone = React.createClass({
  //componentWillMount () {
    //this.theremin = createTheremin()
  //},

  //componentDidMount () {
    //this.doImperativeWork()
  //},

  //componentDidUpdate () {
    //this.doImperativeWork()
  //},

  //doImperativeWork () {
    //if (this.props.isPlaying)
      //this.theremin.play()
    //else
      //this.theremin.stop()

    //this.theremin.setPitchBend(this.props.pitch)
    //this.theremin.setVolume(this.props.volume)
  //},

  //render () {
    //return null
  //}
//})

//let App = React.createClass({
  //getInitialState () {
    //return {
      //isPlaying: false,
      //pitch: 0,
      //volume: 0
    //}
  //},

  //play () {
    //this.setState({ isPlaying: true })
  //},

  //stop () {
    //this.setState({ isPlaying: false })
  //},

  //changeTone (event) {
    //let { clientX, clientY } = event
    //let { top, right, bottom, left } = event.target.getBoundingClientRect()
    //let pitch = (clientX - left) / right
    //let volume = 1 - (clientY - top) / bottom
    //this.setState({ pitch, volume })
  //},

  //render () {
    //return (
      //<div>
        //<h1>What does it mean to be declarative?</h1>
        //<div
          //style={styles.theremin}
          //onMouseEnter={this.play}
          //onMouseLeave={this.stop}
          //onMouseMove={this.changeTone}
        //>
          //<Tone
            //pitch={this.state.pitch}
            //volume={this.state.volume}
            //isPlaying={this.state.isPlaying}
          ///>
        //</div>
      //</div>
    //)
  //}
//});









////////////////////////////////////////////////////////////////////////////////
// Let's go all the way and make a Theremin component

//let Tone = React.createClass({

  //getDefaultProps () {
    //return {
      //pitch: 50,
      //volume: 50,
      //type: 'sine'
    //}
  //},

  //componentWillMount () {
    //this.theremin = createTheremin()
  //},

  //componentDidMount () {
    //this.doImperativeWork()
  //},

  //componentDidUpdate () {
    //this.doImperativeWork()
  //},

  //doImperativeWork () {
    //if (this.props.isPlaying)
      //this.theremin.play()
    //else
      //this.theremin.stop()

    //this.theremin.setPitchBend(this.props.pitch)
    //this.theremin.setVolume(this.props.volume)
    //this.theremin.setType(this.props.type)
  //},

  //render () {
    //return null
  //}
//})

//let Theremin = React.createClass({
  //getInitialState () {
    //return {
      //isPlaying: false,
      //pitch: 0,
      //volume: 0
    //}
  //},

  //play () {
    //this.setState({ isPlaying: true })
  //},

  //stop () {
    //this.setState({ isPlaying: false })
  //},

  //changeTone (event) {
    //let { clientX, clientY } = event
    //let { top, right, bottom, left } = event.target.getBoundingClientRect()
    //let pitch = (clientX - left) / right
    //let volume = 1 - (clientY - top) / bottom
    //this.setState({ pitch, volume })
  //},

  //render () {
    //return (
      //<div
        //style={styles.theremin}
        //onMouseEnter={this.play}
        //onMouseLeave={this.stop}
        //onMouseMove={this.changeTone}
      //>
        //<Tone
          //pitch={this.state.pitch}
          //volume={this.state.volume}
          //isPlaying={this.state.isPlaying}
          //type={this.props.type}
        ///>
      //</div>
    //)
  //}
//})

//let App = React.createClass({
  //render () {
    //return (
      //<div>
        //<h1>What does it mean to be declarative?</h1>
        //<Theremin type="sine" />
        //<Theremin type="triangle" />
        //<Theremin type="square" />
        //<Theremin type="sawtooth" />
      //</div>
    //)
  //}
//});

////////////////////////////////////////////////////////////////////////////////
// When you isolate all imperative work into components then the application
// using them can model their UI in a declarative, predictible way because
// its renders based on a snapshot of state, time has been removed from the
// equation.
//
// Additionally, when the components doing the imperative work do it all in
// componentDidMount and componenDidUpdate, you even make the imperative
// work predictable because it's based on a snapshot of state in time also.

render(<App />, document.getElementById('app'))

