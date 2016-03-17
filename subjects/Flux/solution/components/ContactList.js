import React from 'react'
import ContactStore from '../stores/ContactStore'
import ViewActions from '../actions/ViewActionCreators'

const ContactList = React.createClass({

  getDefaultProps() {
    return {
      ContactStore,
      ViewActions
    }
  },

  getInitialState() {
    return this.props.ContactStore.getState()
  },

  handleChange() {
    this.setState(this.props.ContactStore.getState())
  },

  componentDidMount() {
    this.props.ContactStore.addChangeListener(this.handleChange)
    this.props.ViewActions.loadContacts()
  },

  componentWillUnmount() {
    this.props.ContactStore.removeChangeListener(this.handleChange)
  },

  deleteContact(contact) {
    this.props.ViewActions.deleteContact(contact)
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
          <img src={contact.avatar} width="40"/>
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
