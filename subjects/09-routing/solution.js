////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Add a <RouteHandler> to App's render method that renders the child route
// - Add a new child route beneath App called "profile" that renders at /users/:userID
//   and shows the user with the given ID (hint: use the Profile component as the handler)
// - Add links to the Home view that link to the profile page for each user
//
// Got extra time?
// - Add a link to the profile page that links back to Home
// - If the user is not found, "redirect" to a special NotFound component
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var { Router, Route, Link, Redirect } = require('react-router');
var HashHistory = require('react-router/lib/HashHistory');
var Gravatar = require('./components/Gravatar');

var USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
];

function getUserByID(id) {
  for (var i = 0; i < USERS.length; ++i)
    if (USERS[i].id === parseInt(id, 10))
      return USERS[i];

  return null;
}

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>People Viewer</h1>
        {this.props.children}
      </div>
    )
  }
})

var Home = React.createClass({
  render: function () {
    var items = USERS.map(function (user) {
      return (
        <li key={user.email}>
          <Link to={`/profile/${user.id}`}>{user.name}</Link>
        </li>
      );
    });

    return (
      <ul>{items}</ul>
    );
  }
});

var Profile = React.createClass({
  render: function () {
    var user = getUserByID(this.props.params.userID);

    if (user == null)
      return <p>Cannot find user with id {this.getParams().userID}</p>;

    return (
      <div className="Profile">
        <Gravatar email={user.email}/> {user.name}
      </div>
    );
  }
});

var NoMatch = React.createClass({
  render: function () {
    return <p>I don’t understand that route</p>;
  }
});

React.render((
  <Router history={new HashHistory()}>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/profile/:userID" component={Profile}/>
    </Route>
    <Redirect from="/users/:userID" to="/profile/:userID"/>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));

