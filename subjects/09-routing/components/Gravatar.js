var React = require('react');
var MD5 = require('MD5');

var GRAVATAR_URL = 'http://gravatar.com/avatar';

var Gravatar = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired
  },
  getDefaultProps() {
    return {
      size: 80
    };
  },
  render() {
    return (
      <img src={GRAVATAR_URL + '/' + MD5(this.props.email) + '?s=' + this.props.size}/>
    );
  }
});

module.exports = Gravatar;
