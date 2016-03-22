import React from 'react'
import CreateContactForm from './CreateContactForm'
import { connect } from 'react-redux'
import { addContact, loadContacts, deleteContact } from '../actions/contacts'

const { func, number, array } = React.PropTypes

const App = React.createClass({

  propTypes: {
    dispatch: func.isRequired,
    counter: number.isRequired,
    contacts: array.isRequired
  },

  handleCreateContact(contact) {
    this.props.dispatch(addContact(contact))
  },

  componentDidMount() {
    const { dispatch } = this.props
    loadContacts(dispatch)
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
                <button onClick={() => {
                  deleteContact(contact.id, this.props.dispatch)
                }}>Delete</button>
              )}
            </li>
          ))}
          <li><CreateContactForm onCreate={this.handleCreateContact}/></li>
        </ul>

        <button onClick={() => {
          this.props.dispatch({ type: 'INCREMENT_COUNTER' })
        }}>counter</button>
        <pre>{this.props.counter}</pre>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    counter: state.counter,
    contacts: state.contacts,
    contactsWithErrors: state.contactsWithErrors,
    contactsBeingDeleted: state.contactsBeingDeleted
  }
})(App)

