import React from 'react'
import CreateContactForm from './CreateContactForm'
import { addContact, loadContacts, deleteContact } from '../actions'
import store from '../store'

class App extends React.Component {
  state = {
    contacts: [],
    contactsWithErrors: {},
    contactsBeingDeleted: {}
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState())
    })

    loadContacts(store.dispatch)
  }

  createContact(contact) {
    store.dispatch(addContact(contact))
  }

  deleteContact(contact) {
    deleteContact(store.dispatch, contact.id)
  }

  render() {
    const { contacts, contactsWithErrors, contactsBeingDeleted } = this.state

    return (
      <div>
        <h1>Contacts!</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {contacts.map(contact => (
            <li key={contact.id} style={{
              background: contactsWithErrors[contact.id] ? 'red' : '',
              opacity: contactsBeingDeleted[contact.id] ? '0.25' : ''
            }}>
              <img src={contact.avatar} height={contactsWithErrors[contact.id] ? '200' : '50'}/>{' '}
              {contact.first} {contact.last} {' '}
              {contactsWithErrors[contact.id] ? (
                <p>{contactsWithErrors[contact.id]}</p>
              ) : (
                <button onClick={() => this.deleteContact(contact)}>Delete</button>
              )}
            </li>
          ))}
          <li><CreateContactForm onCreate={contact => this.createContact(contact)}/></li>
        </ul>
      </div>
    )
  }
}

export default App
