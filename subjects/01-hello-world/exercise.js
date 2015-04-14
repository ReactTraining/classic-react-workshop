////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
var React = require('react');

var App = React.createClass({
  render: function () {
    return <div>Hello World</div>;
  }
});

React.render(<App/>, document.getElementById('app'));
