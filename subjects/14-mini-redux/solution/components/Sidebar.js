import React from 'react'
import serializeForm from 'form-serialize'

const Sidebar = React.createClass({

  propTypes: {
    contacts: React.PropTypes.array.isRequired
  },

  remove(contact) {
    this.props.onRemove(contact)
  },

  render() {
    return (
      <aside>
        <ul>
          {this.props.contacts.map((contact) => (
            <li key={contact.id}>
              {contact.first} {contact.last}{' '}
              <button onClick={() => this.remove(contact)}>remove</button>
            </li>
          ))}
        </ul>
      </aside>
    )
  }
})

export default Sidebar

