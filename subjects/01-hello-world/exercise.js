import React from 'react';

var App = React.createClass({
  render: function () {
    return <div>Hello World</div>;
  }
});

React.render(<App/>, document.getElementById('app'));
