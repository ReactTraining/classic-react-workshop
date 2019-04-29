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

function Chat() {
  return (
    <div className="chat">
      <header className="chat-header">
        <h1 className="chat-title">HipReact</h1>
        <p className="chat-message-count"># messages: 8</p>
      </header>
      <div className="messages">
        <ol className="message-groups">
          <li className="message-group">
            <div className="message-group-avatar">
              <img src="https://avatars1.githubusercontent.com/u/92839" />
            </div>
            <ol className="messages">
              <li className="message">Hey, Bruce!</li>
              <li className="message">
                So, a QA Engineer walks into a bar.
              </li>
              <li className="message">Orders a beer.</li>
              <li className="message">Orders 0 beers.</li>
              <li className="message">Orders 999999999 beers.</li>
              <li className="message">Orders -1 beers.</li>
              <li className="message">Orders a sfdeljknesv.</li>
            </ol>
          </li>
          <li className="message-group">
            <div className="message-group-avatar">
              <img src="https://pbs.twimg.com/profile_images/534863086276988928/bX3juDCC_400x400.jpeg" />
            </div>
            <ol className="messages">
              <li className="message">Ha 😅</li>
            </ol>
          </li>
        </ol>
      </div>
      <form className="new-message-form">
        <div className="new-message">
          <input type="text" placeholder="say something..." />
        </div>
      </form>
    </div>
  );
}

ReactDOM.render(<Chat />, document.getElementById("app"));
