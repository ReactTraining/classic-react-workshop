import React from 'react'
import { getState, addChangeListener, removeChangeListener } from '../stores/ContactStore'
import { loadContacts, deleteContact } from '../actions/ViewActionCreators'

const ContactList = React.createClass({
  getInitialState() {
    return getState()
  },

  handleChange() {
    this.setState(getState())
  },

  componentDidMount() {
    addChangeListener(this.handleChange)
    loadContacts()
  },

  componentWillUnmount() {
    removeChangeListener(this.handleChange)
  },

  deleteContact(contact) {
    deleteContact(contact)
  },

  render() {
    const { contacts, deletingContacts, errors, loaded } = this.state

    if (!loaded)
      return <div>Loading...</div>

    const items = contacts.map(contact => {
      const error = errors[contact.id]
      const isDeleting = deletingContacts.indexOf(contact) !== -1

      return (
        <li key={contact.id} style={{ backgroundColor: error ? 'red' : 'transparent' }}>
          <img src={contact.avatar} width="40" />
          {' '}{contact.first} {contact.last}{' '}
          {error
          ? <p>{error.message}</p>
          : <button disabled={isDeleting} onClick={() => this.deleteContact(contact)}>delete</button>
          }
        </li>
      )
    })

    return (
      <div>
        <ul>{items}</ul>
      </div>
    )
  }
})

export default ContactList
