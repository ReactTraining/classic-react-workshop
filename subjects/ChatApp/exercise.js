////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

/*
Here's how to use the ChatUtils:

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

class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: 3</p>
        </header>
        <div className="messages">
          <ol className="message-groups">
            <li className="message-group">
              <div className="message-group-avatar">
                <img src="https://avatars1.githubusercontent.com/u/92839"/>
              </div>
              <ol className="messages">
                <li className="message">So, check it out:</li>
                <li className="message">QA Engineer walks into a bar.</li>
                <li className="message">Orders a beer.</li>
                <li className="message">Orders 0 beers.</li>
                <li className="message">Orders 999999999 beers.</li>
                <li className="message">Orders a lizard.</li>
                <li className="message">Orders -1 beers.</li>
                <li className="message">Orders a sfdeljknesv.</li>
              </ol>
            </li>
            <li className="message-group">
              <div className="message-group-avatar">
                <img src="https://avatars2.githubusercontent.com/u/100200"/>
              </div>
              <ol className="messages">
                <li className="message">Haha</li>
                <li className="message">Stop stealing other people's jokes :P</li>
              </ol>
            </li>
            <li className="message-group">
              <div className="message-group-avatar">
                <img src="https://avatars1.githubusercontent.com/u/92839"/>
              </div>
              <ol className="messages">
                <li className="message">:'(</li>
              </ol>
            </li>
          </ol>
        </div>
        <form className="new-message-form">
          <div className="new-message">
            <input ref="message" type="text" placeholder="say something..."/>
          </div>
        </form>
      </div>
    )
  }
}

render(<Chat/>, document.getElementById('app'))
