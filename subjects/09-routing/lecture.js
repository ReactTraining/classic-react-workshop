var React = require('react');

var About = React.createClass({
  render: function () {
    return <h2>About</h2>;
  }
});

var Inbox = React.createClass({
  render: function () {
    return <h2>Inbox</h2>;
  }
});

var Home = React.createClass({
  render: function () {
    return <h2>Home</h2>;
  }
});

var App = React.createClass({
  propTypes: {
    route: React.PropTypes.string
  },
  render: function () {
    var { route } = this.props;

    var ChildComponent;
    switch (route) {
      case '/about': ChildComponent = About; break;
      case '/inbox': ChildComponent = Inbox; break;
      default: ChildComponent = Home;
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
    );
  }
});

function render() {
  var route = window.location.hash.substring(1);
  React.render(<App route={route} />, document.body);
}

window.addEventListener('hashchange', render);

render();

////////////////////////////////////////////////////////////////////////////////
// with the Router

//var React = require('react');
//
//var About = React.createClass({
//  render: function () {
//    return <h2>About</h2>;
//  }
//});
//
//var Inbox = React.createClass({
//  render: function () {
//    return <h2>Inbox</h2>;
//  }
//});
//
//var Home = React.createClass({
//  render: function () {
//    return <h2>Home</h2>;
//  }
//});
//
//var App = React.createClass({
//  render () {
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
//    );
//  }
//});
//
//var { Router, Route, Redirect, Link, HashHistory } = require('react-router');
//
//React.render((
//  <Router history={HashHistory}>
//    <Route component={App}>
//      <Route path="home" component={Home} />
//      <Route path="about" component={About} />
//      <Route path="inbox" component={Inbox} />
//    </Route>
//  </Router>
//), document.body);
