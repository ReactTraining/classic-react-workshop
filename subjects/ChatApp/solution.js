import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import sortBy from 'sort-by'

require('./styles')

const messageType = PropTypes.shape({
  _key: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
})

const MessageList = React.createClass({

  propTypes: {
    auth: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(messageType).isRequired
  },

  render() {
    const { auth, messages } = this.props
    const sortedMessages = messages
      .filter(m => (/\S/).test(m.text)) // Only keep non-empty messages
      .sort(sortBy('timestamp')) // Sort by timestamp

    // Group subsequent messages from the same sender.
    const messageGroups = []

    let lastMessage, currentMessageGroup
    sortedMessages.forEach(message => {
      if (lastMessage && lastMessage.uid === message.uid) {
        currentMessageGroup.push(message)
      } else {
        if (currentMessageGroup)
          messageGroups.push(currentMessageGroup)

        currentMessageGroup = [ message ]
      }

      lastMessage = message
    })

    if (currentMessageGroup && currentMessageGroup.length)
      messageGroups.push(currentMessageGroup)

    const items = messageGroups.map(group => (
      <li key={group[0]._key} className="message-group">
        <div className="message-group-avatar">
          <img title={group[0].username} src={group[0].avatarURL}/>
        </div>
        <ol className="messages">
        {group.map(message => (
          <li key={message._key} className="message">{message.text}</li>
        ))}
        </ol>
      </li>
    ))

    return (
      <ol className="message-groups">
        {items}
      </ol>
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

  componentWillMount() {
    this.pinToBottom = true
  },

  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth })

      subscribeToMessages(messages => {
        this.setState({ messages })
      })
    })
  },

  componentDidUpdate() {
    if (this.pinToBottom)
      this.scrollToBottom()
  },

  scrollToBottom() {
    const node = this.refs.messages

    if (node)
      node.scrollTop = node.scrollHeight
  },

  handleSubmit(event) {
    event.preventDefault()

    const input = this.refs.message
    const value = input.value
    input.value = ''

    const { auth } = this.state
    sendMessage(auth.uid, auth.github.username, auth.github.profileImageURL, value)

    // Always pin to bottom when we send
    // a new message from this window
    this.pinToBottom = true
  },

  handleScroll(event) {
    const { clientHeight, scrollTop, scrollHeight } = event.target
    this.pinToBottom = clientHeight + scrollTop > (scrollHeight - 10)
  },

  render() {
    const { auth, messages } = this.state

    if (auth == null)
      return <p>Logging in...</p>

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {messages.length}</p>
        </header>
        <div ref="messages" className="messages" onScroll={this.handleScroll}>
          <MessageList auth={auth} messages={messages}/>
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input ref="message" type="text" placeholder="say something..."/>
            <input type="submit" style={{ position: 'absolute', left: -9999 }} tabIndex="-1"/>
          </div>
        </form>
      </div>
    )
  }

})

render(<Chat/>, document.getElementById('app'))
