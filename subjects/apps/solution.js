import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import sortBy from 'sort-by'

require('./styles')

const { arrayOf, shape, string, number, object, func, bool } = React.PropTypes

const message = shape({
  timestamp: number.isRequired,
  username: string.isRequired,
  text: string.isRequired
})

const MessageListItem = React.createClass({

  propTypes: {
    authoredByViewer: bool.isRequired,
    message: message.isRequired,
    avatar: string
  },

  render() {
    const { authoredByViewer, message } = this.props
    let className = 'message'

    if (authoredByViewer)
      className += ' own-message'

    return (
      <li className={className}>
        <div className="message-avatar">
          <img src={message.avatarURL} width="40" />
        </div>
        <div className="message-content">
          <div className="message-username">{message.username}</div>
          <div className="message-text">{message.text}</div>
        </div>
      </li>
    )
  }

})

const MessageList = React.createClass({

  propTypes: {
    auth: object.isRequired,
    messages: arrayOf(message).isRequired
  },

  render() {
    const { auth, messages } = this.props

    const viewerUsername = auth.github.username
    const items = messages.sort(sortBy('timestamp')).map((message, index) =>
      <MessageListItem
        key={index}
        authoredByViewer={message.username === viewerUsername}
        message={message}
      />
    )

    return (
      <ol className="message-list">
        {items}
      </ol>
    )
  }

})

const HiddenSubmitButton = React.createClass({

  render() {
    const style = {
      position: 'absolute',
      left: -9999,
      width: 1,
      height: 1
    }

    return (
      <input type="submit" style={style} tabIndex="-1" />
    )
  }

})

const Room = React.createClass({

  propTypes: {
    auth: object.isRequired
  },

  getInitialState() {
    return {
      messages: []
    }
  },

  componentWillMount() {
    this.unsubscribe = null
    this.pinToBottom = true
  },

  componentDidMount() {
    this.subscribeToMessages()
  },

  subscribeToMessages() {
    if (this.unsubscribe)
      this.unsubscribe()

    this.unsubscribe = subscribeToMessages(messages => {
      this.setState({ messages })
    })
  },

  handleSubmit(event) {
    event.preventDefault()

    const messageTextNode = findDOMNode(this.refs.messageText)
    const messageText = messageTextNode.value
    messageTextNode.value = ''

    const { auth } = this.props
    const username = auth.github.username
    const avatarURL = auth.github.profileImageURL

    sendMessage(auth.uid, username, avatarURL, messageText)

    this.pinToBottom = true
  },

  handleScroll(event) {
    const { clientHeight, scrollTop, scrollHeight } = event.target
    this.pinToBottom = clientHeight + scrollTop > (scrollHeight - 10)
  },

  componentDidUpdate() {
    const node = findDOMNode(this.refs.messages)

    if (node && this.pinToBottom)
      node.scrollTop = node.scrollHeight
  },

  render() {
    const { auth } = this.props
    const { messages } = this.state

    return (
      <div className="room">
        <h1 className="room-title">hip-react</h1>
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
    )
  }

})

const Chat = React.createClass({

  getInitialState() {
    return {
      auth: null
    }
  },

  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth })
    })
  },

  render() {
    const { auth } = this.state

    if (auth == null)
      return <p>Logging in...</p>

    return (
      <div className="chat">
        <Room auth={auth} />
      </div>
    )
  }

})

render(<Chat />, document.getElementById('app'))
