import React from 'react'
import ReactDOM from 'react-dom'

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
  propTypes: {
    route: React.PropTypes.string
  },
  render() {
    const { route } = this.props

    let ChildComponent
    switch (route) {
      case '/about': ChildComponent = About; break
      case '/inbox': ChildComponent = Inbox; break
      default: ChildComponent = Home
    }

    return (
      <div>
        <h1>Welcome to the app!</h1>
        <ul>
          <li><a href="#/" className={ChildComponent === Home ? 'active' : ''}>Home</a></li>
          <li><a href="#/about" className={ChildComponent === About ? 'active' : ''}>About</a></li>
          <li><a href="#/inbox" className={ChildComponent === Inbox ? 'active' : ''}>Inbox</a></li>
        </ul>
        <ChildComponent />
      </div>
    )
  }
})

function render() {
  const route = window.location.hash.substring(1)
  ReactDOM.render(<App route={route} />, document.body)
}

window.addEventListener('hashchange', render)
render()

////////////////////////////////////////////////////////////////////////////////
// with the Router

//const About = React.createClass({
//  render() {
//    return <h2>About</h2>
//  }
//})
//
//const Inbox = React.createClass({
//  render() {
//    return <h2>Inbox</h2>
//  }
//})
//
//const Home = React.createClass({
//  render() {
//    return <h2>Home</h2>
//  }
//})
//
//const App = React.createClass({
//  render() {
//    return (
//      <div>
//        <h1>App</h1>
//        <ul>
//          <li><Link to="home">Home</Link></li>
//          <li><Link to="about">About</Link></li>
//          <li><Link to="inbox">Inbox</Link></li>
//        </ul>
//        {this.props.children}
//      </div>
//    )
//  }
//})
//
//import { Router, Route, Redirect, Link, HashHistory } from 'react-router'
//
//ReactDOM.render((
//  <Router history={HashHistory}>
//    <Route component={App}>
//      <Route path="home" component={Home} />
//      <Route path="about" component={About} />
//      <Route path="inbox" component={Inbox} />
//    </Route>
//  </Router>
//), document.body)
