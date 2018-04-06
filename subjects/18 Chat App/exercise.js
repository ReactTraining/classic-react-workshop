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
import { render } from "react-dom";
import { login, sendMessage, subscribeToMessages } from "./utils";

/*
Here's how to use the utils:

login((error, auth) => {
  // hopefully the error is `null` and you have a auth.github object
})

sendMessage(
  auth.uid,                       // the auth.uid string
  auth.github.username,           // the username
  auth.github.profileImageURL,    // the user's profile image
  'hello, this is a message'      // the text of the message
)

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

import sortBy from "sort-by";

class PinToBottom extends React.Component {
  componentDidMount() {
    this.autoScroll = true;
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.autoScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const scroller = this.node;
    scroller.scrollTop = scroller.scrollHeight;
  }

  handleScroll = event => {
    // If they are scrolled back, do not auto scroll!
    const node = event.target;
    const { scrollTop, scrollHeight, clientHeight } = node;
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
    auth: null,
    messages: []
  };

  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth });

      subscribeToMessages(messages => {
        this.setState({ messages });
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { auth } = this.state;
    const messageText = this.refs.message.value;

    sendMessage(
      auth.uid, // the auth.uid string
      auth.github.username, // the username
      auth.github.profileImageURL, // the user's profile image
      messageText // the text of the message
    );

    event.target.reset();
  };

  render() {
    const { auth, messages } = this.state;

    if (auth == null) {
      return <p>Authorizing...</p>;
    }

    const messageGroups = messages
      .sort(sortBy("timestamp"))
      .reduce((groups, message) => {
        const lastGroup = groups[groups.length - 1];
        const lastMessage =
          lastGroup && lastGroup[lastGroup.length - 1];

        if (lastMessage && lastMessage.uid === message.uid) {
          // The same person is speaking!
          lastGroup.push(message);
        } else {
          // A new person said something.
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
        <PinToBottom className="messages">
          <ol className="message-groups">
            {messageGroups.map((messages, index) => (
              <li className="message-group" key={index}>
                <div className="message-group-avatar">
                  <img src={messages[0].avatarURL} />
                </div>
                <ol className="messages">
                  {messages.map(message => (
                    <li className="message" key={message._key}>
                      {message.text}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </PinToBottom>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input
              ref="message"
              type="text"
              placeholder="say something..."
            />
          </div>
        </form>
      </div>
    );
  }
}

render(<Chat />, document.getElementById("app"));
