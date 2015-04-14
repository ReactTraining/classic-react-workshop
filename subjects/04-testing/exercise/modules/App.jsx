var React = require('react');
var Tabs = require('./Tabs');

var App = React.createClass({
  propTypes: {
    countries: React.PropTypes.array
  },

  render () {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    );
  }
});

module.exports = App;
