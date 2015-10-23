var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState: function () {
    return ContactsStore.getState();
  },

  updateState: function () {
    this.setState(ContactsStore.getState());
  },

  componentDidMount: function () {
    ContactsStore.addChangeListener(this.updateState);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount: function () {
    ContactsStore.removeChangeListener(this.updateState);
  },

  deleteContact: function (contact) {
    ViewActionCreators.deleteContact(contact);
  },

  renderContacts: function () {
    var { contacts, contactErrors, contactsPendingDelete } = this.state

    return contacts.map((contact) => {
      var error = contactErrors[contact.id];
      var pendingDelete = contactsPendingDelete.indexOf(contact) !== -1;

      return (
        <li key={contact.first+contact.last} style={{ backgroundColor: error ? 'red' : 'white' }}>
          <img src={contact.avatar} width="80" /> {contact.first} {contact.last} {' '}
          {!error && <button disabled={pendingDelete} onClick={() => this.deleteContact(contact)}>delete</button>}
          {error && <p>{error.message}</p>}
        </li>
      );
    });
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
