import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Setup a hashchange listener so we know when the URL changes. When it does,
// update state and pick which child component we're going to render.

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
//  getInitialState() {
//    return {
//      path: window.location.hash.substring(1)
//    }
//  },
//
//  componentDidMount() {
//    window.addEventListener('hashchange', () => {
//      this.setState({ path: window.location.hash.substring(1) })
//    })
//  },
//
//  render() {
//    const { path } = this.state
//
//    let Child
//    switch (path) {
//      case '/about': Child = About; break
//      case '/inbox': Child = Inbox; break
//      default: Child = Home
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
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Now add some navigation

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
//  getInitialState() {
//    return {
//      path: window.location.hash.substring(1)
//    }
//  },
//
//  componentDidMount() {
//    window.addEventListener('hashchange', () => {
//      this.setState({ path: window.location.hash.substring(1) })
//    })
//  },
//
//  render() {
//    const { path } = this.state
//
//    let Child
//    switch (path) {
//      case '/about': Child = About; break
//      case '/inbox': Child = Inbox; break
//      default: Child = Home
//    }
//
//    return (
//      <div>
//        <h1>Welcome to the app!</h1>
//        <nav>
//          <a href="#/about">About</a>&nbsp;
//          <a href="#/inbox">Inbox</a>&nbsp;
//          <a href="#/">Home</a>
//        </nav>
//        <Child/>
//      </div>
//    )
//  }
//})
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Now, with React Router

//import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
//
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
//const NotFound = React.createClass({
//  render() {
//    return <h2>Not Found: {this.props.params.what}</h2>
//  }
//})
//
//const App = React.createClass({
//  render() {
//    return (
//      <div>
//        <h1>Welcome to the app!</h1>
//        <nav>
//          <Link to="/about">About</Link>&nbsp;
//          <Link to="/inbox">Inbox</Link>&nbsp;
//          <Link to="/">Home</Link>
//        </nav>
//        {this.props.children}
//      </div>
//    )
//  }
//})
//
//ReactDOM.render((
//  <Router history={hashHistory}>
//    <Route path="/" component={App}>
//      <IndexRoute component={Home}/>
//      <Route path="about" component={About}/>
//      <Route path="inbox" component={Inbox}/>
//      <Route path=":what" component={NotFound}/>
//    </Route>
//  </Router>
//), document.getElementById('app'))
