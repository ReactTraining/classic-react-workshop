import React from 'react'
import CreateContactForm from './CreateContactForm'
import Sidebar from './Sidebar'
import connect from '../mini-redux/connect'

const { func, number, array } = React.PropTypes

const App = React.createClass({

  getInitialState() {
    return {
      contacts: [
        { id: 'ryan', first: 'Ryan', last: 'Florence', avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/ryan.jpg' },
        { id: 'michael', first: 'Michael', last: 'Jackson', avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/michael.jpg' }
      ]
    }
  },

  handleCreateContact(contact) {
    this.setState({
      contacts: this.state.contacts.concat([ contact ])
    })
  },

  increment() {
    this.props.dispatch({ type: 'INCREMENT' })
  },

  render() {
    return (
      <div>
        <h1>Contacts! {this.props.counter}</h1>
        <button onClick={this.increment}>Increment</button>
        <div style={{ visibility: 'hidden', display: 'flex' }}>
          <div style={{ flex: 1 }}>
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
          <Sidebar contacts={this.state.contacts}/>
        </div>

      </div>
    )
  }
})

export default connect((state) => {
  return { counter: state }
})(App)

