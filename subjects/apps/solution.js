import React from 'react'
import { render, findDOMNode } from 'react-dom'
import sortBy from 'sort-by'
import { login, sendMessage, subscribeToChannels, subscribeToMessages } from './utils/ChatUtils'

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
    const className = 'message'

    if (authoredByViewer)
      className += ' own-message'

    return (
      <li className={className}>
        <div className="message-avatar">
          <img src={message.avatar} width="40" />
        </div>
        <div className="message-content">
          <div className="message-username">
            {message.username}
          </div>
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

const ChannelList = React.createClass({

  getInitialState() {
    return {
      channels: []
    }
  },

  componentDidMount() {
    subscribeToChannels((channels) => {
      this.setState({ channels })
    })
  },

  render() {
    const defaultChannels = [ { _key: 'general' } ]
    const channels = this.state.channels.length ? this.state.channels : defaultChannels

    return (
      <div className="channels">
        <ul>
          {channels.map(channel => (
            <li key={channel._key}>
              <a href={'/'+channel._key}>{channel._key}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

})

const Chat = React.createClass({

  getInitialState() {
    return {
      auth: null,
      channels: null
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

const Room = React.createClass({

  propTypes: {
    auth: React.PropTypes.object
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
    this.subscribeToMessages('general')
  },

  componentWillReceiveProps(nextProps) {
    this.subscribeToMessages(nextProps.params.room)
  },

  subscribeToMessages(room) {
    if (this.unsubscribe)
      this.unsubscribe()

    this.unsubscribe = subscribeToMessages(room, (messages) => {
      this.setState({ messages })
    })
  },

  handleSubmit(event) {
    event.preventDefault()

    const messageTextNode = findDOMNode(this.refs.messageText)
    const messageText = messageTextNode.value
    messageTextNode.value = ''

    const username = this.props.auth.github.username
    const avatar = this.props.auth.github.profileImageURL

    this.pinToBottom = true
    sendMessage('general', username, avatar, messageText)
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
        <h1 className="room-title">general</h1>
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

render(<Chat />, document.getElementById('app'))
