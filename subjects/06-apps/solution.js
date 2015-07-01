var React = require('react');
var assign = require('object-assign');
var sortBy = require('sort-by');
var escapeRegExp = require('./utils/escapeRegExp');
var { login, sendMessage, subscribeToMessages } = require('./utils/ChatUtils');

require('./styles');

var { arrayOf, shape, string, number, object, func, bool } = React.PropTypes;

var message = shape({
  timestamp: number.isRequired,
  username: string.isRequired,
  text: string.isRequired
});

var MessageListItem = React.createClass({

  propTypes: {
    authoredByViewer: bool.isRequired,
    message: message.isRequired
  },
  
  render() {
    var { authoredByViewer, message } = this.props;

    var className = 'message';

    if (authoredByViewer)
      className += ' own-message';

    return (
      <li className={className}>
        <div className="message-username">{message.username}</div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }

});

var nonEmptyRe = /\S/;

function isValidMessage(message) {
  return typeof message.text === 'string' &&
    nonEmptyRe.test(message.text) &&
    typeof message.username === 'string';
}

var MessageList = React.createClass({

  propTypes: {
    auth: object.isRequired,
    messages: arrayOf(message).isRequired
  },
  
  render() {
    var { auth, messages } = this.props;

    var validMessages = messages.filter(isValidMessage);

    var viewerUsername = auth.github.username;
    var items = validMessages.sort(sortBy('timestamp')).map((message) => {
      return <MessageListItem
        key={message.timestamp}
        authoredByViewer={message.username === viewerUsername}
        message={message}
      />;
    });

    return (
      <ol className="message-list">
        {items}
      </ol>
    );
  }

});

var HiddenSubmitButton = React.createClass({
  
  render() {
    var style = {
      position: 'absolute',
      left: -9999,
      width: 1,
      height: 1
    };

    return (
      <input type="submit" style={style} tabIndex="-1" />
    );
  }

});

var Chat = React.createClass({

  propTypes: {
    onError: func.isRequired
  },

  getDefaultProps() {
    return {
      onError(error) {
        console.error('Login failed!', error);
      }
    };
  },

  getInitialState() {
    return {
      auth: null,
      messages: null
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    var messageTextNode = React.findDOMNode(this.refs.messageText);
    var messageText = messageTextNode.value;
    messageTextNode.value = '';

    var { username } = this.state.auth.github;

    sendMessage(username, messageText);
  },

  componentWillMount() {
    this.pinToBottom = true;
  },

  componentDidMount() {
    login((error, auth) => {
      if (error) {
        this.props.onError.call(this, error);
      } else {
        this.setState({ auth });

        subscribeToMessages((messages) => {
          this.setState({ messages });
        });
      }
    });
  },

  handleScroll(event) {
    var node = event.target;
    var { clientHeight, scrollTop, scrollHeight } = node;
    this.pinToBottom = clientHeight + scrollTop > (scrollHeight - 10);
  },

  componentDidUpdate() {
    var node = React.findDOMNode(this.refs.messages);

    if (node && this.pinToBottom)
      node.scrollTop = node.scrollHeight;
  },

  render() {
    var { auth, messages } = this.state;

    if (auth == null)
      return <p>Loading...</p>;

    if (messages == null)
      return null;

    return (
      <div className="chat">
        <div ref="messages" className="message-list-wrapper" onScroll={this.handleScroll}>
          <MessageList auth={auth} messages={messages} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div id="new-message">
            <input ref="messageText" type="text" placeholder="Type your message here..." />
            <HiddenSubmitButton />
          </div>
        </form>
      </div>
    );
  }
  
});

React.render(<Chat />, document.getElementById('app'));
