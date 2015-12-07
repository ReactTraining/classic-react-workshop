////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Add some code to App's render method that renders the child route
//   (hint: use this.props.children)
// - Add a new child route beneath App at "/profile/:userID" that shows the
//   user with the given ID (hint: use the Profile component)
// - Add links to the Home view that link to the profile page for each user
//
// Got extra time?
//
// - Add a link to the profile page that links back to Home so users don't have
//   to use the Back button to navigate
// - Add a route that renders at urls the app doesn't understand (use "*" as the path)
// - Add a <Redirect> from "/users/:userID" to "/profile/:userID"
//   (https://rackt.github.io/react-router/tags/v1.0.0-beta2.html#Redirect)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
import Gravatar from './components/Gravatar'

const USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
]

function getUserByID(id) {
  for (let i = 0; i < USERS.length; ++i)
    if (USERS[i].id === parseInt(id, 10))
      return USERS[i]

  return null
}

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>People Viewer</h1>
        {this.props.children}
      </div>
    )
  }
})

const Home = React.createClass({
  render() {
    const items = USERS.map(function (user) {
      return (
        <li key={user.email}>
          <Link to={`/profile/${user.id}`}>{user.name}</Link>
        </li>
      )
    })

    return (
      <ul className="people-list">{items}</ul>
    )
  }
})

const Profile = React.createClass({
  render() {
    const { userID } = this.props.params
    const user = getUserByID(userID)

    if (user == null)
      return <p>Cannot find user with id {userID}</p>

    return (
      <div className="profile">
        <Gravatar email={user.email} /> {user.name}
      </div>
    )
  }
})

const NoMatch = React.createClass({
  render() {
    return <p>I don’t understand that route</p>
  }
})

ReactDOM.render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="/profile/:userID" component={Profile} />
    </Route>
    <Redirect from="/users/:userID" to="/profile/:userID" />
    <Route path="*" component={NoMatch} />
  </Router>
), document.getElementById('app'), function () {
  require('./tests').run(this)
})
