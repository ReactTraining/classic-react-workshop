////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Tip: The app uses a pop-up window for auth with GitHub. You may need to
//      make sure that you aren't blocking pop-up windows on localhost!
//
// Need some ideas?
//
// - Group subsequent messages from the same sender
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Cause the message list to automatically scroll as new messages come in
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
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

function SmartScroller(props) {
  const autoScroll = useRef(true);
  const nodeRef = useRef();

  function scrollToBottom() {
    if (autoScroll.current) {
      nodeRef.current.scrollTop = nodeRef.current.scrollHeight;
    }
  }

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = nodeRef.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    autoScroll.current = distanceToBottom < 10;
  }

  useEffect(scrollToBottom);

  return <div {...props} ref={nodeRef} onScroll={handleScroll} />;
}

function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    login(user => {
      setUser(user);
      subscribeToMessages(setMessages);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const messageText = inputRef.current.value;

    sendMessage({
      userId: user.id,
      photoURL: user.photoURL,
      text: messageText
    });

    // Clear the form.
    event.target.reset();
  }

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
      <form className="new-message-form" onSubmit={handleSubmit}>
        <div className="new-message">
          <input
            ref={inputRef}
            type="text"
            placeholder="say something..."
          />
        </div>
      </form>
    </div>
  );
}

ReactDOM.render(<Chat />, document.getElementById("app"));
