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
    var charsRemaining = this.props.maxLength - textValue.length;
    var isTooLong = charsRemaining < 0;

    return (
      <div>
        <div style={{background: isTooLong ? 'rgba(255,0,0,0.2)' : 'white', position: 'absolute'}}>
          <textarea
            style={{position: 'relative', background: 'transparent', resize: 'none'}}
            cols={30} rows={6}
            onChange={this.handleChange}
            value={this.state.textValue} />
          <div style={{position: 'absolute', right: 0, bottom: -24}}>
            <span style={{color: isTooLong ? 'red' : 'black'}}>{charsRemaining}</span>{' '}
            <button>Tweet</button>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<TweetBox />, document.getElementById('app'));
