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

var MessageList = React.createClass({

  propTypes: {
    auth: object.isRequired,
    messages: arrayOf(message).isRequired
  },
  
  render() {
    var { auth, messages } = this.props;

    var viewerUsername = auth.github.username;
    var items = messages.sort(sortBy('timestamp')).map((message) => {
      return <MessageListItem authoredByViewer={message.username === viewerUsername} message={message} />;
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

var LoginButton = React.createClass({
  
  propTypes: {
    onError: func.isRequired,
    onLogin: func
  },

  getDefaultProps() {
    return {
      onError(error) {
        console.error('Login failed!', error);
      }
    };
  },

  handleClick(event) {
    event.preventDefault();

    login((error, auth) => {
      if (error) {
        this.props.onError.call(this, error);
      } else if (this.props.onLogin) {
        this.props.onLogin.call(this, auth);
      }
    });
  },
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }

});

var Chat = React.createClass({

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

  handleLogin(auth) {
    this.setState({ auth });

    subscribeToMessages((messages) => {
      this.setState({ messages });
    });
  },

  render() {
    var { auth, messages } = this.state;

    if (auth == null)
      return <LoginButton onLogin={this.handleLogin}>Login with GitHub</LoginButton>;

    if (messages == null)
      return null;

    return (
      <div className="chat">
        <MessageList auth={auth} messages={messages} />
        <form onSubmit={this.handleSubmit}>
          <div id="new-message">
            <input ref="messageText" type="text" placeholder="Type your message here..." />
          </div>
          <HiddenSubmitButton />
        </form>
      </div>
    );
  }
  
});

React.render(<Chat />, document.getElementById('app'));
