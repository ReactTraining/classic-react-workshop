import React from 'react'
import axios from 'axios'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>¡Universal App!</h1>
        <ul>
          {this.props.contacts.map(contact => (
            <li key={contact.id}>{contact.first} {contact.last}</li>
          ))}
        </ul>
      </div>
    )
  }
})

export default App
