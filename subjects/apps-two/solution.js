var React = require('react');
var sortBy = require('sort-by');
var escapeRegExp = require('./utils/escapeRegExp');
var { Router, Route, Redirect, Link } = require('react-router');
var { login, sendMessage, subscribeToChannels, subscribeToMessages, editMessage, deleteMessage } = require('./utils/ChatUtils');

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
    message: message.isRequired,
    avatar: string,
    channel: string
  },

  confirmRemove() {
    if (confirm('you sure?'))
      deleteMessage(this.props.channel, this.props.message._key);
  },

  render() {
    var { authoredByViewer, message } = this.props;

    var className = 'message';

    if (authoredByViewer)
      className += ' own-message';

    return (
      <li className={className}>
        <div className="message-avatar">
          <img src={message.avatar} width="40" /><br />
        </div>
        <div className="message-content">
          <div className="message-username">
            {message.username}
          </div>
          <div className="message-text">{message.text}</div>
          <button
            className="delete-button"
            onClick={this.confirmRemove}
          >delete</button>
        </div>
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
    messages: arrayOf(message).isRequired,
    channel: string.isRequired
  },

  render() {
    var { auth, messages, channel } = this.props;

    var validMessages = messages.filter(isValidMessage);

    var viewerUsername = auth.github.username;
    var items = validMessages.sort(sortBy('timestamp')).map((message, index) => {
      return <MessageListItem
        channel={channel}
        key={index}
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

var ChannelList = React.createClass({
  getInitialState() {
    return {
      channels: []
    };
  },

  componentDidMount() {
    subscribeToChannels((channels) => {
      this.setState({ channels });
    });
  },

  render() {
    var defaultChannels = [{ _key: 'general' }];
    var channels = this.state.channels.length ?
      this.state.channels : defaultChannels;
    return (
      <div className="channels">
        <ul>
          {channels.map(channel => (
            <li key={channel._key}>
              <Link to={"/"+channel._key}>{channel._key}</Link>
            </li>
          ))}
        </ul>
      </div>
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
        <ChannelList />
      </div>
    );
  }

});

var Channel = React.createClass({

  propTypes: {
    auth: object,
    params: shape({
      channel: string
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
    this.subscribeToMessages(this.props.params.channel);
  },

  componentWillReceiveProps(nextProps) {
    this.subscribeToMessages(nextProps.params.channel);
  },

  subscribeToMessages(channel) {
    if (this.messagesSubscription)
      this.messagesSubscription.dispose();

    this.messagesSubscription = subscribeToMessages(channel, (messages) => {
      this.setState({ messages });
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    var messageTextNode = React.findDOMNode(this.refs.messageText);
    var messageText = messageTextNode.value;
    messageTextNode.value = '';

    var username = this.props.auth.github.username;
    var avatar = this.props.auth.github.profileImageURL;

    this.pinToBottom = true;
    sendMessage(this.props.params.channel, username, avatar, messageText);
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
    console.log(this.props.params);
    return (
      <div className="channel">
        <h1 className="channel-title">{this.props.params.channel}</h1>
        <div ref="messages" className="messages" onScroll={this.handleScroll}>
          <MessageList channel={this.props.params.channel} auth={auth} messages={messages} />
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
  <Router>
    <Redirect from="/" to="/general" />
    <Route component={Chat}>
      <Route path=":channel" component={Channel} />
    </Route>
  </Router>
), document.getElementById('app'));
