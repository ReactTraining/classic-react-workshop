var React = require('react');
var assign = require('object-assign');
var sortBy = require('sort-by');
var escapeRegExp = require('./utils/escapeRegExp');
var { login, sendMessage, subscribeToChannels, subscribeToMessages } = require('./utils/ChatUtils');
var { Router, Route, Redirect, Link } = require('react-router');
var { history } = require('react-router/lib/HashHistory');

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
        <div className="message-username">
          {message.username}
        </div>
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
  getInitialState() {
    return {
      auth: null,
      channels: null
    };
  },

  componentDidMount() {
    login((error, auth) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ auth });
        subscribeToChannels((channels) => {
          this.setState({ channels });
        });
      }
    });
  },

  render() {
    var { auth } = this.state;

    if (auth == null)
      return <p>Logging in...</p>;

    return (
      <div className="chat">
        {React.cloneElement(this.props.children, { auth })}
        <div className="channels">
          {this.state.channels && (
            <ul>
              {this.state.channels.map(channel => (
                <li key={channel._key}>
                  <Link to={"/"+channel._key}>{channel._key}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

});

var Room = React.createClass({

  propTypes: {
    auth: React.PropTypes.object,
    params: React.PropTypes.shape({
      room: React.PropTypes.string
    })
  },

  getInitialState() {
    return {
      messages: []
    };
  },

  componentWillMount() {
    this.messagesSubscription = null;
    this.pinToBottom = true;
  },

  componentDidMount() {
    this.subscribeToMessages(this.props.params.room);
  },

  componentWillReceiveProps(nextProps) {
    this.subscribeToMessages(nextProps.params.room);
  },

  subscribeToMessages(room) {
    if (this.messagesSubscription)
      this.messagesSubscription.dispose();

    this.messagesSubscription = subscribeToMessages(room, (messages) => {
      this.setState({ messages });
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    var messageTextNode = React.findDOMNode(this.refs.messageText);
    var messageText = messageTextNode.value;
    messageTextNode.value = '';

    var { username } = this.props.auth.github;

    this.pinToBottom = true;
    sendMessage('off-topic', username, messageText);
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
    var { auth } = this.props;
    var { messages } = this.state;
    return (
      <div className="room">
        <div ref="messages" className="messages" onScroll={this.handleScroll}>
          <MessageList auth={auth} messages={messages} />
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input ref="messageText" type="text" placeholder="Type your message here..." />
            <HiddenSubmitButton />
          </div>
        </form>
      </div>
    );
  }

});

React.render((
  <Router history={history}>
    <Redirect from="/" to="/general"/>
    <Route component={Chat}>
      <Route path=":room" component={Room}/>
    </Route>
  </Router>
), document.getElementById('app'));
