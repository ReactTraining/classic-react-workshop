////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { login, sendMessage, subscribeToMessages } from "./utils";

/*
Here's how to use the utils:

login(user => {
  // do something with the user object
})

sendMessage({
  userId: user.id,
  photoURL: user.photoURL,
  text: 'hello, this is a message'
})

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

class SmartScroller extends React.Component {
  autoScroll = true;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.autoScroll) this.scrollToBottom();
  }

  scrollToBottom() {
    this.node.scrollTop = this.node.scrollHeight;
  }

  handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = this.node;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    this.autoScroll = distanceToBottom < 10;
  };

  render() {
    return (
      <div
        {...this.props}
        ref={node => (this.node = node)}
        onScroll={this.handleScroll}
      />
    );
  }
}

class Chat extends React.Component {
  state = {
    user: null,
    messages: []
  };

  componentDidMount() {
    login(user => {
      this.setState({ user });

      subscribeToMessages(messages => {
        this.setState({ messages });
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { user } = this.state;
    const messageText = this.messageInput.value;

    sendMessage({
      userId: user.id,
      photoURL: user.photoURL,
      text: messageText
    });

    // Clear the form.
    event.target.reset();
  };

  render() {
    const { user, messages } = this.state;

    if (user == null) return <p>Loading...</p>;

    // Array of arrays of messages grouped by user.
    const messageGroups = messages.reduce((groups, message) => {
      const prevGroup = groups.length && groups[groups.length - 1];

      if (prevGroup && prevGroup[0].userId === message.userId) {
        prevGroup.push(message);
      } else {
        groups.push([message]);
      }

      return groups;
    }, []);

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count">
            # messages: {messages.length}
          </p>
        </header>
        <SmartScroller className="messages">
          <ol className="message-groups">
            {messageGroups.map(group => (
              <li key={group[0].id} className="message-group">
                <div className="message-group-avatar">
                  <img src={group[0].photoURL} />
                </div>
                <ol className="messages">
                  {group.map(message => (
                    <li key={message.id} className="message">
                      {message.text}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </SmartScroller>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input
              ref={node => (this.messageInput = node)}
              type="text"
              placeholder="say something..."
            />
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Chat />, document.getElementById("app"));
