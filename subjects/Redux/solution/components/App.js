import React, { PropTypes } from 'react'
import CreateContactForm from './CreateContactForm'
import { connect } from 'react-redux'
import { addContact, loadContacts, deleteContact } from '../actions/contacts'

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired
  },

  componentDidMount() {
    loadContacts(this.props.dispatch)
  },

  handleCreateContact(contact) {
    this.props.dispatch(addContact(contact))
  },

  deleteContact(contact) {
    deleteContact(this.props.dispatch, contact.id)
  },

  render() {
    const { contacts, contactsWithErrors, contactsBeingDeleted } = this.props

    return (
      <div>
        <h1>Contacts!</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {contacts.map((contact) => (
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
          <li><CreateContactForm onCreate={this.handleCreateContact}/></li>
        </ul>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    contacts: state.contacts,
    contactsWithErrors: state.contactsWithErrors,
    contactsBeingDeleted: state.contactsBeingDeleted
  }
})(App)
