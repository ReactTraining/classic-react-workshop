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

const SmartScroller = React.createClass({
  componentDidMount() {
    this.autoScroll = true
    this.scrollToBottom()
  },

  componentDidUpdate() {
    if (this.autoScroll)
      this.scrollToBottom()
  },

  scrollToBottom() {
    this.node.scrollTop = this.node.scrollHeight
  },

  handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this.node
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
    this.autoScroll = distanceToBottom < 10
  },

  render() {
    return (
      <div
        {...this.props}
        ref={node => this.node = node}
        onScroll={this.handleScroll}
      />
    )
  }
})

const Chat = React.createClass({
  getInitialState() {
    return {
      auth: null,
      messages: []
    }
  },

  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth })

      subscribeToMessages(messages => {
        this.setState({ messages })
      })
    })
  },

  handleSubmit(event) {
    event.preventDefault()

    const { auth } = this.state
    const messageText = this.messageInput.value

    if (messageText !== '') {
      sendMessage(
        auth.uid,                       // the auth.uid string
        auth.github.username,           // the username
        auth.github.profileImageURL,    // the user's profile image
        messageText                     // the text of the message
      )

      // Clear the message input.
      this.messageInput.value = ''
    }
  },

  render() {
    const { auth, messages } = this.state

    if (auth == null)
      return <p>Loading...</p>

    // Array of arrays of messages grouped by user.
    const messageGroups = messages.reduce((groups, message) => {
      const lastGroup = groups.length && groups[groups.length - 1]

      if (lastGroup && lastGroup[0].uid === message.uid) {
        lastGroup.push(message)
      } else {
        groups.push([ message ])
      }

      return groups
    }, [])

    const messageGroupItems = messageGroups.map(messages => {
      return (
        <li className="message-group">
          <div className="message-group-avatar">
            <img src={messages[0].avatarURL}/>
          </div>
          <ol className="messages">
            {messages.map(m => (
              <li key={m._key} className="message">{m.text}</li>
            ))}
          </ol>
        </li>
      )
    })

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {messages.length}</p>
        </header>
        <SmartScroller className="messages">
          <ol className="message-groups">
            {messageGroupItems}
          </ol>
        </SmartScroller>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input ref={node => this.messageInput = node} type="text" placeholder="say something..."/>
          </div>
        </form>
      </div>
    )
  }
})

render(<Chat/>, document.getElementById('app'))
