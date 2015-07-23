var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState: function () {
    return ContactsStore.getState();
  },

  componentDidMount: function () {
    ContactsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount: function () {
    ContactsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange: function () {
    this.setState(ContactsStore.getState());
  },

  deleteContact: function (contact) {
    ViewActionCreators.deleteContact(contact);
  },

  renderContacts: function () {
    return this.state.contacts.map(function (contact) {
      return (
        <li key={contact.id}>
          <img src={contact.avatar} width={40} /> {' '}
          {contact.first} {contact.last} {' '}
          <button onClick={this.deleteContact.bind(this, contact)}>
            delete
          </button>
        </li>
      );
    }, this);
  },

  render: function () {
    if (!this.state.loaded)
      return <div>Loading...</div>;

    return (
      <div>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  }
});

module.exports = App;
