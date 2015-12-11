import React from 'react'
import CreateContactForm from './CreateContactForm'
import { connect } from 'react-redux'
import { addContact, loadContacts } from '../actions/contacts'

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
    this.props.dispatch(loadContacts())
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
    counter: state.counter
  }
})(App)

