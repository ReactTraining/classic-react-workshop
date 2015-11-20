////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - show an indication to the user when the entered text is too long
////////////////////////////////////////////////////////////////////////////////
var React = require('react');

var TweetBox = React.createClass({
  propTypes: {
    maxLength: React.PropTypes.number.isRequired
  },
  getDefaultProps: function () {
    return {
      maxLength: 140
    };
  },
  getInitialState: function () {
    return {
      textValue: ''
    };
  },
  handleChange: function (event) {
    this.setState({
      textValue: event.target.value
    });
  },
  render: function () {
    var { textValue } = this.state;

    return (
      <div>
        <div style={{background: 'white', position: 'absolute'}}>
          <textarea
            style={{position: 'relative', background: 'transparent', resize: 'none'}}
            cols={30} rows={6}
            onChange={this.handleChange}
            value={textValue} />
          <div style={{position: 'absolute', right: 0, bottom: -24}}>
            <button>Tweet</button>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<TweetBox />, document.getElementById('app'));
