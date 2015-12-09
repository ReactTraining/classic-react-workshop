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

ReactDOM.render(<App/>, document.body)

