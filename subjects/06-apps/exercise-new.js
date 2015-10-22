////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you.
//
// Already done?
//
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
//
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var { login, sendMessage, subscribeToMessages } = require('./utils/ChatUtils');
var sortBy = require('sort-by');

var { arrayOf, func, number, shape, string } = React.PropTypes;

require('./styles');

var message = shape({
  avatar: string,
  text: string,
  timestamp: number,
  username: string
});

var urlFormat = /^https?:\/\//;

function isURL(string) {
  return urlFormat.test(string);
}

function formatMessageText(text) {
  if (isURL(text))
    return <a href={text}>{text}</a>;

  return text;
}

var MessageList = React.createClass({
  propTypes: {
    messages: arrayOf(message)
  },
  render() {
    var { messages } = this.props;
    var messageItems = messages.sort(sortBy('timestamp')).map((message) => {
      return <li key={message._key}>{formatMessageText(message.text)}</li>;
    });

    return (
      <ol>
        {messageItems}
      </ol>
    );
  }
});

var ScrollManager = React.createClass({
  scrollToBottom() {
    var node = React.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  adjustScrollPosition() {
    if (this.pinToBottom)
      this.scrollToBottom();
  },
  componentWillMount() {
    this.pinToBottom = true;
  },
  componentDidMount() {
    this.adjustScrollPosition();
  },
  componentWillUpdate() {
    var node = React.findDOMNode(this);
    var { clientHeight, scrollHeight, scrollTop } = node;
    this.pinToBottom = (scrollHeight - (clientHeight + scrollTop)) < 10;
  },
  componentDidUpdate() {
    this.adjustScrollPosition();
  },
  render() {
    return (
      <div style={{ position: 'absolute', height: '100%', width: '100%', overflowY: 'scroll' }}>
        {this.props.children}
      </div>
    );
  }
});

var NewMessageBox = React.createClass({
  propTypes: {
    onMessage: func
  },
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      var messageText = event.target.value;

      event.target.value = '';

      if (this.props.onMessage)
        this.props.onMessage(messageText);
    }
  },
  render() {
    return (
      <div
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <input
          type="text"
          onKeyUp={this.handleKeyUp}
          style={{ width: '100%' }}
          placeholder="Yo, what's up?"
        />
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      auth: null,
      messages: null
    };
  },
  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth });

      subscribeToMessages('general', (messages) => {
        this.setState({ messages });
      });
    });
  },
  handleMessage(messageText) {
    var { auth } = this.state;

    sendMessage(
      'general',
      auth.github.username,
      auth.github.profileImageURL,
      messageText
    );
  },
  handleScroll(event) {
    console.log(event.target.scrollTop);
  },
  render() {
    var { messages } = this.state;

    if (messages == null)
      return <p>Loading...</p>;

    return (
      <div>
        <ScrollManager>
          <MessageList messages={messages} />
        </ScrollManager>
        <NewMessageBox onMessage={this.handleMessage} />
      </div>
    )
  }
});

React.render(<App />, document.getElementById('app'));

/*

Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a github
  // `auth` object
});

sendMessage(
  'general', // the channel to post a message to, please post to "general" at first
  'ryanflorence', // the github user name
  'https://avatars.githubusercontent.com/u/100200?v=3', // the github avatar
  'hello, this is a message' // the actual message
);

var unsubscribe = subscribeToMessages('general', (messages) => {
  // here are your messages as an array, it will be called
  // every time the messages change
});
unsubscribe(); // stop listening for changes

The world is your oyster!

*/

