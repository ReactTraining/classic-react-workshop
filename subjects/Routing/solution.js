////////////////////////////////////////////////////////////////////////////////
// Exercise:
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
// - Move the Profile route to be a sibling to the app route, instead of nested
//   as a child, what happens to the UI?
// - Add a link to the profile page that links back to Home so users don't have
//   to use the Back button to navigate
// - Add a <Redirect> from "/users/:userID" to "/profile/:userID", then type in
//   the url "users/1" into the url and hit enter. Docs are at:
//   https://github.com/rackt/react-router/blob/master/docs/API.md#redirect
// - Add a route that renders at urls the app doesn't understand, read about
//   route matching here to know what to use as your path:
//   https://github.com/rackt/react-router/blob/master/docs/guides/basics/RouteMatching.md
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, Redirect, hashHistory } from 'react-router'
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
    const contactItems = USERS.map(user => (
      <li key={user.email}>
        <Link to={`/profile/${user.id}`}>{user.name}</Link>
      </li>
    ))

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
        <Gravatar email={user.email}/> {user.name}
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
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="profile/:userID" component={Profile}/>
      <Redirect from="/users/:userID" to="/profile/:userID"/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'))
