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
// - add a <NotFoundRoute/> route that renders at urls the app doesn't understand
//   (https://github.com/rackt/react-router/blob/master/docs/api/components/NotFoundRoute.md)
// - add a <Redirect/>
//   (https://github.com/rackt/react-router/blob/master/docs/api/components/Redirect.md)
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var Router = require('react-router');
var { Route, Link, State, RouteHandler } = Router;
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
    var items = USERS.map(function (user) {
      return (
        <li key={user.email}>
          {user.name}
        </li>
      );
    });

    return (
      <ul>{items}</ul>
    );
  }
});

var Profile = React.createClass({
  mixins: [ State ],
  render: function () {
    var user = getUserByID(this.getParams().userID);

    if (user == null)
      return <p>Cannot find user with id {this.getParams().userID}</p>;

    return (
      <div className="Profile">
        <Gravatar email={user.email}/> {user.name}
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  React.render(<Handler/>, document.getElementById('app'));
});
