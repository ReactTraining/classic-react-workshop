import React, { PropTypes } from 'react'
import CreateContactForm from './CreateContactForm'
import { connect } from 'react-redux'
import { addContact, loadContacts } from '../actions/contacts'

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired
  },

  handleCreateContact(contact) {
    this.props.dispatch(addContact(contact))
  },

  componentDidMount() {
    loadContacts(this.props.dispatch)
  },

  render() {
    return (
      <div>
        <h1>Contacts!</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.props.contacts.map((contact) => (
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

export default connect((state) => {
  return {
    contacts: state.contacts
  }
})(App)
