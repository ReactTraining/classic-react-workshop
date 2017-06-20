import React from 'react'
import PropTypes from 'prop-types'
import CreateContactForm from './CreateContactForm'

class App extends React.Component {
  state = {
    contacts: [
      { id: 'ryan', first: 'Ryan', last: 'Florence', avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/ryan.jpg' },
      { id: 'mj', first: 'Michael', last: 'Jackson', avatar: 'https://avatars1.githubusercontent.com/u/92839' }
    ]
  }

  handleCreateContact = (contact) => {
    this.setState({
      contacts: this.state.contacts.concat([ contact ])
    })
  }

  render() {
    return (
      <div>
        <h1>Contacts!</h1>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.state.contacts.map((contact) => (
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
}

export default App
