import React from 'react'
import ReactDOM from 'react-dom'
import ReactRouter from 'react-router'

const messages = [
  { id: 0, title: '', body: '' },
  { id: 1, title: '', body: '' }
]

////////////////////////////////////////////////////////////////////////////////
// Let's build a page without ReactRouter

const About = React.createClass({
  render() {
    return <h2>About</h2>
  }
})

const Inbox = React.createClass({
  render() {
    return <h2>Inbox</h2>
  }
})

const Home = React.createClass({
  render() {
    return <h2>Home</h2>
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Welcome to the app!</h1>
      </div>
    )
  }
})

////////////////////////////////////////////////////////////////////////////////
// Setup a hashchange listener so we know when the URL changes. When it does,
// update state and pick which child component we're going to render.

//const App = React.createClass({
//  getInitialState() {
//    return {
//      url: window.location.hash.substring(1)
//    }
//  },
//
//  handleHashChange() {
//    this.setState({
//      url: window.location.hash.substring(1)
//    })
//  },
//
//  componentDidMount() {
//    window.addEventListener('hashchange', this.handleHashChange)
//  },
//
//  render() {
//    const { url } = this.state
//
//    let Child
//    switch (url) {
//      case '/about':
//        Child = About
//        break
//      case '/inbox':
//        Child = Inbox
//        break
//      default:
//        Child = Home
//        break
//    }
//
//    return (
//      <div>
//        <h1>Welcome to the app!</h1>
//        <Child/>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Now, with React Router

ReactDOM.render(<App/>, document.body)

