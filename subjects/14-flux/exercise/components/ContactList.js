import React from 'react'
import { getState, addChangeListener } from '../stores/ContactStore'
import { loadContacts } from '../actions/ViewActionCreators'

const ContactList = React.createClass({
  getInitialState() {
    return getState()
  },

  componentDidMount() {
    loadContacts()
  },

  render() {
    const { contacts, loaded } = this.state

    if (!loaded)
      return <div>Loading...</div>

    const items = contacts.map(contact => {
      return (
        <li key={contact.id}>
          <img src={contact.avatar} width="40"/> {contact.first} {contact.last}
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
