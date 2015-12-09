////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
//
// - Add some code to App's render method that renders the child route
//   (hint: use this.props.children)
// - Add a new child route beneath App at "/profile/:userID" that shows the
//   user with the given ID (hint: use the Profile component)
// - Add links to the Home view that link to the profile page for each user
// - Move the links to `App`, whats different now?
//
// Got extra time?
//
// Refer to the docs here for help:
// https://github.com/rackt/react-router/blob/latest/docs
// https://github.com/rackt/react-router/blob/latest/docs/API.md
//
// - Add a link to the profile page that links back to Home so users don't have
//   to use the Back button to navigate
// - Add a <Redirect> from "/users/:userID" to "/profile/:userID"
// - Add a route that renders at urls the app doesn't understand (use "*" as the
//   path)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router'
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
      </div>
    )
  }
})

const Home = React.createClass({
  render() {
    const contactItems = USERS.map(function (user) {
      return (
        <li key={user.email}>
          <Link to={`/profile/${user.id}`}>{user.name}</Link>
        </li>
      )
    })

    return (
      <div>
        <h2>Home</h2>
        <ul className="people-list">{contactItems}</ul>
      </div>
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
    return <h1>No routes matched</h1>
  }
})

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))


