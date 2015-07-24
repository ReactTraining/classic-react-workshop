var React = require('react');

var style = {
  padding: '4px 8px',
  border: '1px solid #ccc',
  background: '#fff',
  display: 'inline-block'
};

var Factoid = React.createClass({

  getInitialState() {
    return {
      text: ''
    };
  },

  handleInputChange(event) {
    this.setState({
      text: event.target.value
    });
  },

  render() {
    var { text } = this.state;

    var tokens = text.split(' ').map((word, index, arr) => {
      if (word.trim() === '')
        return null;

      return [
        <div style={style}>{word}</div>,
        arr.length - 1 === index ? null : '+'
      ];
    });

    return (
      <div>
        <input onChange={this.handleInputChange} />
        <div style={{ marginTop: 20 }} />
        <div>
          {tokens}
        </div>
      </div>
    );
  }

});

React.render(<Factoid />, document.getElementById('app'));
