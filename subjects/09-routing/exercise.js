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
// - Add a <Redirect/> from "/users/:userID" to "/profile/:userID"
//   (https://rackt.github.io/react-router/tags/v1.0.0-beta2.html#Redirect)
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var { Router, Route, Link } = require('react-router');
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
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    var contactItems = USERS.map(function (user) {
      return (
        <li key={user.email}>
          {user.name}
        </li>
      );
    });

    return (
      <ul className="people-list">{contactItems}</ul>
    );
  }
});

var Profile = React.createClass({
  render: function () {
    var { userID } = this.props.params;
    var user = getUserByID(userID);

    if (user == null)
      return <p>Cannot find user with id {userID}</p>;

    return (
      <div className="profile">
        <Gravatar email={user.email} /> {user.name}
      </div>
    );
  }
});

React.render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home} />
    </Route>
  </Router>
), document.getElementById('app'), function () {
  require('./tests').run(this);
});
