import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from './mini-router'

const App = () => (
  <div>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>

    <hr/>

    <Route path="/dashboard" render={() => (
      <div>
        <h2>Dashboard</h2>
      </div>
    )}/>
    <Route path="/about" component={About}/>
    <Route path="/topics" component={Topics}/>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>Rendering with React</li>
      <li>Components</li>
      <li>Props v. State</li>
    </ul>
  </div>
)

ReactDOM.render((
  <Router>
    <App/>
  </Router>
), document.getElementById('app'))
