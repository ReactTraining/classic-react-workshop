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
  render () {
    var Child, aboutIsActive, inboxIsActive;
    switch (this.props.route) {
      case '/about':
        Child = About;
        aboutIsActive = true;
        break;
      case '/inbox':
        Child = Inbox;
        inboxIsActive = true;
        break;
      default:
        Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about" className={aboutIsActive ? 'active' : ''}>About</a></li>
          <li><a href="#/inbox" className={inboxIsActive ? 'active' : ''}>Inbox</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
});

function render () {
  var route = window.location.hash.substr(1);
  React.render(<App route={route} />, document.body);
}

window.addEventListener('hashchange', render);
render(); // render initially

////////////////////////////////////////////////////////////////////////////////
// with the Router

//var React = require('react');
//var { Router, HashHistory, Route, Link } = require('react-router');
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
//          <li><Link to="about">About</Link></li>
//          <li><Link to="inbox">Inbox</Link></li>
//        </ul>
//        {this.props.children}
//      </div>
//    );
//  }
//});
//
//React.render((
//  <Router history={HashHistory}>
//    <Route component={App}>
//      <Route path="about" component={About}/>
//      <Route path="inbox" component={Inbox}/>
//    </Route>
//  </Router>
//), document.body);
