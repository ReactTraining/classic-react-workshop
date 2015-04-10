var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState: function () {
    return ContactsStore.getState();
  },

  componentDidMount: function () {
    ViewActionCreators.loadContacts();
  },

  renderContacts: function () {
    return this.state.contacts.map(function (contact) {
      return <li key={contact.first+contact.last}>{contact.first} {contact.last}</li>;
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
