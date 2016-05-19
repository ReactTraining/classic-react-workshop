import createMediaListener from './lib/createMediaListener'
import React from 'react'
import { render } from 'react-dom'

const media = createMediaListener({
  big: '(min-width : 1000px)',
  tiny: '(max-width: 400px)'
})

const App = React.createClass({

  getInitialState() {
    return {
      media: media.getState()
    }
  },

  componentDidMount() {
    media.listen((media) => {
      this.setState({ media })
    })
  },

  componentWillUnmount() {
    media.dispose()
  },

  render() {
    const { media } = this.state
    return media.big ? (
      <h1>Hey, this is a big screen</h1>
    ) : media.tiny ? (
      <h6>tiny tiny tiny</h6>
    ) : (
      <h3>Meh ...</h3>
    )
  }

})

render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////

//const mediaComponent = (Component, mediaQueries) => {
  //const media = createMediaListener(mediaQueries)

  //return React.createClass({
    //getInitialState() {
      //return {
        //media: media.getState()
      //}
    //},

    //componentDidMount() {
      //media.listen((media) => {
        //this.setState({ media })
      //})
    //},

    //componentWillUnmount() {
      //media.dispose()
    //},

    //render() {
      //return <Component {...this.props} media={this.state.media}/>
    //}
  //})
//}

//const App = React.createClass({

  //propTypes: {
    //media: React.PropTypes.shape({
      //big: React.PropTypes.bool,
      //tiny: React.PropTypes.bool
    //})
  //},

  //render() {
    //const { media } = this.props
    //return media.big ? (
      //<h1>Hey, this is a big screen</h1>
    //) : media.tiny ? (
      //<h6>tiny tiny tiny</h6>
    //) : (
      //<h3>Meh ...</h3>
    //)
  //}

//})

//const AppWithMedia = mediaComponent(App, {
  //big: '(min-width : 1000px)',
  //tiny: '(max-width: 400px)'
//})

//render(<AppWithMedia/>, document.getElementById('app'))

