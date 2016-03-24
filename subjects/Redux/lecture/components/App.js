import React, { PropTypes } from 'react'
import CreateContactForm from './CreateContactForm'
import { fetchContacts } from '../lib/contactsAPI'

const App = React.createClass({
  getInitialState() {
    return {
      contacts: []
    }
  },

  addContactsToState(contacts) {
    this.setState({
      contacts: this.state.contacts.concat(contacts)
    })
  },

  componentDidMount() {
    fetchContacts((error, contacts) => {
      this.addContactsToState(contacts)
    })
  },

  handleCreateContact(contact) {
    this.addContactsToState([ contact ])
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
          <li>
            <CreateContactForm onCreate={this.handleCreateContact}/>
          </li>
        </ul>

      </div>
    )
  }
})

export default App
