import React, { PropTypes } from 'react'
import CreateContactForm from './CreateContactForm'

const App = React.createClass({

  getInitialState() {
    return {
      contacts: [ { id: 'ryan', first: 'Ryan', last: 'Florence', avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/ryan.jpg' } ]
    }
  },


  handleCreateContact(contact) {
    this.setState({
      contacts: this.state.contacts.concat([ contact ])
    })
  },

  render() {
    return (
      <div>
        <h1>Contacts!</h1>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.state.contacts.map((contact) => (
            <li key={contact.id}>
              <img src={contact.avatar} height="50"/>{' '}
              {contact.first} {contact.last}
            </li>
          ))}
          <li><CreateContactForm onCreate={this.handleCreateContact}/></li>
        </ul>

      </div>
    )
  }
})

export default App

