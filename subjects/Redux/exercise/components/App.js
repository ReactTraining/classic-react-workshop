import React from 'react'
import CreateContactForm from './CreateContactForm'
import { addContact, loadContacts } from '../actions'
import store from '../store'

class App extends React.Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    loadContacts(store.dispatch)
  }

  createContact(contact) {
    store.dispatch(addContact(contact))
  }

  render() {
    const { contacts } = this.state

    return (
      <div>
        <h1>Contacts!</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {contacts.map(contact => (
            <li key={contact.id}>
              <img src={contact.avatar} height="50"/> {contact.first} {contact.last}
            </li>
          ))}
          <li><CreateContactForm onCreate={contact => this.createContact(contact)}/></li>
        </ul>
      </div>
    )
  }
}

export default App
